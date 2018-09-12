const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('User visits create', ()=>{
    describe('User posts a new item', ()=>{
        it('sees new item rendered', ()=>{
            //setup
            const item = buildItemObject();
            browser.url('/items/create');

            //exercise
            browser.setValue('input[id=title-input]', item.title);
            browser.setValue('textarea[id=description-input]', item.description);
            browser.setValue('input[id=imageUrl-input]', item.imageUrl);  

            browser.click('input[type=submit]');

            //verify
            assert.include(browser.getText('.item-title'), item.title);
            assert.include(browser.getText('.item-description'), item.description);
            assert.include(browser.getAttribute('.item-img', 'src'), item.imageUrl);
        })
    })
})
