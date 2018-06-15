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

app.get('/hello', function (req, res) {
  res.json({msg: 'Hello World'})
})

app.post('/hello', function (req, res) {
  if (req.body.name) {
    res.json({msg: 'Hi! ' + req.body.name + '.'})
  } else {
    res.json({msg: 'error'})
  }
})

app.get('/weathers/5', function (req, res) {
  request('https://works.ioa.tw/weather/api/weathers/5.json', function (error, response, body) {
    res.json(JSON.parse(body))
  })
})

app.get('/',function(req,res){
  res.render('index',{msg:'Hello World!'})
})

app.get('/class',function(req,res){
  res.render('class')
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
