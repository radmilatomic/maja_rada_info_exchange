import { createStore } from "redux";
import rootReducer from "../reducers";

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  /*ovo iznad je dodato da bi radila ekstenzija za redux na chromu...*/
  );

export default store;
