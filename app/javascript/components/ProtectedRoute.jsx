import React from 'react'
import { Redirect, Route } from 'react-router'

const ProtectedRoute = ({
    component: Component,
    user,
    path,
    redirectRoute,
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                (user.admin_level > 0) ? <Redirect to="/admin" /> : <Redirect to="/unauthorized" />
            }
        />
    )
}

export default ProtectedRoute
