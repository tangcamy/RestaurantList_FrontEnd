//1- include express
const express = require('express')
const app = express()
const restaurantList = require('./restaurant.json')
//define server related variables
const port = 3000


// 2- require express-handlebars here，setting template engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 3- setting static files
app.use(express.static('public'))

// 4-setting the route and corresponding response 
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.find(function (rest) {
    return rest.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  //"name": category
  //console.log(req.query.keyword)
  const restaurantsFilter = restaurantList.results.filter(function (rest) {
    return rest.name.toLowerCase().includes(req.query.keyword.toLowerCase()) || rest.category.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurantsFilter,keyword:req.query.keyword })
})
// 5- Listen and start the server，//localhost:3000/
app.listen(port, () => {
  console.log(`Restaurant List web is running on http://localhost:${port}`)
})

