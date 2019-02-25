const state = {
  step: 1,
  route: "/",
  lv: false,
  studentGrid: []
}

const getters = {};

const mutations = {
  addStep(state) {
    state.step += 1;
  },
  alteroute(state, payload) {
    state.route = payload.route;
  },
  trueLv(state) {
    state.lv = true;
  },
  falseLv(state) {
    state.lv = false;

  },
  addStudent(state, payload) {
    state.studentGrid.push({
      id: payload.id,
      img: payload.img
    })
  },
  deleteStudent(state, payload) {
    state.studentGrid.splice(state.studentGrid.findIndex((element) => (element.id == payload.id)), 1);
  }
}

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}