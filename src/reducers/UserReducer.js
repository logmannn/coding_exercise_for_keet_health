const initializeState = function() {
  return {
    details: {},
    searching: false,
    repos: {}
  };
};

const UserReducer = (state = initializeState(), action) => {
  switch (action.type) {
    case "CONTACT_SEARCHING": {
      return {
        ...state,
        searching: true
      };
    }
    case "GET_CONTACTS": {
      return {
        ...state,
        details: action.payload,
        repos: action.repos,
        searching: false
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
