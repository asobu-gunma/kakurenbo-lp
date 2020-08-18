export const state = () => ({
  isFixed: false,
})

export const mutations = {
  fix(state, isFixed) {
    state.isFixed = isFixed
  },
}