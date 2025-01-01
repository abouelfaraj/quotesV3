// ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './authContext';
import Header from '../containers/layout/header';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { currentUser } = useAuth();

    if (currentUser === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <Route
            {...rest}
            render={(props) =>
                currentUser ? (
                    <>
                        <Header />
                        <Component {...props} />
                    </>
                )
                    : <Redirect to="/auth" />
            }
        />
    );
};

export default ProtectedRoute;
