//index.js

Page({
  data: {
    tArray: ['国内', '国际', '财经', '娱乐', '军事', '体育', '其他'],
    tArray1: ['gn', 'gj', 'cj', 'yl', 'js', 'ty', 'other'],
    curpage: 0,
    detailData: [], //新闻列表
    viewHeight: 500,
  },

  onReady() {
    //获取屏幕的宽度
    var res = wx.getSystemInfoSync();
    var height = res.screenHeight - 40 - 60;
    //console.log("height=", height);
    //设置scroll-view的高度
    this.setData({
      viewHeight: height,
    });
  },

  //页面加载工作
  onLoad() {
    //console.log("curpage=", this.data.curpage);
    this.readList();
  },

 //下拉刷新
  onPullDownRefresh() {
    this.readList(() => {
      wx.stopPullDownRefresh();
    });
  },

  typeClick(e) {
    var idx = e.currentTarget.dataset.idx;
    //console.log(idx);
    var that = this;
    that.setData({
      curpage: idx,
    });
    //console.log("curpage=", this.data.curpage);
    that.readList();
  },

  onTapDetail(e) {
    var index = parseInt(e.currentTarget.dataset.index);
    //console.log("index=" + index);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + this.data.detailData[index].id,
    });
  },

  readList(callback) {
    var that = this;
    //console.log(that.data.tArray1[that.data.curpage]);
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      method: "GET",
      data: {
        "type": that.data.tArray1[that.data.curpage]
      },
      success: res => {
       that.getNewsList(res, that);
      },
      complete: () => {
        callback && callback();
      }
    })
  },

  getNewsList(res, that) {
    let result = res.data.result;
    //console.log(result.length);
    //console.log(result);
    let detailData = [];
    for (let i = 0; i < result.length; i++) {
      let date = "";
      if (result[i].date !== ''){
        let temp = result[i].date.split("T");
        date = temp[0] + "  " + temp[1].split(".")[0];
      }else {
        date = "未知时间";
      }
      let source = result[i].source;
      if(source === "") {
        source = "未知来源";
        }
      detailData.push({
        date: date,
        imagePath: result[i].firstImage,
        id: result[i].id,
        source: source,
        title: result[i].title
      })
    }
    that.setData({
      detailData: detailData
    });
  }
})
