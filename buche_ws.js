const Koa = require('koa');
const buche_ws = new Koa();

buche_ws.use(ctx => {
    ctx.body = '_(o.o)_d';
});

buche_ws.listen(60606);
