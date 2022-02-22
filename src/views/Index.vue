<!--
 * @Author: 伍习文
 * @Date: 2021-12-28 09:56:16
 * @Description: 页面开发
 -->
<template>
  <div class="app-container" v-wechat-title="($route.meta.title = title)">
    <header>
      <van-image
        class="top"
        :show-loading="false"
        :src="getImageUrl('header.png')"
      />
      <div class="swipeBox">
        <van-swipe
          :autoplay="3000"
          :lazy-render="true"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(itemList, key) in swipeList" :key="key">
            <template v-for="(item, index) in itemList" :key="index">
              <div class="item">
                <van-image
                  class="icon"
                  :show-loading="false"
                  :src="getImageUrl('icon/' + item.id + '.png')"
                />
                <div class="name">{{ item.name }}</div>
              </div>
            </template>
          </van-swipe-item>
        </van-swipe>
      </div>
    </header>
    <div class="content">
      <!-- 当前app下载显示灰色 -->
      <div v-if="isInstalledApp" class="downLink" @click="toDown('main')">
        {{ isInstalledApp ? "打开" : "下载" }}时光序
      </div>
      <div class="downbox" :class="isInstalledApp ? '' : 'top'">
        <div class="title">单个轻应用</div>
        <div class="downList">
          <div class="item" v-for="(item, index) in downloadList" :key="index">
            <div class="left">
              <van-image
                class="icon"
                :show-loading="false"
                :src="getImageUrl('icon/' + item.id + '.png')"
              />
              <div class="content">
                <div class="name">{{ item.name }}</div>
                <div class="desc">{{ item.desc }}</div>
              </div>
            </div>
            <!-- <div
              class="button"
              :class="apptype === item.apptype ? 'gray' : ''"
              @click="toDown(apptype === item.apptype ? 'disable' : item)"
            >
              {{ item.isIntall ? "打开" : "下载" }}
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  isIos,
  setupWebViewJavascriptBridge,
  getUrlParam,
} from "../utils/tools";
export default {
  name: "index",
  data() {
    return {
      title: "更多应用",
      apptype: "",
      isInstalledApp: false, // 是否安装时光序app
      appList: [
        {
          id: "shixiang",
          name: "事项",
        },
        {
          id: "mubiao",
          name: "时光flag",
        },
        {
          id: "jizhang",
          name: "时光记账",
        },
        {
          id: "beiwanglu",
          name: "备忘录",
        },
        {
          id: "xiguan",
          name: "习惯打卡",
        },
        {
          id: "jinianri",
          name: "倒数纪念日",
        },
        {
          id: "riji",
          name: "日记",
        },
        {
          id: "dushu",
          name: "读书",
        },
        {
          id: "huankuan",
          name: "还款提醒",
        },
        {
          id: "zhuanzhu",
          name: "专注",
        },
        {
          id: "heshui",
          name: "喝水",
        },
        {
          id: "jiankang",
          name: "健康作息",
        },
        {
          id: "kechengbiao",
          name: "课程表",
        },
        {
          id: "meirixianzhi",
          name: "每日先知",
        },
        {
          id: "naozhong",
          name: "闹钟",
        },
        {
          id: "yinshi",
          name: "饮食",
        },

        {
          id: "shangban",
          name: "上班表",
        },
        {
          id: "shengliqi",
          name: "生理期",
        },
      ],
      swipeList: [], // 轮播列表
      downloadList: [
        {
          id: "jizhang",
          apptype: "BILL",
          name: "时光记账",
          desc: "记录生活开支，养成记账好习惯",
          mark: "sgxaccountbook://",
          isIntall: false, // 是否下载
          url: "https://a.app.qq.com/o/simple.jsp?pkgname=com.duorong.smarttool.bill",
          androidScheme: "startapp://com.duorong.smarttool.bill/home",
        },
        {
          id: "jinianri",
          apptype: "IMPORTANT_DAY",
          name: "时光倒数",
          desc: "生日节日纪念日倒数日，重要日期都在这里",
          mark: "sgximportantday://",
          isIntall: false, // 是否下载
          url: "https://a.app.qq.com/o/simple.jsp?pkgname=com.duorong.smarttool.bill",
          androidScheme: "",
        },
        {
          id: "mubiao",
          apptype: "GOAL",
          name: "时光flag",
          desc: "制定长期目标，更快实现梦想",
          mark: "sgxtargetplan://",
          isIntall: false, // 是否下载
          url: "https://a.app.qq.com/o/simple.jsp?pkgname=com.duorong.smarttool.target",
          androidScheme: "startapp://com.duorong.smarttool.target/home",
        },
        {
          id: "xiguan",
          apptype: "HABIT",
          name: "时光打卡",
          desc: "冥想练字学技能，习惯十倍于自然",
          mark: "sgxhabitattendance://",
          isIntall: false, // 是否下载
          url: "",
          androidScheme: "",
        },
        
      ], //下载列表
    };
  },
  created() {
    // 获取当前类型
    this.apptype = getUrlParam("apptype");
    this.groupList();
    this.registerHandler();
  },

  methods: {
    /**
     * 客户端接受方法
     */
    getImageUrl(name) {
      return new URL(`../assets/${name}`, import.meta.url).href
    },
    /**
     * 客户端接受方法
     */
    registerHandler() {
      try {
        if (isIos()) {
          setupWebViewJavascriptBridge((bridge) => {
            // 判断是否有下载时光序
            bridge.callHandler("isInstalledApp", "shiguangxu://", (data) => {
              if (data) {
                this.isInstalledApp = true;
              }
            });
            this.downloadList = this.downloadList.map((item) => {
              // 判断是否下载独立app
              bridge.callHandler("isInstalledApp", item.mark, (data) => {
                if (data) {
                  item.isIntall = true;
                }
              });

              return item;
            });
          });
        } else {
          // 判断是否有下载时光序
          let data = window.sgxAndroid.isInstalledApp("shiguangxu://");
          if (data) {
            this.isInstalledApp = true;
          }
          this.downloadList = this.downloadList.map((item) => {
            // 判断是否下载独立app
            let data = window.sgxAndroid.isInstalledApp(item.mark);
            if (data) {
              item.isIntall = true;
            }

            return item;
          });
        }
      } catch (error) {
        console.log(error, 33);
      }
    },

    // 给list分组,每6个做为一组
    groupList() {
      const arr = [];
      for (var i = 0; i < this.appList.length; i += 6) {
        arr.push(this.appList.slice(i, i + 6));
      }
      this.swipeList = arr;
    },
    // 时光序下载链接
    toDown(item) {
      if (item === "disable") {
        return false;
      }
      if (item === "main") {
        // 下载时光序
        let cur_url = "https://a.app.qq.com/o/simple.jsp?pkgname=com.duorong.smarttool";
        if (this.isInstalledApp) {
          if (isIos()) {
            // 通过ios定义方法跳转
            setupWebViewJavascriptBridge((bridge) => {
              // 判断是否有下载时光序
              bridge.callHandler("webOpenInstalledApp", "shiguangxu://")
            });
          } else {
            window.location.href = "startapp://com.duorong.smarttool/home";
          }
        } else {
           window.location.href = cur_url;
        }
      } else { // 独立应用
        if (item.isIntall === false) {
          window.location.href = item.url;
        } else {
          if (isIos()) {
            // 通过ios定义方法跳转
             // 通过ios定义方法跳转
            setupWebViewJavascriptBridge((bridge) => {
              // 判断是否有下载时光序
              bridge.callHandler("webOpenInstalledApp", item.mark)
            });
          } else {
            window.location.href = item.androidScheme
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  width: 100%;
  min-height: 100%;
  .swipeBox {
    padding: 32px 0;
    width: 686px;
    height: 188px;
    margin: 0 auto;
    margin-top: -7px;
    box-sizing: border-box;
    overflow: hidden;
    background: #f5f5f5;
    border: 4px solid #d4ebfe;
    border-radius: 20px;
    .van-swipe-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .icon {
        width: 80px;
        height: 80px;
      }
      .name {
        margin-top: 16px;
        font-size: 20px;
        font-family: PingFangSCRegular;
        color: #232323;
      }
    }
  }
  .content {
    .downLink {
      margin: 40px auto;
      margin-bottom: 80px;
      width: 320px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      background: #2899fb;
      border-radius: 80px;
    }
    .downbox {
      &.top {
        margin-top: 80px;
      }
      padding-left: 32px;
      .title {
        margin: 27px 0;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3c3c3c;
      }
      .downList {
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 160px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
          .left {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            .icon {
              width: 80px;
              height: 80px;
            }
            .content {
              display: flex;
              align-items: flex-start;
              justify-content: center;
              flex-direction: column;
              margin-left: 16px;
              .name {
                line-height: 45px;
                font-size: 32px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #3c3c3c;
              }
              .desc {
                margin-top: 7px;
                font-size: 22px;
                font-family: PingFangSCRegular;
                color: rgba(60, 60, 60, 0.65);
                line-height: 30px;
              }
            }
          }
          .button {
            margin-right: 32px;
            width: 120px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            font-size: 28px;
            font-family: PingFangSCRegular;
            color: #ffffff;
            background: #2899fb;
            border-radius: 80px;
            &.gray {
              background: #eee;
            }
          }
        }
      }
    }
  }
}
</style>
