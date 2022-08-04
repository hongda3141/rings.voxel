const NrcSdk = require('@rather-labs/nrc-721-sdk');
require('dotenv').config();

const nodeUrl = process.env.CKB_RPC_URL || 'https://mainnet.ckbapp.dev/rpc';
const indexerUrl = process.env.CKB_INDEXER_URL || 'https://mainnet.ckbapp.dev/indexer';
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

// Type Script of nft Contract
const nftContractTypeScript = {
    codeHash: "0x00000000000000000000000000000000000000000000000000545950455f4944",
    hashType: "type",
    args: "0xc2407f8b6ef27a10c35a55ab589e6bfc28db3f2fe5b08cab63384c88a02a14e6"
};

const mintNft = async (data) => {
    console.log('mintNft')
    console.log(nodeUrl)
    console.log(indexerUrl)

    const { nftCell, ckb } = await NrcSdk.initialize({
        nodeUrl,
        indexerUrl,
    });

    // Type Script of class Cell minted
    const factoryTypeScript = {
        codeHash: process.env.FACTORY_TYPESCRIPT_CODE_HASH,
        hashType: process.env.FACTORY_TYPESCRIPT_HASH_TYPE,
        args: process.env.FACTORY_TYPESCRIPT_ARGS
    };

    const { rawTransaction, nftTypeScript, usedCapacity } = await nftCell.mint({
        nftContractTypeScript,
        factoryTypeScript,
        sourceAddress: OWNER_ADDRESS,
        targetAddress: OWNER_ADDRESS,
        fee: 0.0001,
        data,
    });

    const signedTx = ckb.signTransaction(OWNER_PRIVATE_KEY)(rawTransaction);

    const txHash = await ckb.rpc.sendTransaction(signedTx, "passthrough");

    console.log("Transaction Hash: ", txHash);
    console.log("Used Capacity: ", usedCapacity);
    // This type script should be stored to then retrieve the data if necesary
    console.log("Minted cell Type script: ", nftTypeScript);

    return nftTypeScript;
};

const getAllFromAddress = async (userAddress) => {

    const { nftCell } = await NrcSdk.initialize({
        nodeUrl,
        indexerUrl,
    });

    const factoryTypeScript = {
        codeHash: process.env.FACTORY_TYPESCRIPT_CODE_HASH,
        hashType: process.env.FACTORY_TYPESCRIPT_HASH_TYPE,
        args: process.env.FACTORY_TYPESCRIPT_ARGS
    };

    // Use the factory type script to get all nft from an address corresponding to that factory Cell
    const userNftsCells = await nftCell.getAllFactoryNftsByAdress({ userAdress: userAddress, factoryTypeScript });
    console.log("Nft Cells: ", userNftsCells);
    return userNftsCells;

}

const readNft = async (nftCell_typeScript) => {

    const { nftCell } = await NrcSdk.initialize({
        nodeUrl,
        indexerUrl,
    });

    const { tokenId, tokenUri, data, rawCell, factoryData } = await nftCell.read(nftCell_typeScript);
    console.log("Nft Token Id: ", tokenId);
    console.log("Nft Token URI: ", tokenUri);
    console.log("Nft Cell Data: ", JSON.parse(data));
    console.log("Factory Data: ", factoryData);
    console.log("Nft Cell: ", rawCell);

    return { tokenId, tokenUri, data, rawCell, factoryData };
};


if (require.main === module) {
    (() => main())();
}

module.exports = { mintNft, getAllFromAddress, readNft }
