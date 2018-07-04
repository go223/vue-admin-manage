import Cookies from 'js-cookie'
import {login, logout} from '@/api/login'

export default {
    namespaced: true,
    state: {
        username:'',
        token: Cookies.get('token')
    },
    mutations: {
        SET_TOKEN:(state,token) => {
            state.token = token
        },
        TEST:(state,msg) => {
            state.test = msg
        },
        UPDATE_USER:(state,name) => {
            state.username = name
        }
    },
    actions: {
        LOGIN({commit},userInfo) {
            return new Promise ((resolve,reject) => {
                login(userInfo).then(res => {
                    const data = res.data;
                    if (data.code == 0) {
                        commit('SET_TOKEN',data.token)
                        commit('UPDATE_USER', userInfo.username)
                        Cookies.set('token',data.token)
                        Cookies.set('username', userInfo.username)
                        resolve(data)
                    } else {
                        reject(data)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        },
        LOGINOUT({commit,state}) {
            return new Promise((resolve,reject) => {
                logout().then(res => {
                    const data = res.data;
                    if (data.code == 0) {
                        Cookies.remove('token')
                        Cookies.remove('username')
                        commit('SET_TOKEN','')
                        resolve(data)
                    } else {
                        reject(data)
                    }
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
