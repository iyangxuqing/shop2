import { Loading } from '../../template/loading/loading.js'
import { Toptip } from '../../template/toptip/toptip.js'
import { Tabbar } from '../../template/tabbar/tabbar.js'

import { PageProducts } from '../../template/pageProducts/index.js'
import { PageShop } from '../../template/pageShop/index.js'
import { PageWode } from '../../template/pageWode/index.js'
import { PageAdmin } from '../../template/pageAdmin/index.js'

let app = getApp()

Page({

  data: {
    youImageMode: app.youImageMode,
    page: 0,
  },

  onTabChanged: function (index) {
    this.setData({
      page: index
    })
    if (index == 0) {
      this.pageProducts.loadData()
      wx.setNavigationBarTitle({
        title: '首页',
      })
    }
    if (index == 1) {
      this.pageShop.loadData()
      wx.setNavigationBarTitle({
        title: '店铺信息',
      })
    }
    if (index == 2) {
      this.pageWode.loadData()
      wx.setNavigationBarTitle({
        title: '我的',
      })
    }
  },

  onToptip: function (message) {
    this.toptip.show({
      title: message,
    })
  },

  onAddressUpdate: function (address) {
    this.pageWode.address.onAddressUpdate(address)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()
    this.toptip = new Toptip()
    this.tabbar = new Tabbar({
      onTabChanged: this.onTabChanged
    })
    this.pageProducts = new PageProducts()
    this.pageShop = new PageShop()
    this.pageWode = new PageWode()
    this.pageAdmin = new PageAdmin()
    this.onTabChanged(0)

    app.listener.on('toptip', this.onToptip)
    app.listener.on('address', this.onAddressUpdate)

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