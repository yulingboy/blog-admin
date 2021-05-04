import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getUserCookie, removeUserCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 侧边栏是否收起
    isCollapse: false,
    // 用户信息
    user: getUserCookie()
  },
  mutations: {
    // 获取用户信息
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
    // 退出登录
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        email: '',
        role: '',
        token: ''
      };
    }
  },
  actions: {
    // 获取用户信息
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo);
    },
    // 退出登录
    layout({ commit }) {
      commit('layout');
      removeUserCookie();
    }
  },
  modules: {}
});
