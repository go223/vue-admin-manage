import request from '@/utils/httpRequest'

export function getMenu () {
    return request({
        url:'/sys/menu/nav',
        method:'get'
    })
}