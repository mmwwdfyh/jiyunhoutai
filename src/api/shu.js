import axios from "@/utils/request.js"

export default {
    yong() {
        return axios({
            url: "https://elm.cangdu.org/v1/users/list?offset=0&limit=20",

        })
    },
    shan() {
        return axios({
            url: "https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20"
        })
    },
    pin() {
        return axios({
            url: "https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined"
        })
    },
    // 页面数据
    solid() {
        return axios({
            url: "http://mengxuegu.com:7300/mock/5f50b5d58d90085e5b5840a4/jy/huiyuan",
            method: "post"
        })
    },
    // 分页
    fenye(page, size) {
        return axios({
            url: `/huiyuan/${page}/${size}`,
            method: "post"
        })
    },
    //获取列表数据
    getUserList(offset, limit) {
        return axios({
            url: "https://elm.cangdu.org/v1/users/list",
            method: "get",
            params: {
                offset,
                limit
            }
        })
    },
    //获取分页总条数
    getCount() {
        return axios({
            url: "https://elm.cangdu.org/v1/users/count",
            method: "get"
        })
    }
}