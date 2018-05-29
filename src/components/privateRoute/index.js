import React from "react";
import {Route, Redirect} from "react-router-dom";
import { connect } from "react-redux";




const mapStateToProps = state => {
  return { auth: state.auth };
};

const ConnectedPrivateRoute = ({ component: Component,auth, ...rest}) => (
  <Route {...rest} render={props =>auth? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname:"/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const PrivateRoute=connect(mapStateToProps)(ConnectedPrivateRoute)
export default PrivateRoute