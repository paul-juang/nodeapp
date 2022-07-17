//demo for storing api_key on the client
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

//app.set
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname,"public")));

app.use(express.json());
app.use(cors());


// middleware
const port = process.env.PORT || 3000;
const MAX = process.env.API_MAX || 25;


const users = [
  {
    _id: 1587912698986,
    api_key: 'an0qrr5i9u0q4km27hv2hue3ywx3uu',
    email: 'steve@home.org',
    host: 'http://127.0.0.1:3000',
    usage: [{ date: '2020-05-08', count: 17 }],
  },
];

const cheeses = [
  { _id: 1, name: 'Cheddar' },
  { _id: 2, name: 'Mozzarella' },
];

const genKey = () => {
  //create a base-36 string that is always 30 chars long a-z0-9
  // 'an0qrr5i9u0q4km27hv2hue3ywx3uu'
  return [...Array(30)]
    .map((e) => ((Math.random() * 36) | 0).toString(36))
    .join('');
};

const createUser = (_email, req) => {
  let today = new Date().toISOString().split('T')[0];
  let user = {
    _id: Date.now(),
    api_key: genKey(),
    email: _email,
    host: req.headers.origin, //  http://localhost:3000
    usage: [{ date: today, count: 0 }],
  };
  //When the developer registers a key, they typically provide a hostname where the key will
  // be used. We are getting that value from req.headers.origin which is what my browser sent
  console.log('add user');
  users.push(user);
  return user;
};

const validateKey = (req, res, next) => {
  //Where is the API key expected to be?
  let host = req.headers.origin;
  console.log('req.headers.origin', host);

  //let api_key = req.query.api_key; //version 1 with the querystring
  //let api_key = req.params.apikey; //version 2 with the URL params
  let api_key = req.header('x-api-key'); //version 3 using a header
  //console.log('x-api-key', api_key);

  let account = users.find(
    //(user) => user.host == host && user.api_key == api_key
    (user) => user.api_key == api_key

  );
  // find() returns an object or undefined
  if (account) {
    //good match
    //check the usage
    let today = new Date().toISOString().split('T')[0];
    let usageIndex = account.usage.findIndex((day) => day.date == today);
    if (usageIndex >= 0) {
      //already used today
      if (account.usage[usageIndex].count >= MAX) {
        //stop and respond
        res.status(429).send({
          error: {
            code: 429,
            message: 'Max API calls exceeded.',
          },
        });
      } else {
        //have not hit todays max usage
        account.usage[usageIndex].count++;
        console.log('Good API call', account.usage[usageIndex]);
        next();
      }
    } else {
      //not today yet
      account.usage.push({ date: today, count: 1 });
      //ok to use again
      next();
    }
  } else {
    //stop and respond
    res.status(403).send({ error: { code: 403, message: 'You not allowed.' } });
  }
};

//
app.get('/fractal', (req, res) => {
      res.render("fractal")
});

app.get('/', (req, res) => {
      res.render("api")
});

app.post('/api/register', (req, res) => {
  //create a new registered user
  //just need to submit an email address
  //real world would send an email and then put the account into
  //a pending status until the email is validated...
  //...video for another day.

  let email = req.body.email;
  let user = createUser(email, req);
  console.log('USER LIST');
  console.log(users);
  res.status(201).send({ data: user });
});

app.get('/api/cheese', validateKey, (req, res) => {
  //get list of all cheeses   // v2 has /:apikey
  let today = new Date().toISOString().split('T')[0];
  console.log(today);
  res.status(200).send({
    data: cheeses,
  });
});

app.post('/api/cheese', validateKey, (req, res) => {
  //add a new cheese  /:apikey
  let cheese = {
    _id: Date.now(),
    name: req.body.cheese,
  };
  cheeses.push(cheese);
  res.status(201).send({
    data: cheese,
  });
});

app.put('/api/cheese/:id', validateKey, (req, res) => {
  //update a cheese with req.params.id   /:apikey
  res.status(200).send({
    data: {
      message: `Cheese ${req.params.id} updated.`,
    },
  });
});

app.delete('/api/cheese/:id', validateKey, (req, res) => {
  //delete a cheese with req.params.id /:apikey
  res.status(200).send({
    data: {
      message: `Cheese ${req.params.id} deleted.`,
    },
  });
});

app.listen(port, function (err) {
  if (err) {
    console.error('Failure to launch server');
    return;
  }
  console.log(`Listening on port ${port}`);
});