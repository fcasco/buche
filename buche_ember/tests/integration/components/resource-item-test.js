import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let resource = Ember.Object.create({
    id: '4097',
    name: 'Cuatro mil noventa y siete',
    host: '54.173.171.58',
    port: 4097,
    shouldSend: 'PING',
    souldReceive: 'PONG',
    interval: 1,
    last_status: 'o',
    last_check: new Date,
    report_to: '4097@grr.la'
});
    

moduleForComponent('resource-item', 'Integration | Component | resource item', {
  integration: true
});

test('should display resource details', function(assert) {
    this.set('resource', resource);
    this.render(hbs`{{resource-item resource=resource}}`);

    assert.equal(this.$('.resource h3').text(), 'Cuatro mil noventa y siete', 'Title');
    assert.equal(this.$('.resource .status').text(), 'ok', 'Status');
});
