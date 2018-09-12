const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
const {parseTextFromHTML, buildItemObject} = require('../test-utils');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
  describe('title', ()=>{
    it('should be a string', ()=>{
      const nonString = 99;
      
      const item = new Item({title: nonString});

      assert.strictEqual(item.title, nonString.toString())
    })

    it('should be required', ()=>{
      const item = new Item({title: ''});
      item.validateSync();
      assert.equal(item.errors.title.message, 'Path `title` is required.');
    })
  })

  describe('description', ()=>{
    it('should be a string', ()=>{
      const nonString = 99;
      const item = new Item({description: nonString})
      assert.strictEqual(item.description, nonString.toString())
    })

    it('should be required', ()=>{
      const item = new Item({title: 'a title', description: null})
      item.validateSync();
      assert.equal(item.errors.description.message, 'Path `description` is required.');
    })
  })

  describe('imageUrl', ()=>{
    it('should be a string', ()=>{
      const nonString = 99;
      const item = new Item({imageUrl: nonString})
      assert.strictEqual(item.imageUrl, nonString.toString())
    })
    
    it('should be required', ()=>{
      const item = new Item({title: 'a title', description: 'a description', imageUrl: null})
      item.validateSync();
      assert.equal(item.errors.imageUrl.message, 'Path `imageUrl` is required.');
    })
  })

});
