import { http } from 'http.js'

let app = getApp()

function getResource(options = {}) {
  return new Promise(function (resolve, reject) {
    let resource = app.resource
    if (resource && !options.nocache) {
      resolve(app.resource)
    } else {
      http.get({
        url: 'shop2/resource.php?m=get',
      }).then(function (res) {
        if (res.errno === 0) {
          let resource = res.resource
          app.resource = resource
          resolve(resource)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
  })
}

function setResource(resource) {
  return new Promise(function (resolve, reject) {
    if (app.user.role == 'admin') {
      http.post({
        url: 'shop2/resource.php?m=set',
        data: resource
      }).then(function (res) {
        if (res.errno === 0) {
          resolve(res)
        } else {
          reject(res)
        }
      }).catch(function (res) {
        reject(res)
      })
    }
    let data = {}
    data[resource.key] = resource.value
    app.resource = Object.assign({}, app.resource, data)
    app.listener.trigger('resource', app.resource)
  })
}

export var Resource = {
  get: getResource,
  set: setResource,
}