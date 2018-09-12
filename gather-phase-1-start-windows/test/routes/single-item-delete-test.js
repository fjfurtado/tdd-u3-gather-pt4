const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const Item = require('../../models/item');

describe('/items/:id/delete', ()=>{

    beforeEach(connectDatabaseAndDropData);

    afterEach(diconnectDatabase);

    it('should delete an item from the db', async ()=>{
        const item = await seedItemToDatabase();
        const response = await request(app).post(`/items/${item._id}/delete`).type('form').send();

        assert.equal(response.status, 302);
        assert.equal(response.headers.location, '/');
        assert.lengthOf(await Item.find({}), 0);
    })
})