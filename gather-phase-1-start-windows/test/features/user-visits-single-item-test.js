const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('User visits single item', () => {

    beforeEach(connectDatabaseAndDropData);
    afterEach(diconnectDatabase);

    describe('creates a new item', () => {
      it('and is rendered on single item page', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        browser.click('.item-card a');

        assert.include(browser.getText('.single-item-title'), itemToCreate.title);
        assert.include(browser.getText('.single-item-description'), itemToCreate.description);
        assert.equal(browser.getAttribute('.single-item-img img', 'src'), itemToCreate.imageUrl);
      });
    });
});

