const express = require('express')
const routes = require('./routes')
const app = express()

routes(app)

app.listen(3000, () => {
  console.log('TastyCity Server listening on port 3000!')
})
