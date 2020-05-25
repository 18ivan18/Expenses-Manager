import React from 'react'
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux' 

const LoginPrivateRoute = ({ auth, children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.loggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(
mapStateToProps
)(LoginPrivateRoute);