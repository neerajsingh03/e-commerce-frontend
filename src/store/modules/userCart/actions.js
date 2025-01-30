const actions = {
    userCartItem({commit},userItemCount){
        commit('setUserCartItem',userItemCount);
    }
};
export default actions;