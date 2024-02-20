import { ethers } from 'hardhat';
import { StakingRewards } from "../typechain-types";
import StakingRewardsABI from '../artifacts/contracts/Staking.sol/StakingRewards.json';

async function main() {
  const contractAddress = '0xE237eecD2dAB5530f18C50710e91B2d1047087bB';

  const [deployer] = await ethers.getSigners();

  // Import the ABI
  const stakingRewardsABI = StakingRewardsABI.abi;

  // Connect to the deployed contract using the ABI
  const stakingRewards = new ethers.Contract(contractAddress, stakingRewardsABI, deployer);

  // Interact with the contract here
  // For example, stake tokens
  const amountToStake = 100; // 10 tokens
  await stakingRewards.stake(amountToStake);

  console.log('Staked tokens successfully.');

  // Add more interactions as needed
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});

