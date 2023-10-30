import { message } from 'antd'
import axios from 'axios'

/**
 * @description 配置 axios 基本功能
 */
const instance = axios.create({
  timeout: 10 * 1000,
})

// response 拦截：统一处理 errno 和 msg
instance.interceptors.response.use(
  res => {
    const resData = (res.data || {}) as ResType
    const { errno, data, msg } = resData

    if (errno !== 0) {
      if (msg) {
        message.error(msg)
      }
      // 后端错误代码直接返回空对象
      return {}
    }

    // 这里需要是 any 类型
    return data as any
  },
  err => {
    // 主动处理请求状态码，防止 UI 交互卡死
    const status = err.response.status
    switch (status) {
      case 404:
        message.error('请求的服务器资源不存在')
        break
      case 403:
        message.error('权限不足，请联系管理员')
        break
      default:
        message.error(`服务器故障请联系开发[${status}]`)
        break
    }
    return {}
  }
)

const ajax = instance

export default ajax

export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}

export type ResDataType = {
  [key: string]: any
}