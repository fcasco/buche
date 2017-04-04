import { test } from 'qunit';
import moduleForAcceptance from 'ember-quickstart/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | resources');

test('visiting /resources', function (assert) {
  visit('/resources');

  andThen(function () {
    assert.equal(currentURL(), '/resources');
  });
});

test('should list monitored resources', function (assert) {
    visit('/');
    andThen(function () {
        assert.equal(find('.resource').length, 3, 'should see 3 resources');
    });
})

test('should show resources at the home page', function (assert) {
    visit('/');
    andThen(function () {
        assert.equal(currentURL(), '/resources', 'should redirect automatically');
    });
});

test('should link to information about the app', function (assert) {
    visit('/');
    click('a:contains("About")');
    andThen(function () {
        assert.equal(currentURL(), '/about', 'should navigate to about page');
    });
});
