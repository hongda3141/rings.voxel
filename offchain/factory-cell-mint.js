const NrcSdk = require('@rather-labs/nrc-721-sdk');
require('dotenv').config();

const nodeUrl = process.env.CKB_RPC_URL || 'https://mainnet.ckbapp.dev/rpc';
const indexerUrl = process.env.CKB_INDEXER_URL || 'https://mainnet.ckbapp.dev/indexer';
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

const main = async () => {

    const {factoryCell, ckb} = await NrcSdk.initialize({
        nodeUrl, indexerUrl,
    });

    const {rawTransaction, typeScript, usedCapacity} = await factoryCell.mint({
        name: "rings voxel factory",
        symbol: "rvf",
        baseTokenUri: "http://test-rvf.com",
        sourceAddress: OWNER_ADDRESS,
        targetAddress: OWNER_ADDRESS,
        fee: 0.0001,
    });

    console.log(rawTransaction);
    const signedTx = ckb.signTransaction(OWNER_PRIVATE_KEY)(rawTransaction);

    const txHash = await ckb.rpc.sendTransaction(signedTx, "passthrough");

    console.log("Transaction Hash: ", txHash);
    console.log("Used Capacity: ", usedCapacity);
    // This type script should be stored to then retrieve the data if necesary
    console.log("Minted cell Type script: ", typeScript);
};

if (require.main === module) {
    (() => main())();
}
