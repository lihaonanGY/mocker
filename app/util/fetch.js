import axios from 'axios'
import lsData from './local-data'

const saveToken = lsData.get('token')
// if (!saveToken) {
//   saveToken = getQueryString('token')
// }
const authkey = 'Bearer ' + saveToken

// function getQueryString(name) {
//   const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
//   const r = window.location.search.substr(1).match(reg)
//   if (r != null) {
//     return unescape(r[2])
//   }
//   return null
// }

function injectToken(config, token) {
  if (!config) throw new Error('$fetch injectToken miss config')
  if (!token) throw new Error('$fetch injectToken miss token')

  config.headers = Object.assign({}, config.headers, {
    Authorization: token
  })
  return config
}

export default {
  install(Vue) {
    Vue.prototype.$fetch = function(url, config) {
      if (!url) throw new Error('$fetch miss miss first params')
      if (!url && !config) throw new Error('$fetch miss url & config')
      if (url && config) {
        config.url = url
      } else {
        if (typeof url === 'string') {
          config = {
            url
          }
        } else {
          config = url
        }
      }

      config = injectToken(config, authkey)

      return new Promise((resolve, reject) => {
        axios.request(config)
          .then((res) => {
            resolve(res)
          })
          .catch(err => {
            if (err.response.status === 500) {
              this.$notify({
                message: '服务器错误',
                type: 'warning'
              })
            } else if (err.response.status === 400 && err.response.data.message) {
              this.$notify({
                message: err.response.data.message,
                type: 'warning'
              })
            }
            reject(err)
          })
      })
    }
  }
}
