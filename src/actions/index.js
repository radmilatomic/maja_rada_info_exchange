export const isAuth=flag=>(
    {type:"IS_AUTH",
    flag:flag}
    )

export const setAdmins=admins=>(
    {type:"ADMINS",
    admins:admins}
    )

export const setPlaces=places=>(
    {type:"PLACES",
    places:places}
    )

export const setStories=stories=>(
    {type:"STORIES",
    stories:stories}
    )

export const setPlaceInput=flag=>(
    {type:"PLACE_INPUT",
    flag:flag}
    )

export const setStoryInput=flag=>(
    {type:"STORY_INPUT",
    flag:flag}
    )

export const renderDeleteStory=flag=>(
    {type:"DELETE_STORY",
    flag:flag}
    )

export const renderDeletePlace=flag=>(
    {type:"DELETE_PLACE",
    flag:flag}
    )

export const renderEditStory=flag=>(
    {type:"EDIT_STORY",
    flag:flag}
    )

export const renderEditPlace=flag=>(
    {type:"EDIT_PLACE",
    flag:flag}
    )

export const currentPlaceSet=place=>(
    {type:"CURRENT_PLACE",
    currentPlace:place}
    )
export const place2Delete=place=>(
    {type:"PLACE_TO_DELETE",
    place2Delete:place}
    )
