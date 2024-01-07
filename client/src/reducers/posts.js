const reducer = (state, action) => {
    if(action.type==='CREATE'){
        return [...state, action.payload]
    }
    return state;
}

export default reducer;