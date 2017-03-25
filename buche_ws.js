/* Buche
*/
'use strict';

const DB_PARAMS = {
    'host': '127.0.0.1',
    'port': 27017,
    'db': 'buche'
}
const Mongorito = require('mongorito');
Mongorito.connect(DB_PARAMS['host'] + '/' + DB_PARAMS['db']);
const MongoritoModel = Mongorito.Model;
class BucheMonitor extends MongoritoModel {
}

const Koa = require('koa');
const KoaHandlebars = require('koa-handlebars');
const KoaRouter = require('koa-router');
const KoaBodyParser = require('koa-bodyparser');


const buche_router = new KoaRouter();

const buche_ws = new Koa();

buche_ws.use(KoaHandlebars({
    defaultLayout: 'main'
}));

buche_router.get('/', function *(ctx, next) {
    const monitors = yield BucheMonitor.all();

    yield this.render('index', {
        'title': 'Buche',
        'message': '_(o.o)_d',
        'monitors': monitors
    });
});

buche_router.post('/monitors/add', function *(next) {
    const monitor_name = this.request.body.name;
    const monitor_target_url = this.request.body.target_url;
    const monitor_email = this.request.body.email;
    const new_monitor = new BucheMonitor({
        'name': monitor_name,
        'target_url': monitor_target_url,
        'email': monitor_email
    })

    new_monitor.save();

    yield this.render('index', {
        'title': 'Buche',
        'message': `monitoring ${monitor_target_url}`
    });
});

buche_ws
    .use(KoaBodyParser())
    .use(buche_router.routes())
    .use(buche_router.allowedMethods());

buche_ws.listen(60606);
console.log('Listenig on http://localhost:60606/')
