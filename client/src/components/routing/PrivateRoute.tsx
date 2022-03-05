import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { Navigate } from 'react-router-dom';

type Props = {
    component: JSX.Element;
};

const PrivateRoute = ({ component: Component }: Props) => {
    const auth = useSelector((state: RootState) => state.auth);
    const { isAuthenticated, loading } = auth;

    if (!isAuthenticated && !loading) return <Navigate to="/login" />;
    return Component;
};

export default PrivateRoute;
