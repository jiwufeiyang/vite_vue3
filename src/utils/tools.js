/**
 * 获取地址栏参数
 * */
export function getUrlParam(name) {
  //构造一个含有目标参数的正则表达式对象
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //匹配目标参数
  const r = window.location.search.substr(1).match(reg);
  //返回参数值
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

//是否为极速版
var u = navigator.userAgent;

/**
 * 是IOS还是Android
 */
export function isIos() {
  if (u.indexOf("Android") > -1 || u.indexOf("Adr") > -1) {
    return false;
  } else {
    return true;
  }
}

/*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
export const setupWebViewJavascriptBridge = (callback) => {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
};
