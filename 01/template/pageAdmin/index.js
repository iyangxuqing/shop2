import { Component } from '../component.js'

let methods = {

  onAdminProductTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/products/products',
    })
  },

  onAdminCouponTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/coupons/coupons',
    })
  },

  onAdminShopTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/shop/shop',
    })
  },

  onCustomerTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/customer/customer'
    })
  },

  onDataverTap: function (e) {
    wx.navigateTo({
      url: '/pages/admin/datavers/datavers',
    })
  },

  onDataverShow: function (e) {
    this.setData({
      dataverShow: true
    })
  },

}

export class PageAdmin extends Component {

  constructor(options) {
    super({
      scope: 'pageAdmin',
      data: options,
      methods: methods
    })
  }

}