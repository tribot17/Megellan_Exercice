/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export declare namespace StackingContract {
  export type StackerStructStruct = {
    balance: PromiseOrValue<BigNumberish>;
    decimals: PromiseOrValue<BigNumberish>;
    depositPrice: PromiseOrValue<BigNumberish>;
    lastDepositTimeStamp: PromiseOrValue<BigNumberish>;
    depositTime: PromiseOrValue<BigNumberish>;
    reward: PromiseOrValue<BigNumberish>;
  };

  export type StackerStructStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber
  ] & {
    balance: BigNumber;
    decimals: BigNumber;
    depositPrice: BigNumber;
    lastDepositTimeStamp: BigNumber;
    depositTime: BigNumber;
    reward: BigNumber;
  };
}

export interface StackingContractInterface extends utils.Interface {
  functions: {
    "allowance(address,address)": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "calculateDays(uint256)": FunctionFragment;
    "claimReward(address)": FunctionFragment;
    "decimals()": FunctionFragment;
    "decreaseAllowance(address,uint256)": FunctionFragment;
    "getPosition(address,address)": FunctionFragment;
    "getTokenPrice(address)": FunctionFragment;
    "getUpdatedReward(address,address)": FunctionFragment;
    "getUserPosition(address)": FunctionFragment;
    "increaseAllowance(address,uint256)": FunctionFragment;
    "mint(uint256,address)": FunctionFragment;
    "name()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "setContractAddress(address)": FunctionFragment;
    "stake(address,uint256,address)": FunctionFragment;
    "stakeETH()": FunctionFragment;
    "symbol()": FunctionFragment;
    "totalSupply()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "updateReward(address,address)": FunctionFragment;
    "withdrawToken(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "allowance"
      | "approve"
      | "balanceOf"
      | "calculateDays"
      | "claimReward"
      | "decimals"
      | "decreaseAllowance"
      | "getPosition"
      | "getTokenPrice"
      | "getUpdatedReward"
      | "getUserPosition"
      | "increaseAllowance"
      | "mint"
      | "name"
      | "owner"
      | "renounceOwnership"
      | "setContractAddress"
      | "stake"
      | "stakeETH"
      | "symbol"
      | "totalSupply"
      | "transfer"
      | "transferFrom"
      | "transferOwnership"
      | "updateReward"
      | "withdrawToken"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "allowance",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "calculateDays",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimReward",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "decreaseAllowance",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getPosition",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenPrice",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUpdatedReward",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserPosition",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "increaseAllowance",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setContractAddress",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "stake",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(functionFragment: "stakeETH", values?: undefined): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "totalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateReward",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawToken",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "calculateDays",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "claimReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "decreaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUpdatedReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "increaseAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "stake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stakeETH", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "totalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateReward",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawToken",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface ApprovalEventObject {
  owner: string;
  spender: string;
  value: BigNumber;
}
export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber],
  ApprovalEventObject
>;

export type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TransferEventObject {
  from: string;
  to: string;
  value: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface StackingContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: StackingContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    calculateDays(
      _depositTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    claimReward(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    decimals(overrides?: CallOverrides): Promise<[number]>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPosition(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[StackingContract.StackerStructStructOutput]>;

    getTokenPrice(
      aggregatorAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUpdatedReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getUserPosition(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string[]]>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mint(
      _amount: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setContractAddress(
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stake(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _aggregator: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    stakeETH(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawToken(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  allowance(
    owner: PromiseOrValue<string>,
    spender: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  approve(
    spender: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(
    account: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  calculateDays(
    _depositTime: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  claimReward(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  decimals(overrides?: CallOverrides): Promise<number>;

  decreaseAllowance(
    spender: PromiseOrValue<string>,
    subtractedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPosition(
    _token: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<StackingContract.StackerStructStructOutput>;

  getTokenPrice(
    aggregatorAddress: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUpdatedReward(
    _token: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUserPosition(
    _user: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string[]>;

  increaseAllowance(
    spender: PromiseOrValue<string>,
    addedValue: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mint(
    _amount: PromiseOrValue<BigNumberish>,
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setContractAddress(
    _contractAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stake(
    _tokenAddress: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    _aggregator: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  stakeETH(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  symbol(overrides?: CallOverrides): Promise<string>;

  totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    from: PromiseOrValue<string>,
    to: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateReward(
    _token: PromiseOrValue<string>,
    _user: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawToken(
    _tokenAddress: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateDays(
      _depositTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimReward(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    decimals(overrides?: CallOverrides): Promise<number>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getPosition(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<StackingContract.StackerStructStructOutput>;

    getTokenPrice(
      aggregatorAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUpdatedReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserPosition(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string[]>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mint(
      _amount: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    setContractAddress(
      _contractAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    stake(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _aggregator: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    stakeETH(overrides?: CallOverrides): Promise<void>;

    symbol(overrides?: CallOverrides): Promise<string>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawToken(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;
    Approval(
      owner?: PromiseOrValue<string> | null,
      spender?: PromiseOrValue<string> | null,
      value?: null
    ): ApprovalEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "Transfer(address,address,uint256)"(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;
    Transfer(
      from?: PromiseOrValue<string> | null,
      to?: PromiseOrValue<string> | null,
      value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    calculateDays(
      _depositTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    claimReward(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    decimals(overrides?: CallOverrides): Promise<BigNumber>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPosition(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenPrice(
      aggregatorAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUpdatedReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserPosition(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mint(
      _amount: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setContractAddress(
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stake(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _aggregator: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    stakeETH(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawToken(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    allowance(
      owner: PromiseOrValue<string>,
      spender: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    approve(
      spender: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      account: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    calculateDays(
      _depositTime: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    claimReward(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    decreaseAllowance(
      spender: PromiseOrValue<string>,
      subtractedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPosition(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenPrice(
      aggregatorAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUpdatedReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserPosition(
      _user: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    increaseAllowance(
      spender: PromiseOrValue<string>,
      addedValue: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mint(
      _amount: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setContractAddress(
      _contractAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stake(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      _aggregator: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    stakeETH(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: PromiseOrValue<string>,
      to: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateReward(
      _token: PromiseOrValue<string>,
      _user: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawToken(
      _tokenAddress: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
