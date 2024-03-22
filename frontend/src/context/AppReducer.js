const userReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_USER":
      return {
        ...state,
        _id: null,
        name: null,
        isAdmin: false,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      
        
      };

    default:
      return state;
  }
};

export default userReducer;
