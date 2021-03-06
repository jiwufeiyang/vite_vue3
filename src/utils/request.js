/*
 * @Author: 伍习文
 * @Date: 2021-12-28 09:56:16
 * @Description: 网络请求封装
 */
/* eslint-disable */
import axios from 'axios';
import { Toast } from 'vant';
import { isPhpenv } from '../utils/tools';
// import { getToken } from '@/utils/auth'

// create an axios instance

const service = axios.create({
  baseURL: isPhpenv(this), // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 0 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
      // do something before request is sent
      config.headers['Content-Type'] = 'application/json'
      // if (store.getters.token) {
      //   // let each request carry token
      //   // ['X-Token'] is a custom headers key
      //   // please modify it according to the actual situation
      //   // config.headers['X-Token'] = getToken()
      // }
      return config
    },
    error => {
      // do something with request error
      console.log(error) // for debug
      return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {

      const res = response.data
      // if the custom code is not 20000, it is judged as an error.
      if (res && +res.code == 1) {
        return res.data
      }else if(res && +res.status == 200) {
          return res.data
      } else if(res.code == 11) {
        // 未授权
        Toast(res.message)
        jupmTaobao(isIos()?'https://s.click.taobao.com':'')
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        Toast('小伙伴们太热情啦，请稍候重试')
        return Promise.reject(new Error(res.message || 'Error'))
      }
    },
    error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
    }
)

export default service
