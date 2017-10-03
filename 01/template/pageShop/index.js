import { Component } from '../component.js'
import { Shop } from '../../utils/shop.js'

let methods = {

  onPhoneTap: function (e) {
    let shop = this.getData('shop')
    wx.makePhoneCall({
      phoneNumber: shop.phone,
    })
  },

  onAddressTap: function (e) {
    let shop = this.getData('shop')
    wx.openLocation({
      name: shop.name,
      address: shop.address,
      latitude: shop.latitude,
      longitude: shop.longitude,
    })
  },

}

export class PageShop extends Component {

  constructor(options) {
    super({
      scope: 'pageShop',
      data: options,
      methods: methods
    })
  }

  loadData() {
    Shop.get().then(function (shop) {
      this.setData({
        shop,
        ready: true
      })
    }.bind(this))
  }

  onShopUpdate(shop) {
    this.setData({
      shop
    })
  }

}