import { http } from 'http.js'

let app = getApp()

function getProducts(options = {}) {
  return new Promise(function (resolve, reject) {
    let products = app.products
    if (products && !options.nocache) {
      resolve(app.products)
    } else {
      http.get({
        url: 'shop2/products.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let products = res.products
          for (let i in products) {
            products[i].images = JSON.parse(products[i].images)
          }
          app.products = products
          resolve(products)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

function getProductsSync() {
  return app.products
}

function getProduct(options) {
  let id = options.id
  let products = app.products
  for (let i in products) {
    if (products[i].id == id) {
      return products[i]
    }
  }
}

function setProduct(product) {
  return new Promise(function (resolve, reject) {

    let products = app.products
    let index = -1
    for (let i in products) {
      if (products[i].id == product.id) {
        index = i
        products[i] = product
      }
    }
    if (index < 0) {
      index = products.length
      products.push(product)
    }

    if (app.user.role == 'admin') {
      http.get({
        url: 'shop2/products.php?m=set',
        data: product
      }).then(function (res) {
        if (res.errno === 0) {
          resolve(res)
          if (res.insertId) {
            product.id = res.insertId
          }
          app.listener.trigger('products', products)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    } else {
      if (product.id == '') {
        products[index].id = Date.now()
      }
      app.listener.trigger('products', products)
    }
  })
}

function delProduct(product) {
  let id = product.id
  let products = app.products
  for (let i in products) {
    if (products[i].id == id) {
      products.splice(i, 1)
      break
    }
  }

  if (app.user.role == 'admin') {
    http.get({
      url: 'shop2/products.php?m=del',
      data: product
    })
  }
  app.listener.trigger('products', products)
}

function sortProduct(products) {
  for (let i in products) {
    let id = products[i].id
    for (let j in app.products) {
      if (app.products[j].id == id) {
        if (i != j) {
          if (app.user.role == 'admin') {
            http.get({
              url: 'shop2/products.php?m=set',
              data: { id, sort: i }
            })
          }
        }
        break
      }
    }
  }

  app.products = products
  app.listener.trigger('products', products)
}

export var Products = {
  getProducts: getProducts,
  getProductsSync: getProductsSync,
  get: getProduct,
  set: setProduct,
  del: delProduct,
  sort: sortProduct,
}