import request from '@/utils/httpRequest'

export function login(userInfo) {
    return request({
        url:'/sys/login',
        method:'post',
        data:userInfo
    })
}

export function logout() {
    return request({
        url:'/sys/logout',
        method:'post'
    })
}