export const strict = false;

export const state = () => ({
  user: { username: false }
});
export const getters = {};

export const mutations = {
  changeUser(state, user) {
    state.user = user;
  }
};

export const actions = {
  changeUser({ commit }, user) {
    commit("changeUser", user);
  }
};
