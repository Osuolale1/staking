import { ethers } from "hardhat";
import { StakingRewards } from "../typechain-types";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const StakingRewardsFactory = await ethers.getContractFactory("contracts/Staking.sol:StakingRewards");
  const stakingRewards: StakingRewards = await StakingRewardsFactory.deploy(
    "0xE237eecD2dAB5530f18C50710e91B2d1047087bB",
    "0xAFe47e772d49381AF628642c7A0df5AdAe0a9eDe"
  );


  console.log("StakingRewards address:", stakingRewards.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
