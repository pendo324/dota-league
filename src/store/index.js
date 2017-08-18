import Vue from 'vue';
import Vuex from 'vuex';
import { state, mutations } from './mutations';
import plugins from './plugins';
import * as actions from './actions';
import lobby from './modules/lobby';

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  actions,
  mutations,
  plugins,
  getters: {
    user: store => store.user
  },
  modules: {
    lobby
  }
});
