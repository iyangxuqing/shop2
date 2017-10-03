Page({

  data: {

  },

  onAdminProductTap: function (e) {
    wx.navigateTo({
      url: '../products/products',
    })
  },

  onAdminCouponTap: function (e) {
    wx.navigateTo({
      url: '../coupons/coupons',
    })
  },

  onAdminShopTap: function (e) {
    wx.navigateTo({
      url: '../shop/shop',
    })
  },

  onCustomerTap: function (e) {
    wx.navigateTo({
      url: '../customer/customer'
    })
  },

  onDataverTap: function (e) {
    wx.navigateTo({
      url: '../datavers/datavers',
    })
  },

  onDataverShow: function (e) {
    this.setData({
      dataverShow: true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataverShow: false
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
    this.setData({
      dataverShow: false
    })
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