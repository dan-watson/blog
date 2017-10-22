const fs = require('fs');
const express = require('express');
const app = express();
const marked = require('marked');

let header = fs.readFileSync('site/header.html').toString();
let footer = fs.readFileSync('site/footer.html').toString();

app.use(express.static('site'));

app.get('/', function (req, res) {
  send(req, res, 'index');
});

app.get('/:post', function (req, res) {
  send(req, res, req.params.post);
});

app.listen((process.env.PORT || 8080), () => {
  console.log('Listening....');
});

function send(req, res, post) {
  new Promise((resolve, reject) => {
    fs.readFile(`site/content/${post}.md`, (err, data) => {
      if(err) return reject(err);
      resolve(data);
    });
  }).then((content) => {
    res.send(header.replace('{title}', t(post))  + marked(content.toString()) + footer);
  }).catch((reason) => {
    res.sendStatus(404);
  });
}

function t(str) {
  return str.split('-').map(word => 
    word.replace(word[0], word[0].toUpperCase())).join(' ');
}
