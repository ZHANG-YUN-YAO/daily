//index.js
//获取应用实例
const app = getApp();
const HOSTNAME = app.globalData.hostname;

Page({
  data: {
    goodslist: [],
    category: [],
    totalPage:0,
    currentPage:0,
    HOSTNAME:HOSTNAME
  },
  getCategory(){
      let that = this;
      wx.request({
        url: HOSTNAME +'/admin/cate2/queryfathercate',   
           
        success(res){
          that.setData({
              category:res.data.slice(0,8)
          })
        }
      })
  },
  getGoodslist(){
    wx.request({
      url: HOSTNAME+'/goods/query',
      data:{
        currentPage:1
      },
      success:(res)=> {
        // console.log(res);
        if (res.data.code ==0) {
          
          this.setData({          
            goodslist: res.data.data,
            totalPage: res.data.totalPage
          })
        }else{
          this.setData({
            goodslist: [],
            totalPage:0
          })
        }
      }
    })
  },
  onLoad: function () {
    
  },
  onShow(){
    this.getCategory();
    this.getGoodslist();
  },
  onReachBottom(){
    this.setData({
      currentPage:this.data.currentPage+1
    })
    if(this.data.currentPage > this.data.totalPage){
      return;
    }
  
  wx.request({
    url:HOSTNAME+'/goods/query',
    data:{
      currentPage:this.data.currentPage
    },
    success:(res)=>{
      let arr = this.data.goodslist.concat(res.data.data)
      this.setData({
        goodslist:arr
      })
    }
  })
},




//给车里加商品
insertGoods(event){  

  let index = event.currentTarget.dataset.index;
   
  this.setData({
    ['goodslist['+index+'].numbers']:1
  })  
 
  
  if (!this.isExitCart()){
    this.initCart();
  }
  
  let cart = wx.getStorageSync('cart'); 
  // console.log(cart)
  cart.goods.push(this.data.goodslist[index]);  
  wx.setStorage({
    key: 'cart',    
    data:{
      goods:cart.goods
    }
  });
},

  // addGoods(event){
  //   let gid =event.currentTarget.dataset.gid;
  //   let cart = wx.getStorageSync('cart');
  //   // let car = cart.goods.filter(goods.gid!=gid)[0] 
  //   // car.numbers++;
  //   // cart.goods.numbers; 
  //   // console.log(cart.goods[0].numbers)
  // //   console.log(cart.goods.filter(goods.gid != gid)[0] )
  // for(let i=0;i<cart.goods.length;i++){
  //   // let car = cart.goods.filter(goods.gidi != gid)[              0]
  //   console.log(cart.goods[i])
  // }
  // },


// 1 本地存储  购物车
// 2 登录  换取openid放到本地
// 3 从服务器下载图片，保存到相册   api
  
  initCart(){
    wx.setStorage({
      key:'cart',
      data:{
        gprice: 0,
        gdiscount: 0,
        gcount: 0,
        goods: []
      }
      
    })
  },

  isExitCart() {  // 看本地有没有购物车
    if(!wx.getStorageSync('cart')){
      return false;
    }
    return true;
  }
})