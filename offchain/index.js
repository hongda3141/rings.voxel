const Koa = require('koa')
const bodyParser = require('koa-bodyparser');
const { mintNft, getAllFromAddress, readNft } = require('./nft-cell-service');

const app = new Koa();
app.use(bodyParser());

app.use(async (ctx) => {
  ctx.body = ctx.request.body;
  switch (ctx.request.url) {
    case '/mintNft':
      ctx.body = await mintNft(ctx.request.body);
      break;
    case '/getAllFromAddress':
      ctx.body = await getAllFromAddress(ctx.request.body.userAddress);
      break;
    case '/readNft':
      ctx.body = await readNft(ctx.request.body);
      break;
    default:
      ctx.body = { error: ctx.request.url + ' not supported'};
  }
});

app.listen(3000);
console.log('[offchain] starting at port 3000');
