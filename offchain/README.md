### offchain backend of rings.voxel

#### run and test

edit .env file, fill OWNER_ADDRESS and OWNER_PRIVATE_KEY
```shell
npm install
npm factory-cell-mint
```
copy the typescript from factory-cell-mint console output to .env file
FACTORY_TYPESCRIPT_CODE_HASH, FACTORY_TYPESCRIPT_HASH_TYPE, FACTORY_TYPESCRIPT_ARGS
edit .env

run server
```shell
npm start
```
for test
```shell
# mint nft
curl -XPOST 'http://localhost:3000/mintNft' -H 'Content-Type: application/json' -d '{"someKey": "SomeValue", "anotherKey": "AnotherValue"}'
# get all nft from address
curl -XPOST 'http://localhost:3000/getAllFromAddress' -H 'Content-Type: application/json' -d '{"userAddress": "${your address}"}'
# read nft
curl -XPOST 'http://localhost:3000/readNft' -H 'Content-Type: application/json' -d '{"codeHash":"${codeHash}","hashType":"${hashType}","args":"${args}"}'
```

