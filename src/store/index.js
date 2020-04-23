import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 收藏的商品的数量
        favoriteNum: 0
    },
    getters: {
        // 收藏的商品总数
        favoriteNum(state) {
            return state.favoriteNum
        }
    },
    mutations: {
        // 收藏的商品总数
        setFavoriteNum(state, params) {
            state.favoriteNum = params;
        }
    },

    actions: {
        // 得到收藏的商品数量
        // 需要传参数这样写   getFavoriteNum({ commit }, {vm, 参数名1, 参数名2, 参数名3...}) {}
        getFavoriteNum({commit}, {vm}) {
            vm.$resetAjax({
                type: 'GET',
                url: `/choose/goods/get_favorite_num`,
                success: (res) => {
                    let result = JSON.parse(res).data;
                    commit('setFavoriteNum', result ? Number(result) : 0);
                }
            })
        },
    }
});

export default store;