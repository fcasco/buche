import DS from 'ember-data';

export default DS.Model.extend({
        id: DS.attr(),
        name: DS.attr(),
        host: DS.attr(),
        port: DS.attr(),
        shouldSend: DS.attr(),
        souldReceive: DS.attr(),
        interval: DS.attr(),
        last_status: DS.attr(),
        last_check: DS.attr(),
        report_to: DS.attr()
});
