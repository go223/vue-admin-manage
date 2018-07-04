import Mock from 'mockjs'
import * as common from './modules/common'
import * as user from './modules/user'
import * as role from './modules/role'
import * as menu from './modules/menu'
import * as oss from './modules/oss'

CreateMock(common)
CreateMock(user)
CreateMock(role)
CreateMock(menu)
CreateMock(oss)
/**
 * 创建mock模拟数据
 */

 Mock.setup({
   timeout: '400-600'
 })
function CreateMock(mod) {
    for (var key in mod) {
      ((res) => {  
        Mock.mock(new RegExp(res.url), res.type, (opts) => {
        console.log(opts)
          return res.data
        })
      })(mod[key]() || {})
    }
}