// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news_id: "",
    news_source: "",
    news_title: "",
    news_date: "",
    news_contents: [],
    news_readCount: '',
    //length: 5
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      news_id: options.id,
    });
    //console.log(this.data.news_id);
    this.getNewsDetail();
  },

  getNewsDetail() {
    wx.request({
      url: "https://test-miniprogram.com/api/news/detail",
      method: 'GET', //默认为GET
      data: {
        id: this.data.news_id,
      },
      success: res => {
        this.handleNewsDeatil(res);
      },
    });
  },

  handleNewsDeatil(res) {
    //console.log(res.data.result);
    let result = res.data.result;
    //重新定义时间的显示格式，并对新闻来源进行判空，对空值情况进行空值处理
    let date = "";
    if (result.date !== '') {
      let temp = result.date.split("T");
      date = temp[0] + "  " + temp[1].split(".")[0];
    } else {
      date = "未知时间";
    }
    
    //对新闻来源进行判空，并对空值情况进行空值处理
    let source = result.source;
    if (source === "") {
      source = "未知来源";
    }
    //对新闻阅读数量进行判空，并对空值情况进行空值处理
    let readCount = result.readCount;
    if(readCount === "") {
      readCount = "暂无人阅读";
    }
    let news_contents = [];
    for (let i = 0; i < result.content.length; i++) {
      news_contents[i] = result.content[i];
    }
    this.setData({
      news_source: source,
      news_title: result.title,
      news_readCount: readCount,
      news_date: date,
      news_contents: news_contents,
    });
  }
})