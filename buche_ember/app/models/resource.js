import DS from 'ember-data';
import AutoReload from 'ember-data-autoreload';

let Resource = DS.Model.extend(AutoReload, {
        _id: DS.attr(),
        name: DS.attr(),
        host: DS.attr(),
        port: DS.attr(),
        shouldSend: DS.attr(),
        souldReceive: DS.attr(),
        email: DS.attr(),
        interval: DS.attr(),
        lastStatus: DS.attr(),
        lastResponseTime: DS.attr(),
        lastCheck: DS.attr('date')
});

export default Resource;
