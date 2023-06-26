pragma solidity 0.8.19;

contract Bank{
    mapping(address => uint) balances;
    event deposited(address _deposer, uint _amount);
    event withdrawed(address _withdrawer, uint _amount);

    function deposit() public payable {
        require(msg.value > 0, "The amount must be positif");
        balances[msg.sender] += msg.value;
        emit deposited(msg.sender, msg.value);
    }

    function withdraw(uint _amount) public {
        require(_amount > 0, "The amount must be positif");
        require(balances[msg.sender] >= _amount, "Not enougth funds");
        balances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit withdrawed(msg.sender, _amount);
    }

    function transferTo(address payable _to, uint _amount) public {
        require(_amount > 0, "The amount must be positif");
        require(balances[msg.sender] >= _amount, "Not enougth funds");
        _to.transfer(_amount);
        balances[msg.sender] -= _amount;
    }

    function balanceOf(address _address) public view returns(uint) {
        return balances[_address];
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
    }
}