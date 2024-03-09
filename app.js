class Pool {
  constructor(name, asset, apy) {
    this.name = name;
    this.asset = asset;
    this.apy = apy;
  }
}

class SingleAssetPool extends Pool {
  constructor(name, asset, apy) {
    super(name, asset, apy);
  }
}

class DualAssetPool extends Pool {
  constructor(name, asset, apy) {
    super(name, asset, apy);
  }
}

const calculateEarningsInUSDC = (deposit, pool) => {
  const earnings = deposit * (pool.apy / 100);
  return earnings.toFixed(2);
};

const findMostEfficientStrategy = (deposit, pools) => {
  let mostEfficientPool = null;
  let highestEarnings = 0;

  for (let i = 0; i < pools.length; i++) {
    const pool = pools[i];
    const earnings = calculateEarningsInUSDC(deposit, pool);

    if (earnings > highestEarnings) {
      mostEfficientPool = pool;
      highestEarnings = earnings;
    }
  }

  return mostEfficientPool;
};

const displayPools = (deposit, pools) => {
  const poolsContainer = document.getElementById("pools-container");
  poolsContainer.innerHTML = "";

  for (let i = 0; i < pools.length; i++) {
    const pool = pools[i];
    const earnings = calculateEarningsInUSDC(deposit, pool);

    const poolDetails = document.createElement("div");
    poolDetails.className = "pool-details";
    poolDetails.innerHTML = `
      <h3>${pool.name}</h3>
      <p>Asset: ${pool.asset}</p>
      <p>APY: ${pool.apy}%</p>
      <p>Earnings in USDC: $${earnings}</p>
    `;

    if (pool instanceof DualAssetPool) {
      // Show maximum loan available for DualAssetPool
      poolDetails.innerHTML += `<p>Maximum Loan: 60% of deposit</p>`;
    }

    poolsContainer.appendChild(poolDetails);
  }
};

const calculateEarnings = () => {
  const investmentAmountInput = document.getElementById("investment-amount");
  const investmentAmount = parseFloat(investmentAmountInput.value);

  const pools = [
    new SingleAssetPool("YEARN FINANCE", "yCRV", 30),
    new DualAssetPool("AAVE", "ETH", 1),
    new DualAssetPool("COMPOUND", "ETH", 1),
    new SingleAssetPool("CURVE", "STETH/ETH", 6),
    new SingleAssetPool("LIDO", "ETH", 5),
    new DualAssetPool("PENDULUS", "ETH", 10),
    new SingleAssetPool("GMX", "USDC", 30)
  ];

  const mostEfficientPool = findMostEfficientStrategy(investmentAmount, pools);
  displayPools(investmentAmount, pools);

  if (mostEfficientPool) {
    console.log("Most efficient strategy:", mostEfficientPool.name);
  } else {
    console.log("No pools found");
  }
};
