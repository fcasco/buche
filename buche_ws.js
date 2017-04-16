/* Buche
*/
'use strict';

const config = require('./buche_config.js');
const models = require('./buche_models.js');

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
    let resources = models.Resource.all();

    yield this.render('index', {
        'title': 'Buche',
        'message': '_(o.o)_d',
        'resources': resources
    });
});

const RESOURCE_STATUS_NEW = 'n';
const RESOURCE_STATUS_OK = 'o';
const RESOURCE_STATUS_ERROR = 'e';

buche_router.post('/resources/add', function *(next) {
    const resource_name = this.request.body.name;
    const resource_host = this.request.body.host;
    const resource_port = this.request.body.port;
    const resource_email = this.request.body.email;
    const new_resource = new models.Resource({
        'name': resource_name,
        'host': resource_host,
        'port': resource_host,
        'email': resource_email,
        'last_status': RESOURCE_STATUS_NEW
    })

    new_resource.save();

    this.response.redirect('/');

    /*
    yield this.render('index', {
        'title': 'Buche',
        'message': `monitoring ${resource_host}:${resource_port}`
    });
    */
});

buche_ws
    .use(KoaBodyParser())
    .use(buche_router.routes())
    .use(buche_router.allowedMethods());

buche_ws.listen(60606);
console.log('Listenig on http://localhost:60606/')
