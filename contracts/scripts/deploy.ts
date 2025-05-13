import { Account, Contract, Provider, stark, RpcProvider, constants } from "starknet";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables
dotenv.config();

// Constants
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/your-api-key";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS || "";

// Exit if missing environment variables
if (!PRIVATE_KEY || !ACCOUNT_ADDRESS) {
  console.error("Missing required environment variables: PRIVATE_KEY, ACCOUNT_ADDRESS");
  process.exit(1);
}

// Helper to read compiled contract
const readContract = (contractName: string) => {
  const compiledContractPath = path.join(
    __dirname,
    "..",
    "target",
    "dev",
    `${contractName}.sierra.json`
  );
  
  return JSON.parse(fs.readFileSync(compiledContractPath, "utf8"));
};

// Main deployment function
async function main() {
  try {
    // Connect to Starknet testnet
    console.log("Connecting to Starknet Sepolia testnet...");
    const provider = new RpcProvider({
      nodeUrl: SEPOLIA_RPC_URL,
      chainId: constants.StarknetChainId.SN_SEPOLIA
    });

    // Setup account
    console.log("Setting up account...");
    const account = new Account(
      provider,
      ACCOUNT_ADDRESS,
      PRIVATE_KEY
    );

    // Log account information
    console.log(`Using account: ${account.address}`);
    const balance = await provider.getBalance({
      address: account.address,
      blockIdentifier: 'latest',
    });
    console.log(`Account balance: ${stark.formatUnits(balance.amount, 18)} ETH`);

    // Read compiled contracts
    console.log("Reading compiled contracts...");
    const profileRegistryContract = readContract("ProfileRegistry");
    const profileStorageContract = readContract("ProfileStorage");
    const batchUpdaterContract = readContract("BatchUpdater");

    // Deploy ProfileRegistry
    console.log("Deploying ProfileRegistry...");
    const profileRegistryDeployResponse = await account.deploy({
      classHash: profileRegistryContract.class_hash,
      constructorCalldata: stark.compileCalldata({
        owner: account.address
      }),
      salt: stark.randomAddress(),
    });
    
    await provider.waitForTransaction(profileRegistryDeployResponse.transaction_hash);
    const profileRegistryAddress = profileRegistryDeployResponse.contract_address;
    console.log(`ProfileRegistry deployed at: ${profileRegistryAddress}`);

    // Deploy ProfileStorage
    console.log("Deploying ProfileStorage...");
    const profileStorageDeployResponse = await account.deploy({
      classHash: profileStorageContract.class_hash,
      constructorCalldata: stark.compileCalldata({
        owner: account.address,
        registry: profileRegistryAddress
      }),
      salt: stark.randomAddress(),
    });
    
    await provider.waitForTransaction(profileStorageDeployResponse.transaction_hash);
    const profileStorageAddress = profileStorageDeployResponse.contract_address;
    console.log(`ProfileStorage deployed at: ${profileStorageAddress}`);

    // Deploy BatchUpdater
    console.log("Deploying BatchUpdater...");
    const batchUpdaterDeployResponse = await account.deploy({
      classHash: batchUpdaterContract.class_hash,
      constructorCalldata: stark.compileCalldata({
        owner: account.address,
        registry: profileRegistryAddress
      }),
      salt: stark.randomAddress(),
    });
    
    await provider.waitForTransaction(batchUpdaterDeployResponse.transaction_hash);
    const batchUpdaterAddress = batchUpdaterDeployResponse.contract_address;
    console.log(`BatchUpdater deployed at: ${batchUpdaterAddress}`);

    // Add BatchUpdater as authorized updater in ProfileRegistry
    console.log("Setting up permissions...");
    const profileRegistry = new Contract(
      profileRegistryContract.abi,
      profileRegistryAddress,
      provider
    );

    const addUpdaterTx = await account.execute({
      contractAddress: profileRegistryAddress,
      entrypoint: "add_updater",
      calldata: stark.compileCalldata({
        updater: batchUpdaterAddress
      })
    });

    await provider.waitForTransaction(addUpdaterTx.transaction_hash);
    console.log(`BatchUpdater added as updater in ProfileRegistry`);

    // Write deployment info to file
    const deploymentInfo = {
      timestamp: new Date().toISOString(),
      network: "sepolia",
      addresses: {
        profileRegistry: profileRegistryAddress,
        profileStorage: profileStorageAddress,
        batchUpdater: batchUpdaterAddress
      }
    };

    fs.writeFileSync(
      path.join(__dirname, "..", "deployment-info.json"),
      JSON.stringify(deploymentInfo, null, 2)
    );

    console.log("Deployment complete! Info saved to deployment-info.json");
  } catch (error) {
    console.error("Deployment failed:", error);
    process.exit(1);
  }
}

// Run the deployment
main();