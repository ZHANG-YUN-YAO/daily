const app = getApp();
const HOSTNAME = app.globalData.hostname;
Page({
  data: {
    HOSTNAME:HOSTNAME,
    goodsinfo: null,
    bannerImg:[],
    // number: 0,
    // index1: 1,
    // distance: 0,
    // currentid: 1,
    gid: 0,
    cid1:0,
    // tp5: '',
    // detailsTop: '',
    // exploreTop: '',
  },
  getGoodsInfo(){
    let gid =this.data.gid;
    let cid1 = this.data.cid1;
    wx.request({
      url: HOSTNAME + '/goods/goodsinfo',    
      data:{
        gid:gid,
        cid1:cid1,
        
      },  
      success:(res)=>{
        
        let banner = res.data.goodsinfo.gbanner.split(',')
        console.log(banner)
        banner.forEach((banner) => {
            console.log(banner)
        })
        this.setData({  
          bannerImg: banner,
          goodsinfo: res.data.goodsinfo,
          })                       
        }      
    })
  },
  onLoad: function (options) {
    // console.log(options);
    this.setData({
      gid: options.gid,
      cid1: options.cid1
    })
    this.getGoodsInfo();
  },
  //获取域名
  // getname() {
  //   // var tp5 = getApp().globalData.host;
  //   this.setData({
  //     // tp5: tp5
  //   })
  // },
  //页面滚动
  // onPageScroll: function(e) {
  //   this.setData({
  //     distance: e.scrollTop
  //   })
  //   var that = this;
  //   var query = wx.createSelectorQuery()
  //   query.select('#top-details-header').boundingClientRect()
  //   query.selectViewport().scrollOffset()
  //   query.exec(function(res) {
  //     that.setData({
  //       detailsTop: res[0].top,
  //     })
  //   })
  //   var query = wx.createSelectorQuery()
  //   query.select('#explore-like').boundingClientRect()
  //   query.selectViewport().scrollOffset()
  //   query.exec(function(res) {
  //     that.setData({
  //       exploreTop: res[0].top,
  //     })
  //   })
  //   var that = this;
  //   setTimeout(function() {
  //     if (that.data.detailsTop > 120) {
  //       that.setData({
  //         currentid: 1
  //       })
  //     } else if (that.data.detailsTop < 120 && that.data.exploreTop > 120) {
  //       that.setData({
  //         currentid: 2
  //       })
  //     } else if (that.data.exploreTop < 120) {
  //       that.setData({
  //         currentid: 4
  //       })
  //     }
  //   }, 300)
  // },
  //点击头部的内容
  // changeColor: function(e) {
  //   setTimeout(function() {
  //     if (e.currentTarget.dataset.id == 1) {
  //       wx.pageScrollTo({
  //         scrollTop: 0,
  //         duration: 300
  //       })
  //     } else if (e.currentTarget.dataset.id == 2) {
  //       wx.pageScrollTo({
  //         scrollTop: 502,
  //         duration: 300
  //       })
  //     } else if (e.currentTarget.dataset.id == 4) {
  //       wx.pageScrollTo({
  //         scrollTop: 724,
  //         duration: 300
  //       })
  //     }
  //   }, 300)
  //   this.setData({
  //     currentid: e.currentTarget.dataset.id
  //   })

  // },
  // addIndex: function(e) {
  //   this.setData({
  //     index1: e.detail.current + 1,
  //   })
  // },
  // 加入购物车
  // addCar: function() {
  //   wx.request({
  //     url: this.data.tp5 + '/appfront/Cart/addCart',
  //     data: {
  //       gid: options.target.dataset.id,
  //       openId: wx.getStorageSync('openId')
  //     },
  //     success: res => {
  //       if (res.data.code == 0) {
  //         this.setData({
  //           number: this.data.number + 1,
  //         })
  //       } else {
  //         wx.showToast({
  //           title: '加入购物车失败',
  //           icon: 'none'
  //         })
  //       }
  //     }
  //   })
  // },
  //获取商品详情
  // getProduct() {
  //   wx.request({
  //     url: this.data.tp5 + '/appfront/Product/getProduct?gid=' + this.data.gid,
  //     success: res => {
  //       if (res.data.code == 0) {
  //         this.setData({
  //           goodsinfo: res.data.product
  //         })
  //       } else {
  //         wx.showToast({
  //           title: '暂无商品详情',
  //           icon: 'none'
  //         })
  //       }
  //     }
  //   })
  // },
  // onLoad: function(options) {
  //   this.setData({
  //     gid: options.gid,
  //     cid1:options.cid1
  //   })
    // console.log(options)
    // this.getname();
    // this.getProduct();
  // },
  // onReady: function() {},
  // onShow: function() {},
  // onHide: function() {},
  // onUnload: function() {},
  // onPullDownRefresh: function() {},
  // onReachBottom: function() {},
  // onShareAppMessage: function() {}
})