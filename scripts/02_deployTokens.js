async function main() {
    const [owner, signer2] = await ethers.getSigners();
  
    Tether = await ethers.getContractFactory('Tether', owner);
    tether = await Tether.deploy();
  
    Usdc = await ethers.getContractFactory('UsdCoin', owner);
    usdc = await Usdc.deploy();
  
    await tether.connect(owner).mint(
      owner.address,
      ethers.utils.parseEther('100000')
    )
    await usdc.connect(owner).mint(
      owner.address,
      ethers.utils.parseEther('100000')
    )
  
    console.log('TETHER_ADDRESS=', `'${tether.address}'`)
    console.log('USDC_ADDRESS=', `'${usdc.address}'`)
  }
  
  /*
  npx hardhat run --network localhost scripts/02_deployTokens.js
  */
  
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

    // weth 0x5FbDB2315678afecb367f032d93F642f64180aa3
    // factory 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
    // swapRouter 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
    // nftDescriptor 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9
    // nonfungibleTokenPositionDescriptor 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9
    // nonfungiblePositionManager 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
    //TETHER_ADDRESS= '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
    //USDC_ADDRESS= '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'