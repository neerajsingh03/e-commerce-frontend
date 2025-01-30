const mutations = {
    setUserCartItem(state,cartItem){
        state.cartItem = cartItem,
        localStorage.setItem('cartItem', JSON.stringify(cartItem));
    }
}
export default mutations;