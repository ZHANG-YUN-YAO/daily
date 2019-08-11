const app = getApp();
const HOSTNAME = app.globalData.hostname;
// pages/mine/mine.js
Page({
  data: {
    userinfo:null,
    flag:false,
  },
  onLoad: function (options) {

  },
  login(){},
  onShareAppMessage(){},
  onShow: function () {
    this.isLogin();
  },
  onUnload: function () {

  },  
  onPullDownRefresh: function () {// 页面相关事件处理函数--监听用户下拉动作
   

  },
  onShareAppMessage: function () {

  },
  isLogin(){
    wx.getStorageSync('openid'?true:false)
  },
  getUserInfo(event){
    // event.detail.userinfo
    // app.globalData.userinfo = event.detail.userinfo
    this.setData({
     userinfo :event.detail.userInfo
    })
    wx.login({
      success(res){
        if(res.code){
          wx.request({
            url: HOSTNAME+'/login/login',
            data:{
              code:res.code,
              nickname:nickName,
              avatarurl: avatarurl
            },
            success:(res)=>{
                if(res.code==0){
                  wx.setStorageSync('', res.data.openid)
              }
            }
          })
        }
      }
    })
  }
})