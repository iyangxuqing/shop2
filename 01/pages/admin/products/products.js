import { Loading } from '../../../template/loading/loading.js'
import { http } from '../../../utils/http.js'
import { Resource } from '../../../utils/resource.js'
import { Products } from '../../../utils/products.js'
import { SwiperImagesEditor } from '../../../template/swiperImagesEditor/swiperImagesEditor.js'
import { ListGridEditor } from '../../../template/listGridEditor/listGridEditor.js'

let app = getApp()

Page({

  data: {
    youImageMode: app.youImageMode,
  },

  onProductsUpdate: function (products) {
    this.setData({
      'listGridEditor.items': products
    })
  },

  onHomeHeadImagesChanged: function (images) {
    Resource.set({
      key: 'homeHeadImages',
      value: JSON.stringify(images),
    })
  },

  onHomeSloganBlur: function (e) {
    let value = e.detail.value
    let homeSlogan = value
    Resource.set({
      key: 'homeSlogan',
      value: homeSlogan,
    })
  },

  onHomeLogoTap: function (e) {
    let page = this
    http.chooseImage().then(function (image) {
      let homeLogo = image
      page.setData({ homeLogo })
      Resource.set({
        key: 'homeLogo',
        value: homeLogo
      })
    })
  },

  onGridItemTap: function (item) {
    wx.navigateTo({
      url: '../product/product?id=' + item.id
    })
  },

  onGridItemDel: function (product) {
    Products.del(product)
  },

  onGridItemSort: function (products) {
    Products.sort(products)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loading = new Loading()
    app.listener.on('products', this.onProductsUpdate)

    let page = this
    page.loading.show()
    Promise.all([Resource.get(), Products.getProducts()]).then(function (res) {
      let resource = res[0]
      let products = res[1]
      page.listGridEditor = new ListGridEditor({
        items: products,
        onItemTap: page.onGridItemTap,
        onItemDel: page.onGridItemDel,
        onItemSort: page.onGridItemSort
      })
      let homeHeadImages = resource['homeHeadImages'] || '[]'
      homeHeadImages = JSON.parse(homeHeadImages) || []
      let homeSlogan = resource['homeSlogan']
      let homeLogo = resource['homeLogo']
      page.swiperImagesEditor = new SwiperImagesEditor({
        images: homeHeadImages,
        onImagesChanged: page.onHomeHeadImagesChanged,
      })
      page.setData({
        homeSlogan: homeSlogan,
        homeLogo: homeLogo,
        ready: true,
      })
      page.loading.hide()
    })
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