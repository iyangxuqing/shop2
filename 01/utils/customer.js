import { http } from 'http.js'

function getCustomers() {
  return new Promise(function (resolve, reject) {
    http.get({
      url: 'shop2/customer.php?m=get',
    }).then(function (res) {
      if (res.errno === 0) {
        resolve(res.users)
      } else {
        reject(res)
      }
    }).catch(function (res) {
      reject(res)
    })
  })
}

export var Customer = {
  get: getCustomers,
}