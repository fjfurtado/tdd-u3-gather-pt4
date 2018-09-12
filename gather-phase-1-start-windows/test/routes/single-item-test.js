const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const Item = require('../../models/item');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
  it('should render item title', async ()=>{
    //setup 
    const item = await seedItemToDatabase();

    //exercise
    const getResponse = await request(app).get('/items/' + item._id).send();

    //verify
    assert.include(parseTextFromHTML(getResponse.text, '#item-title'), item.title);
    assert.include(parseTextFromHTML(getResponse.text, '#item-description'), item.description);
  })
  
});
