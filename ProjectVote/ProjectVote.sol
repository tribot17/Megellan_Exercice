pragma solidity 0.8.18;


contract ProjectVote {
    address admin;
    uint index = 0;
    struct Proposal {
        string content;
        uint proposalId;
        uint voteCount;
    }

    struct Voters {
        bool whitelisted;
        bool hasVoted;
    }

    enum State{
        userEnregistrement,
        proposalEnregistrement,
        voteStarted,
        voteEnded
    }

    mapping(uint => Proposal) proposal;
    mapping (address => Voters) voters;
    mapping(address => bool) whiteList;

    event Voted(address _voter);
    event Winner(Proposal _winner);



    Proposal winner;
    State public state = State.userEnregistrement;

    modifier onlyOwner() {
        require(msg.sender == admin, "You are not the admin");
        _;
    }

    modifier onlyWhitelisted() {
        require(voters[msg.sender].whitelisted == true, "You are not whitelisted");
        _;
    }

    modifier checkStatus(State _status){
        require(state == _status, "You can't do this right now");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addToWhiteList(address user) public onlyOwner checkStatus(State.userEnregistrement) {
        require(!voters[user].whitelisted, "user is already whitelsited");
        voters[user].whitelisted = true;
    }

    function addProposal(string memory _proposal) public onlyWhitelisted checkStatus(State.proposalEnregistrement) {
        proposal[index] = Proposal(_proposal, index, 0);
        index++;
    }

    function changeStatus(State _newState) public onlyOwner {
        require((_newState > state || (_newState == State.userEnregistrement && state == State.voteEnded)), "Can't come back");
        if (_newState == State.voteStarted) 
            require(index > 0);
        
        if(_newState == State.voteEnded){
            index = 0;
            emit Winner(winner);
        }
        if(_newState == State.userEnregistrement)
            winner = Proposal("",0,0);
        

        state = _newState;
    }

    function vote(uint _proposalIndex) public onlyWhitelisted checkStatus(State.voteStarted){
        require(!voters[msg.sender].hasVoted, "You have already voted");
        voters[msg.sender].hasVoted = true;
        proposal[_proposalIndex].voteCount += 1;
        emit Voted(msg.sender);
        if(proposal[_proposalIndex].voteCount > winner.voteCount)
            winner = proposal[_proposalIndex];
    }

    function resetVote() public onlyWhitelisted() checkStatus(State.userEnregistrement){
        voters[msg.sender].hasVoted = false;
    }

    function getProposal(uint _proposalIndex) public view onlyWhitelisted returns(Proposal memory) {
        require(_proposalIndex <= index, "proposal out of bound");
        return proposal[_proposalIndex];
    }
 
    function getWinner() public view checkStatus(State.voteEnded) returns(Proposal memory){
        return winner;
    }
}