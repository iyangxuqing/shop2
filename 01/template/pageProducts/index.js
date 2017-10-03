import { Component } from '../component.js'
import { Resource } from '../../utils/resource.js'
import { Products } from '../../utils/products.js'

let methods = {

  onProductTap: function (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../product/product?id=' + id
    })
  },

}

export class PageProducts extends Component {

  constructor(options) {
    super({
      scope: 'pageProducts',
      data: options,
      methods: methods,
    })
  }

  loadData() {
    Promise.all([Resource.get(), Products.getProducts()]).then(function (res) {
      let resource = res[0]
      let products = res[1]
      let homeLogo = resource['homeLogo']
      let homeSlogan = resource['homeSlogan']
      let homeHeadImages = JSON.parse(resource['homeHeadImages'] || '[]')

      this.setData({
        products,
        homeLogo,
        homeSlogan,
        homeHeadImages,
        ready: true
      })
    }.bind(this))
  }

  onResourceUpdate(resource) {
    let page = getCurrentPages().pop()
    let homeLogo = resource['homeLogo']
    let homeSlogan = resource['homeSlogan']
    let homeHeadImages = JSON.parse(resource['homeHeadImages'] || '[]')
    this.setData({
      homeLogo,
      homeSlogan,
      homeHeadImages
    })
  }

  onProductsUpdate(products) {
    this.setData({
      products
    })
  }

}