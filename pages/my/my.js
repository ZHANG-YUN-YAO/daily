var app = getApp();
const HOSTNAME = app.globalData.hostname;
Page({
//   data: {
//     tp5: '',
//     personalInfo: '',
//     deng:"凡仙、天仙、金仙、大罗金仙、玄仙、仙君、仙尊、仙帝"
//   },
//   //获取域名
//   getname() {
//     var tp5 = getApp().globalData.host;
//     this.setData({
//       tp5: tp5
//     })
//   },
//   //获取个人信息
//   getPersonalInfo() {
//     wx.request({
//       url: this.data.tp5 + '/appfront/Userinfo/getPersonalInfo',
//       data: {
//         openId: wx.getStorageSync('openId')
//       },
//       success: res => {
//         if (res.data.code == 0) {
//           this.setData({
//             personalInfo: res.data.personalInfo
//           })
//         } else {
//           wx.showToast({
//             title: '服务器错误',
//             icon: 'none'
//           })
//         }
//       }
//     })
//   },
//   allForm: function() {
//     app.globalData.currentLocation = 0,
//       wx.navigateTo({
//         url: '../../user/pages/order/order'
//       })
//   },
//   noPay: function() {
//     app.globalData.currentLocation = 1,
//       wx.navigateTo({
//         url: '../../user/pages/order/order'
//       })
//   },
//   noSend: function() {
//     app.globalData.currentLocation = 2,
//       wx.navigateTo({
//         url: '../../user/pages/order/order'
//       })
//   },
//   sended: function() {
//     app.globalData.currentLocation = 3,
//       wx.navigateTo({
//         url: '../../user/pages/order/order'
//       })
//   },
//   evaluate: function() {
//     app.globalData.currentLocation = 4,
//       wx.navigateTo({
//         url: '../../user/pages/order/order'
//       })
//   },
//   ScrollTo: function() {

//   },
//   onLoad: function(options) {
//     this.getname();
//     this.getPersonalInfo();
//   },
//   onReady: function() {

//   },
//   onShow: function() {

//   },
//   onHide: function() {

//   },
//   onUnload: function() {

//   },
//   onPullDownRefresh: function() {

//   },
//   onReachBottom: function() {

//   },
//   onShareAppMessage: function() {

//   }
  data: {
    userInfo: '',
    flag: false,
  },
  onLoad: function (options) {

  },
  login() { },
  onShareAppMessage() { },
  onShow: function () {
    this.isLogin();
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {// 页面相关事件处理函数--监听用户下拉动作


  },
  onShareAppMessage: function () {

  },
  isLogin() {
   this.data.flag =wx.getStorageSync('openid') ? ture:false;
  },
  getUserInfo(event) {
    let that = this;
    // console.log(event)
    // app.globalData.userinfo = event.detail.userinfo
    this.setData({
      userInfo: event.detail.userInfo
    })
    console.log(this.data.userInfo)
    wx.login({
      success:(res)=>{
        // console.log(res)
        if (res.code) {
          wx.request({
            url: HOSTNAME + '/login/login',
            data: {
              code: res.code,
              nickname: that.data.userInfo.nickName,
              avatarurl: that.data.userInfo.avatarUrl
            },
            success: (res) => {
              if (res.code == 0) {
                wx.setStorageSync('', res.data.openid)
              }
            }
          })
        }
      }
    })
  }
})