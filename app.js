var express = require('express');
var app = express();


// set views
app.set('views', './views');
app.set('view engine', 'ejs');


// content to be displayed
var compliments = require('./models/compliment');
var colors = require('./models/color');


// generate random content
function getRandomCompliments(module) {
  let randomIndex = (Math.floor(Math.random() * module.length));
  return module[randomIndex];
}


// render index content
app.get('/', (req, res) => {
  let randomCompliment = getRandomCompliments(compliments);
  let randomColor = getRandomCompliments(colors);
  res.render('index', {color: randomColor,
                  compliment: randomCompliment});
});

// render index content
app.get('/:id', (req, res) => {
  var name = req.params.id;
  let randomCompliment = getRandomCompliments(compliments);
  let randomColor = getRandomCompliments(colors);
  res.render('name', {name: name,
                      color: randomColor,
                 compliment: randomCompliment});
});


// middleware
app.use((req, res, next) => {
  console.log(`${req.method} requests to ${req.path} from ${req.ip}`);
  next(); // tells app to move on when done
});


// port
var port = process.env.PORT || 3000;
app.listen(port);
console.log(`server started on port ${port}`);