# uniswap-v3-flashswap

> A complete Uniswap V3 local deployment with flash swap execution — built from scratch using Hardhat, Ethers.js, and the Uniswap V3 SDK. Deploys the full V3 stack locally, sets up liquidity pools, and executes an atomic flash swap through a custom `PairFlash` contract.

---

## Overview

This project implements the full Uniswap V3 lifecycle on a local Hardhat node. Every step is scripted directly against the contracts — no frontend, no shortcuts. The centerpiece is `PairFlash.sol`, a custom contract that borrows tokens from one pool, executes swaps across two others, repays the loan with fees, and sends any profit back to the caller — all in a single atomic transaction.

---

## How It Works

The `PairFlash` contract implements `IUniswapV3FlashCallback`. When `initFlash()` is called:

1. Borrows tokens from a pool at a chosen fee tier
2. Inside the callback, executes two `exactInputSingle` swaps across different fee tier pools
3. Calculates what is owed (borrowed amount + fees)
4. Repays the originating pool
5. Sends any remaining profit back to the caller

All of this happens atomically — if repayment fails, the entire transaction reverts.

---

## Contracts

- **`PairFlash.sol`** — flash swap contract implementing `IUniswapV3FlashCallback`
- **`Tether.sol`** — custom ERC-20 token (USDT) with mint function
- **`UsdCoin.sol`** — custom ERC-20 token (USDC) with mint function

---

## Scripts (run in order)

| Script | What it does |
|---|---|
| `01_deployContract.js` | Deploys full Uniswap V3 stack — WETH9, Factory, SwapRouter, NFTDescriptor, PositionManager |
| `02_deployTokens.js` | Deploys USDT and USDC tokens, mints 100,000 of each to owner |
| `03_deployPool.js` | Creates USDT/USDC pools at 3 fee tiers: 0.05%, 0.3%, 1% |
| `04_addLiquidity.js` | Mints liquidity positions across all three pools |
| `05_checkLiquidity.js` | Reads pool state — tick, sqrtPriceX96, liquidity, price ratio |
| `06_flashSwap.js` | Deploys `PairFlash` and executes a flash swap, logs balances before and after |

---

## Tech Stack

- **[Hardhat](https://hardhat.org/)** — local Ethereum node and deployment
- **[Ethers.js v5](https://docs.ethers.org/v5/)** — contract interaction
- **[Uniswap V3 SDK](https://docs.uniswap.org/sdk/v3/overview)** — pool math, tick utilities, position calculation
- **[Uniswap V3 Core & Periphery](https://github.com/Uniswap/v3-core)** — contract ABIs and artifacts
- **[OpenZeppelin Contracts](https://openzeppelin.com/contracts/)** — ERC-20 base for custom tokens
- **[ethereum-waffle](https://getwaffle.io/)** — local provider utilities

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/uniswap-v3-flashswap.git
cd uniswap-v3-flashswap
npm install
```

### 2. Compile contracts

```bash
npx hardhat compile
```

### 3. Start a local Hardhat node

Open a **separate terminal** and keep it running:

```bash
npx hardhat node
```

### 4. Run scripts in order

Back in your main terminal, run each step sequentially:

```bash
npx hardhat run scripts/01_deployContract.js --network localhost
npx hardhat run scripts/02_deployTokens.js --network localhost
npx hardhat run scripts/03_deployPool.js --network localhost
npx hardhat run scripts/04_addLiquidity.js --network localhost
npx hardhat run scripts/05_checkLiquidity.js --network localhost
npx hardhat run scripts/06_flashSwap.js --network localhost
```

> ⚠️ Each script depends on the addresses printed by the previous one. Copy the addresses from the console output and update them in the next script before running.

---

## Project Structure

```
uniswap-v3-flashswap/
├── contracts/
│   ├── PairFlash.sol
│   ├── Tether.sol
│   └── UsdCoin.sol
├── scripts/
│   ├── 01_deployContract.js
│   ├── 02_deployTokens.js
│   ├── 03_deployPool.js
│   ├── 04_addLiquidity.js
│   ├── 05_checkLiquidity.js
│   └── 06_flashSwap.js
├── WETH9.json
├── hardhat.config.js
├── package.json
└── .gitignore
```

---

## Key Concepts Demonstrated

- Deploying a full Uniswap V3 stack locally including bytecode library linking for `NFTDescriptor`
- Encoding `sqrtPriceX96` for pool price initialization
- Creating and initializing pools at multiple fee tiers from a single factory
- Minting NFT-based liquidity positions via `NonfungiblePositionManager`
- Implementing `IUniswapV3FlashCallback` for atomic flash swap execution
- Profit calculation and repayment logic inside a flash callback

---

## License

MIT
