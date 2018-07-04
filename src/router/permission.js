import router from './index'
import store from '@/store'

console.log(store.state.common.isLogin)
router.beforeEach((to, from, next) => {
    
    if (!store.state.common.isLogin && to.name != 'Login') {
        next({ name: 'Login' })
    } else {
        next()
    }
})