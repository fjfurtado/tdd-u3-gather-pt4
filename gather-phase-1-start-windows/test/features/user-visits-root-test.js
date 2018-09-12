const {assert} = require('chai');

describe('User visits root', () => {

  describe('without existing items', () => {
    it('starts blank', () => {
      browser.url('/');
      assert.equal(browser.getText('#items-container'), '');
    });
  });
  describe('with or without existing items', ()=>{
    it('user can navigate to create from root', ()=>{
      browser.url('/');
      browser.click('a[href="/items/create"]');
      assert.include(browser.getText('.form-title'), 'Create');
    })
  })
});
