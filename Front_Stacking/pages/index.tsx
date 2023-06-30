import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { ethers } from "ethers";
import styles from "../styles/Home.module.scss";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Heading,
  Stack,
  Button,
  Divider,
  SimpleGrid,
  Input,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../Context/Web3Context";
import { useAccount } from "wagmi";

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState({
    tokenAmount: "",
    tokenAddress: "",
    ethAmount: "",
  });
  const [userBalance, setUserBalance] = useState("");
  const [userPositions, setUserPositions] = useState([]);
  //Import de tous les éléments du context
  const {
    stakeETH,
    getAllUserPositions,
    getSpecificPositions,
    stakeERC20,
    getTokenSymbol,
    updatedReward,
    withdraw,
    withdrawETH,
    getTokenBalance,
    claimReward,
  } = useContext(Web3Context);
  //Permet d'afficher des messages sur le page web
  const toast = useToast();
  const address = useAccount();

  useEffect(() => {
    //Récupère les informations de l'utilisateur
    fetchUserPosition();
    //Récupère la balance de l'utilisateur en RewardToken
    getUserBalance();
  }, []);

  const getUserBalance = async () => {
    //Vérifie que l'utitilisateur est connecté
    if (address.address) {
      const balance = await getTokenBalance(address.address);
      //formate la valeur du token
      setUserBalance(ethers.utils.formatEther(balance));
    }
  };
  const fetchUserPosition = async () => {
    //Vérifie que l'utitilisateur est connecté
    if (address.address) {
      //Récupère toutes les addresses des tokens déposés par l'utilisateur
      const _userPositions = await getAllUserPositions(address.address);
      fetchAllUsersPositions(_userPositions);
    }
  };

  const fetchAllUsersPositions = async (_userPositions: []) => {
    //Permet de rafraichir la valuer stocké dans le useState
    let tempUserPos: any = [];
    setUserPositions([]);
    //Boucle sur toutes les positions de l'utilisateur
    for (let i = 0; i < _userPositions?.length; i++) {
      //Recupère les informations sur une position spécifique
      const data = await getSpecificPositions(
        address.address,
        _userPositions[i]
      );
      //Récupère le symbol du token et les rewards de l'utilisateur
      const symbol = await getTokenSymbol(_userPositions[i]);
      const reward = await updatedReward(_userPositions[i], address.address);
      tempUserPos.push({
        balance: (data.balance / 10 ** data.decimals).toString(),
        symbol,
        reward: ethers.utils.formatEther(reward),
        address: _userPositions[i],
      });
    }
    setUserPositions(tempUserPos);
  };

  const handleError = () => {
    if (!address) {
      toast({
        title: "Connect your wallet",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return 0;
    } else if (inputValue.tokenAmount == "") {
      toast({
        title: "Enter an amount",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return 0;
    }
    return 1;
  };

  const handleStake = async () => {
    if (inputValue.ethAmount != "")
      //Appelle la fonction stakeETH du context
      await stakeETH(inputValue.ethAmount)
        .then(async () => {
          //Une fois que l'appel a bien été effectué, on attend 1 seconde et met à jour les positions de l'utilisateur
          setTimeout(async () => {
            await fetchUserPosition();
          }, 1000);
        })
        .catch((err: Error) => console.log(err));
  };

  const handleStakeERC20 = async () => {
    if (!inputValue.tokenAddress) {
      toast({
        title: "Enter an address",
        status: "error",
      });
    }
    if (handleError()) {
      //Appelle la fonction stakeERC20 du context
      await stakeERC20(
        inputValue.tokenAddress,
        address.address,
        inputValue.tokenAmount
      )
        .then(() => {
          //Une fois que l'appel a bien été effectué, on attend 1 seconde et met à jour les positions de l'utilisateur
          setTimeout(async () => {
            await fetchUserPosition();
          }, 1000);
        })
        .catch((err: Error) => console.log(err));
    }
  };

  const handleWithdraw = async (symbol: string, tokenAddress: string) => {
    //Si le symbol est égal au matic on va apelle soit la fonction withdrawETH ou withdrawERC20
    symbol === "MATIC" ? await withdrawETH() : await withdraw(tokenAddress);
    //Met à jour les positions de l'utilisateur
    await fetchUserPosition();
  };

  const handleClaimReward = async (tokenAddress: string) => {
    //Appelle la fonction claimReward par rapport à un token
    await claimReward(tokenAddress);
    //Met à jour les positions de l'utilisateur
    await fetchUserPosition();
  };

  return (
    <div className={styles.container}>
      <Stack
        width={"80%"}
        justifyContent={"space-between"}
        display={"flex"}
        flexDirection={"row"}
        margin={"auto"}
        marginTop={"1%"}
      >
        <Stack>
          <Text fontSize={"6xl"} as="b">
            StackingDapp
          </Text>
        </Stack>
        <ConnectButton />
      </Stack>
      <Card
        width={"60%"}
        margin={"auto"}
        marginTop={"2%"}
        justifyContent={"center"}
        display={"flex"}
      >
        <CardHeader textAlign={"center"}>
          <Text fontSize={"2xl"} as="b">
            STAKE YOUR TOKEN
          </Text>
        </CardHeader>
        <CardBody justifyContent={"center"}>
          <Stack width={"60%"} margin={"auto"} marginBottom={"50px"}>
            <Text>Stake your ETH</Text>
            <Input
              placeholder="0"
              variant="outline"
              onChange={(e) =>
                //Utilise le spread opérator pour mettre à jour les saisies de l'utilisateur
                setInputValue({ ...inputValue, ethAmount: e.target.value })
              }
            />
            <Button
              colorScheme="blue"
              width={"80%"}
              margin={"auto"}
              marginTop={"25px"}
              onClick={() => handleStake()}
            >
              Stake
            </Button>
          </Stack>
          <Divider></Divider>
          <Stack width={"60%"} margin={"auto"} marginTop={"50px"}>
            <Text>Token to stake</Text>
            <Input
              placeholder="0x0"
              variant="outline"
              onChange={(e) =>
                setInputValue({ ...inputValue, tokenAddress: e.target.value })
              }
            />
            <Text>Amount to stake</Text>
            <Input
              placeholder="0"
              variant="outline"
              onChange={(e) =>
                setInputValue({ ...inputValue, tokenAmount: e.target.value })
              }
            />
            <Button
              colorScheme="blue"
              onClick={() => handleStakeERC20()}
              width={"80%"}
              margin={"auto"}
              marginTop={"25px"}
            >
              Stake ERC20
            </Button>
          </Stack>
        </CardBody>
        <CardFooter margin={"auto"}></CardFooter>
      </Card>
      <Box width={"80%"} margin={"auto"}>
        <Divider marginTop={"4%"}></Divider>
        <Stack
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Text fontSize="4xl">Your positions</Text>
          <Card padding={"15px"} marginTop={"2%"}>
            {/* Récupère les variables de l'utilisateur */}
            <Text>RWT balance : {userBalance} </Text>
          </Card>
        </Stack>
        <SimpleGrid
          marginTop={"3%"}
          marginBottom={"5%"}
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(20%, 1fr))"
        >
          {/* Boucle sur toutes les positions de l'utilisateur, puis les affiches */}
          {userPositions?.map((position: any, i: number) => (
            <Card key={i}>
              <CardHeader>
                <Heading size="md">{position.symbol}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  {position.balance} {position.symbol} deposited
                </Text>
                <Text>{position.reward} RWT to claim</Text>
              </CardBody>
              <CardFooter justifyContent={"space-between"} flexWrap={"wrap"}>
                <Button
                  colorScheme="blue"
                  gap={"50px"}
                  onClick={() => handleClaimReward(position.address)}
                >
                  Claim Reward
                </Button>
                <Button
                  onClick={() =>
                    handleWithdraw(position.symbol, position.address)
                  }
                >
                  Withdraw
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default Home;
