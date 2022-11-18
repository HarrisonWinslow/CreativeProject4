// USE MONGO

const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/characters', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});




// ADD SCHEMAS

const characterSchema = new mongoose.Schema({
  name: String,
  characterClass: String,
  race: String,
  lvl: Number,
  str: Number,
  dex: Number,
  con: Number,
  int: Number,
  wis: Number,
  cha: Number
});

characterSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
characterSchema.set('toJSON', {
  virtuals: true
});

const Character = mongoose.model('Character', characterSchema);

const monsterSchema = new mongoose.Schema({
  name: String,
  ac: Number,
  hp: Number,
  str: Number,
  dex: Number,
  con: Number,
  int: Number,
  wis: Number,
  cha: Number
});

monsterSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
monsterSchema.set('toJSON', {
  virtuals: true
});

const Monster = mongoose.model('Monster', monsterSchema);

const itemSchema = new mongoose.Schema({
  name: String,
  itemDescription: String
});

monsterSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
itemSchema.set('toJSON', {
  virtuals: true
});

const Item = mongoose.model('Item', itemSchema);



// CREATE ENDPOINT

app.get('/api1/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send({characters: characters});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api1/characters', async (req, res) => {
    const character = new Character({
    name: req.body.name,
    characterClass: req.body.characterClass,
    race: req.body.race,
    lvl: req.body.lvl,
    str: req.body.str,
    dex: req.body.dex,
    con: req.body.con,
    int: req.body.int,
    wis: req.body.wis,
    cha: req.body.cha
  });
  try {
    await character.save();
    res.send({character:character});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api1/characters/:id/:lvl', async (req, res) => {
  try {
    await Character.updateOne({ _id: req.params.id }, {
      lvl: req.params.lvl
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api1/characters/:id', async (req, res) => {
  try {
    await Character.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api1/monsters', async (req, res) => {
  try {
    let monsters = await Monster.find();
    res.send({monsters: monsters});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api1/monsters', async (req, res) => {
    const monster = new Monster({
    name: req.body.name,
    ac: req.body.ac,
    hp: req.body.hp,
    str: req.body.str,
    dex: req.body.dex,
    con: req.body.con,
    int: req.body.int,
    wis: req.body.wis,
    cha: req.body.cha
  });
  try {
    await monster.save();
    res.send({monster:monster});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api1/monsters/:id', async (req, res) => {
  try {
    await Monster.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api1/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send({items: items});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api1/items', async (req, res) => {
    const item = new Item({
    name: req.body.name,
    itemDescription: req.body.itemDescription
  });
  try {
    await item.save();
    res.send({item: item});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api1/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});





// RUN SERVER

// Note: I modified the Caddyfile so it'll redirect stuff to 3001 from api1 (instead of api)
app.listen(3001, () => console.log('Server listening on port 3001!'));