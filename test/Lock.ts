import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';
import { IERC20 } from '../typechain-types/contracts/IERC20';
import { StakingRewards } from '../typechain/StakingRewards';

describe('StakingRewards', function () {
    let owner: Signer;
    let user: Signer;
    let stakingToken: IERC20;
    let rewardsToken: IERC20;
    let stakingRewards: StakingRewards;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        // Deploy ERC20 tokens for staking and rewards
        const ERC20 = await ethers.getContractFactory('ERC20');
        stakingToken = (await ERC20.deploy()) as IERC20;
        rewardsToken = (await ERC20.deploy()) as IERC20;
        await stakingToken.deployed();
        await rewardsToken.deployed();

        // Deploy StakingRewards contract
        const StakingRewards = await ethers.getContractFactory('StakingRewards');
        stakingRewards = (await StakingRewards.deploy(stakingToken.address, rewardsToken.address)) as StakingRewards;
        await stakingRewards.deployed();

        // Mint some tokens for user
        await stakingToken.mint(await user.getAddress(), 1000);
    });

    it('should stake tokens', async function () {
        // Approve StakingRewards contract to transfer tokens
        await stakingToken.connect(user).approve(stakingRewards.address, 100);

        // Stake tokens
        await stakingRewards.connect(user).stake(100);

        // Check staked balance
        const userBalance = await stakingRewards.balanceOf(await user.getAddress());
        expect(userBalance).to.equal(100);
    });

    it('should not allow staking more tokens than balance', async function () {
        // Try staking more tokens than balance
        await expect(stakingRewards.connect(user).stake(1000)).to.be.revertedWith(
            'amount = 0'
        );
    });

});
