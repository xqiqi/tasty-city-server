const path = require('path')
const low = require('lowdb')
const fileAsync = require('lowdb/lib/storages/file-async')

// Start database using file-async storage
// For ease of use, read is synchronous
const db = low(path.resolve(__dirname, '../data/db.json'), {
  storage: fileAsync
})

module.exports = (app) => {
  app.get('/', (req, res) => {
    const value = db.get('list').first().value()
    res.send(value);
  })
}
