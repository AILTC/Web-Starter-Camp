var express = require('express')
var bodyParser = require('body-parser')
var request = require('request')
var path = require('path')
var app = express()

app.set('view engine','ejs')

// middleware
app.use(require('morgan')('dev'))
app.use(bodyParser.json({ type: 'applictaion/json' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(require('serve-static')(path.join(__dirname, 'public')))

// REST API
app.get('/1/hello', function (req, res) {
  res.json({msg: 'Hello World'})
})

app.post('/1/hello', function (req, res) {
  if (req.body.name) {
    res.json({msg: 'Hi! ' + req.body.name + '.'})
  } else {
    res.json({msg: 'error'})
  }
})

app.get('/1/classes', function (req, res) {
  request('http://140.92.88.141/1/classes', function (error, response, body) {
    res.json(JSON.parse(body))
  })
})

app.get('/1/class/:id', function (req, res) {
  request('http://140.92.88.141/1/class/' + req.params.id, function (error, response, body) {
    res.json(JSON.parse(body))
  })
})

// frontend
app.get('/',function(req,res){
  res.render('index',{msg:'Hello World!'})
})

app.get('/classes',function(req,res){
  res.render('classes')
})

app.get('/class/:id',function(req,res){
  res.render('class', {id: req.params.id})
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
