/*
 * @Author: 伍习文
 * @Date: 2020-06-03 10:08:11
 * @Description: 接口api
 */

import request from '@/utils/request'
import { phpSign } from '@/utils/tools';

// 拉新排行榜列表
export function rankLink (data) {
  return request({
    url: '/rank/invite/index',
    method: 'get',
    params: phpSign(data)
  })
}

