const initialState = {
  admins:[],
  auth : false,
  places:[],
  showPlaceInput:false,
  showStoryInput:false
  

}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_AUTH":
    return Object.assign({},state, {auth:action.flag});


    case "ADMINS":
    return Object.assign({},state, {admins:action.admins});

    case "PLACES":
    return Object.assign({},state, {places:action.places});

    case "STORIES":
    return Object.assign({},state, {stories:action.stories});

    case "PLACE_INPUT":
    return Object.assign({},state, {showPlaceInput:action.flag});

    case "STORY_INPUT":
    return Object.assign({},state, {showStoryInput:action.flag});
      
    default:
      return state;

}
};

export default rootReducer;