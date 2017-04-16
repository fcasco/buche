import Ember from 'ember';

export default Ember.Route.extend({
    model: function () {
        let autorefresh = function () {
            this.get('store').findAll('resource');
            Ember.run.later(this, autorefresh, 1000);
        }

        Ember.run.later(this, autorefresh, 1000);

        return this.get('store').findAll('resource');
    }
});
