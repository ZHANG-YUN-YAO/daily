const app = getApp();
const HOSTNAME = app.globalData.hostname;
Page({
  data: {
    HOSTNAME: HOSTNAME,
    goodslist:[],
    fathercate1: [],
    currentItem: 0,
    currentItem1: 0,
    scrollTop: 0,
    flag: true,
    flag1: false,
    heightarr:[],
    currentImg: '/image/img_20181223111224779.png',
    bannerImg: [
      '/image/mis_img_20181222233117165.png',
       '/image/mis_img_20181222230735722.png',
       '/image/img_20181223111224779.png'
       ],
    ids:[],
    toView:''


  },
 
  getfather1() {
    wx.request({
      url: HOSTNAME + '/admin/cate2/queryfathercate',
      success: (res) => {
        this.setData({
          fathercate1: res.data,
          currentItem: res.data[0].cid
        })
        this.querygoods();
      }
    })
  },
  changeItem(event) {//点击一级栏目item
    let id = event.currentTarget.dataset.itemid;
    let index = Math.floor(Math.random() * this.data.bannerImg.length)
    // console.log(event)
    this.setData({
      currentItem: id,
      currentImg:this.data.bannerImg[index]
    })
    this.querygoods();
    this.getHeight();
    // console.log(this.data.heightarr);
  },
 
  tagflag() {//点击箭头
    this.setData({
      // flag: false,
      // flag1: true
      flag: !this.data.flag,
      flag1: !this.data.flag1
    })
  },
  tagflag1() {
    this.setData({
      // flag: true,
      // flag1: false
      flag: false,
      flag1: false
    })
  },

  querygoods() {  //拿到二级栏目和商品列表   
    wx.request({
      url: HOSTNAME + '/goods/goodslist',
      data: {
        cid: this.data.currentItem
      },
      success: (res) => {
        this.setData({
          fathercate2: res.data,
          
        })
        // console.log(this.data.fathercate2[0].cname)
        this.getHeight();
        
      }
    })

  },  
  
  getfather2() { //拿到二级栏目
    wx.request({
      url: HOSTNAME + '/admin/cate2/queryfathercate2',
      data: {
        cid: this.data.currentItem
      },
      success: (res) => {
        this.setData({
          fathercate2: res.data.result,
          currentItem: res.data.result[0].cid
        })
      }
    })
  },

  tagChoose1(event) {//点击二级栏目
    let index = event.currentTarget.dataset.index
    this.setData({
      currentItem1: index,
    })
  },
  scrolling(event){    
    let i2 = this.calcIndex();
    
    this.setData({
      scrollTop: event.detail.scrollTop,
      currentItem1: i2,
      toView:this.data.ids[i2]
    })
    // console.log(this.data.toView);
    
    
    // console.log(this.data.currentItem1)
  },

  calcIndex() {  // 算currentItem1
    
    let scrollTop = this.data.scrollTop;
    // console.log(scrollTop);
    if(scrollTop == 0 ||scrollTop<=this.data.heightarr[0]){
      return 0;
    }
    for(let i=0;i<this.data.heightarr.length;i++){
      let heightarr = this.data.heightarr[i];
      let heightarr1 = this.data.heightarr[i+1];
      if (!heightarr || (scrollTop > heightarr && scrollTop<heightarr1)){
        return i;
      }
    }
  },
  

  getHeight(){//获取元素信息
    this.setData({
      heightarr:[],
      ids:[]
    })    
    wx.createSelectorQuery().selectAll('.c-body-content').boundingClientRect((rects)=>{
     
      rects.forEach((rect)=>{
       //返回获取到的节点的信息
        // let ids = rects.dataset.index,
        // this.data.ids.push('item-'+ids)
        this.data.ids.push(rect.id);
        this.data.heightarr.push(rect.top)

        // this.data.heightarr+=rect.height;
        // console.log(this.data.heightarr)
      })    
      // console.log(this.data.heightarr);    
    }).exec();
    
  },
  onShow() {
    this.getfather1();
  },
})