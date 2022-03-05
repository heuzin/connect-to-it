import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { logout } from '../../redux/reducers/auth/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.auth);

    const { isAuthenticated, loading } = auth;

    const authLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/posts">Posts</Link>
            </li>
            <li>
                <Link to="/dashboard">
                    <i className="fas fa-user"></i> <span className="hide-sm">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={() => dispatch(logout())} to="#">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/profiles">Developers</Link>
            </li>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <i className="fas fa-code"></i> ConnectToIt
                </Link>
            </h1>
            {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </nav>
    );
};

export default Navbar;
