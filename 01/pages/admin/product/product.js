import { SwiperImagesEditor } from '../../../template/swiperImagesEditor/swiperImagesEditor.js'
import { Products } from '../../../utils/products.js'

let app = getApp()

Page({

  hasChanged: false,

  data: {
    youImageMode: app.youImageMode,
  },

  onTitleBlur: function (e) {
    let title = e.detail.value
    let oldTitle = this.data.product.title
    if (title != oldTitle) {
      this.setData({
        'product.title': title
      })
      this.hasChanged = true
    }
  },

  onDescsBlur: function (e) {
    let descs = e.detail.value
    let oldDescs = this.data.product.descs
    if (descs != oldDescs) {
      this.setData({
        'product.descs': descs
      })
      this.hasChanged = true
    }
  },

  onImagesChanged: function (images) {
    this.setData({
      'product.images': images
    })
    this.hasChanged = true
  },

  loadProduct: function (options = {}) {
    let id = options.id
    let product = {
      id: '',
      title: '',
      images: [],
      descs: '',
      sort: 9999
    }
    if (id) {
      product = Products.get({ id })
    }
    return product
  },

  saveProduct: function () {
    if (this.hasChanged) {
      let product = this.data.product
      Products.set(product)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let product = this.loadProduct(options)
    this.swiperImagesEditor = new SwiperImagesEditor({
      images: product.images,
      onImagesChanged: this.onImagesChanged,
      maxImagesLength: 9,
    })
    this.setData({
      product: product,
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
  onHide: function (e) {
    this.saveProduct()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function (e) {
    this.saveProduct()
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