const initialState = {
  admins:[],
  auth : false,
  places:[],
  showPlaceInput:false,
  showStoryInput:false,
  deleteStory:false,
  deletePlace:false,
  editStory:false,
  editPlace:false,
  currentPlace:{
    
  },
  placeToDelete:{

  },
  currentStory:{

  },
  storyToDelete:{

  },
  

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

    case "DELETE_STORY":
    return Object.assign({},state, {deleteStory:action.flag});

    case "DELETE_PLACE":
    return Object.assign({},state, {deletePlace:action.flag});

    case "EDIT_STORY":
    return Object.assign({},state, {editStory:action.flag});

    case "EDIT_PLACE":
    return Object.assign({},state, {editPlace:action.flag});

    case "CURRENT_PLACE":
    return Object.assign({},state, {currentPlace:action.currentPlace});

    case "CURRENT_STORY":
    return Object.assign({},state, {currentStory:action.currentStory});

    case "PLACE_TO_DELETE":
    return Object.assign({},state, {placeToDelete:action.place2Delete});

    case "STORY_TO_DELETE":
    return Object.assign({},state, {storyToDelete:action.story2Delete});
      
    default:
    return state;

}
};

export default rootReducer;