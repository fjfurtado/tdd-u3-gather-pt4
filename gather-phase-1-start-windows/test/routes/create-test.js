const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
  describe('GET request', ()=>{
    it('renders empty input fields', async ()=>{
      //exercise
      const response = await request(app).get('/items/create');

      //verify
      assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
      assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
    })
  });

  describe('POST request', ()=>{
    it('creates creates a new item', async ()=>{
      //setup 
      const itemToCreate = buildItemObject();

      //exercise
      const response = await request(app).post('/items/create').type('form').send(itemToCreate);

      //verify
      const createdItem = await Item.findOne(itemToCreate);

      assert.isOk(createdItem, 'no created item was created');


      /*assert.include(parseTextFromHTML(response.text, '.item-title'), itemToCreate.title);
      const imageElement = findImageElementBySource(response.text, itemToCreate.imageUrl);
      assert.equal(imageElement.src, itemToCreate.imageUrl);*/
    })

    it('after redirects to /', async ()=>{
      //setup 
      const itemToCreate = buildItemObject();

      //exercise
      const response = await request(app).post('/items/create').type('form').send(itemToCreate);

      //verify
      //const createdItem = await Item.findOne(itemToCreate);

      assert.equal(response.status, 302);
      assert.equal(response.headers.location, '/')
    })

    it('shows error when item title is missing', async ()=>{
      //setup 
      const itemToCreate = buildItemObject();
      itemToCreate.title = undefined;

      //exercise
      const response = await request(app).post('/items/create').type('form').send(itemToCreate);

      //verify
      assert.lengthOf(await Item.find({}), 0);
      assert.equal(response.status, 400)
      assert.include(parseTextFromHTML(response.text, '.error'), 'required');
    })

    it('shows error when item description is missing', async ()=>{
      //setup 
      const itemToCreate = buildItemObject();
      itemToCreate.description = undefined;

      //exercise
      const response = await request(app).post('/items/create').type('form').send(itemToCreate);

      //verify
      assert.lengthOf(await Item.find({}), 0);
      assert.equal(response.status, 400)
      assert.include(parseTextFromHTML(response.text, '.error'), 'required');
    })

    it('shows error when item imageUrl is missing', async ()=>{
      //setup 
      const itemToCreate = buildItemObject();
      itemToCreate.imageUrl = undefined;

      //exercise
      const response = await request(app).post('/items/create').type('form').send(itemToCreate);

      //verify
      assert.lengthOf(await Item.find({}), 0);
      assert.equal(response.status, 400)
      assert.include(parseTextFromHTML(response.text, '.error'), 'required');
    })
  });
});
