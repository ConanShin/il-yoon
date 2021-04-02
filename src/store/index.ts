import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {productToMenuName} from '@/components/common'
import {makeHash} from "@/components/common";
import {categories} from "@/cafe24info";

interface Review {
    article_no: number
    content: string
    images: string[]
    parent: number
    title: string
    writer: string
}

const api = axios.create({
    baseURL: process.env.VUE_APP_BACKEND
})
Vue.use(Vuex)

const account = process.env.VUE_APP_ACCOUNT
export default new Vuex.Store({
    state: {
        coverHidden: false,
        products: [],
        reviews: [],
        product: null,
        menuName: '연삭장비',
        pageLength: 0
    },
    mutations: {
        coverHidden: (state, payload) => state.coverHidden = payload,
        products: (state, payload) => state.products = payload,
        reviews: (state, payload) => state.reviews = payload,
        product: (state, payload) => state.product = payload,
        menuName: (state, payload) => state.menuName = payload,
        pageLength: (state, payload) => state.pageLength = payload
    },
    actions: {
        findArticles: async (injectee, {board, page}) => {
            return api.get(`cafe-twentyfour/article/listArticles?account=${account}&boardNo=${board}&pageNo=${page}&hash=${makeHash(5)}`)
            // return api.get(`cafe-twentyfour/article/list?domain=${domain}&boardNo=${board}&pageNo=${page}`)
        },
        checkPassword: (injectee, payload) => {
            return api.get(`cafe-twentyfour/article/check?account=${account}&articleNo=${payload.articleNo}&commentNo=${payload.commentNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        findArticle: (injectee, payload) => {
            return api.get(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&articleNo=${payload.articleNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        saveArticle: async (injectee, payload) => {
            return api.post(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&hash=${makeHash(5)}`, payload.article)
        },
        editArticle: async (injectee, payload) => {
            return api.put(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&hash=${makeHash(5)}`, payload.article)
        },
        deleteArticle: async (injectee, payload) => {
            return api.delete(`cafe-twentyfour/article?account=${account}&boardNo=${payload.boardNo}&articleNo=${payload.articleNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        saveComment: async (injectee, payload) => {
            return api.post(`cafe-twentyfour/article/comment?account=${account}&articleNo=${payload.articleNo}&hash=${makeHash(5)}`, payload.comment)
        },
        editComment: async(injectee, payload) => {
            return api.put(`cafe-twentyfour/article/comment?account=${account}&articleNo=${payload.articleNo}&hash=${makeHash(5)}`, payload.comment)
        },
        deleteComment: async (injectee, payload) => {
            return api.delete(`cafe-twentyfour/article/comment?account=${account}&articleNo=${payload.articleNo}&commentNo=${payload.commentNo}&password=${payload.password}&hash=${makeHash(5)}`)
        },
        findProductList: async (injectee, category: string) => {
            injectee.commit('products', [])
            const response = await api.get(`/cafe-twentyfour/product/list?account=${account}&category=${category}&hash=${makeHash(5)}`)
            injectee.commit('products', response.data.products)
        },
        findProduct: async (injectee, product_no) => {
            injectee.commit('product', null)
            const response = await api.get(`/cafe-twentyfour/product?account=${account}&productNo=${product_no}&hash=${makeHash(5)}`)

            const menuName = productToMenuName(response.data.product)
            injectee.commit('menuName', menuName || Object.keys(categories['menu2'])[0])
            injectee.commit('product', response.data.product)
        }
    },
    getters: {
        coverHidden: state => state.coverHidden,
        products: state => state.products,
        reviews: state => state.reviews,
        product: state => state.product,
        menuName: state => state.menuName,
        pageLength: state => state.pageLength
    },
    modules: {}
})
