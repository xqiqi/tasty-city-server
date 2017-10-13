const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(path.resolve(__dirname, '../data/db.json'))
const db = low(adapter)

module.exports = (app) => {

  /**
   * get all items from the given city
   */
  app.get('/city/:id', (req, res) => {
    const items = db
      .get('items')
      .filter({city: req.params.id})
      .value()
    res.send(items)
  })

  /**
   * get the item detail
   */
  app.get('/item/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const item = db
      .get('items')
      .find({id: id})
      .value()
    res.send(item)
  })

  /**
   * get the items in the given list
   */
  app.get('/list/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const list = db
      .get('lists')
      .find({id: id})
      .value()

    let itemsDetail = []
    list.items.forEach((id) => {
      const detail = db
        .get('items')
        .find({id: id})
        .value()
      itemsDetail.push(detail)
    })

    list.items = itemsDetail
    res.send(list)
  })
}
