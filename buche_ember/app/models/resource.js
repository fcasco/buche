import DS from 'ember-data';

export default DS.Model.extend({
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
        lastCheck: DS.attr()
});
