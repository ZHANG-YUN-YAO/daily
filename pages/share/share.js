var app = getApp();
const HOSTNAME = app.globalData.hostname;
// pages/share/share.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  onShow: function () {

  },
  
  onPullDownRefresh: function () {

  },

  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (obj) {
    return {
      title:'daily',
      path:'pages/index/index'
    }
  },
  sharezone(){    
    wx.downloadFile({//从服务器下载图片
      url:HOSTNAME+'/images/logo.png',
      success:(res)=>{
        if(res.statusCode==200){
          wx.saveImageToPhotosAlbum({
            filePath: 'res.tempFilePath',
          })
        }
      }
    })
  },
})