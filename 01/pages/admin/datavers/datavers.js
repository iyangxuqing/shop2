import { Resource } from '../../../utils/resource.js'
import { Products } from '../../../utils/products.js'
import { Shop } from '../../../utils/shop.js'
import { User } from '../../../utils/user.js'
import { Coupons } from '../../../utils/coupons.js'
import { Datavers } from '../../../utils/datavers.js'

let app = getApp()

Page({

  data: {

  },

  onDataverTap: function (e) {
    let id = e.currentTarget.dataset.id
    let datavers = this.data.datavers
    let sid = ''
    let name = ''
    for (let i in datavers) {
      if (datavers[i].id == id) {
        sid = datavers[i].sid
        name = datavers[i].name
        datavers[i].active = 1
      } else {
        datavers[i].active = 0
      }
    }

    wx.setStorageSync('sid', sid)
    this.setData({ datavers })
    wx.setNavigationBarTitle({
      title: name,
    })
    app.listener.trigger('dataver', sid)
  },

  onDataverChanged: function (e) {
    delete app.resource
    delete app.products
    delete app.shop
    delete app.user
    delete app.coupons
    Resource.get().then(function (resource) {
      app.listener.trigger('resource', resource)
    })
    Products.getProducts().then(function (products) {
      app.listener.trigger('products', products)
    })
    Shop.get().then(function (shop) {
      app.listener.trigger('shop', shop)
    })
    User.getUser().then(function (user) {
      app.listener.trigger('user', user)
      app.user = Object.assign({}, app.user, user);
    })
    Coupons.getCoupons().then(function (coupons) {
      app.listener.trigger('coupons', coupons)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.listener.on('dataver', this.onDataverChanged)
    let sid = wx.getStorageSync('sid')
    Datavers.get().then(function (datavers) {
      datavers[0].active = 1
      let index = -1
      for (let i in datavers) {
        if (datavers[i].sid == sid) {
          index = i
        }
        datavers[i].active = 0
      }
      if (index < 0) index = 0;
      datavers[index].active = 1
      this.setData({
        datavers: datavers
      })
      wx.setNavigationBarTitle({
        title: datavers[index].name,
      })
    }.bind(this))

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})