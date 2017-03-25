/* Buche
*/

const Koa = require('koa');
const KoaHandlebars = require('koa-handlebars');

const buche_ws = new Koa();

/*
const KoaRouter = require('koa-router');

const buche_router = new KoaRouter();


buche_router.get('/', function () {
    yield this.render('root_view', {});
}
*/


buche_ws.use(KoaHandlebars({
    defaultLayout: 'main'
}));


buche_ws.use(function *(context) {
    yield this.render('index', {
        'title': 'Buche',
        'message': '_(o.o)_d'
    });
});

buche_ws.listen(60606);
