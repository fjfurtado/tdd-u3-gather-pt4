const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});
});

// Add additional routes below:

router.get('/items/create', (req, res)=>{
  res.render('create');
})

router.post('/items/create', async (req, res)=>{
  const newItem = new Item(req.body);
  newItem.validateSync();
  if (newItem.errors){
    res.status(400).render('create', {newItem: newItem});
  }
  else{
    await newItem.save();
    res.redirect('/');
  }
})

router.get('/items/:id', async (req, res)=>{
  const item = await Item.findOne({_id: req.params.id});
  res.render('single', {item});
})

router.post('/items/:id/delete', async (req, res)=>{
  await Item.deleteOne({_id: req.params.id});
  res.redirect('/');
})

module.exports = router;
