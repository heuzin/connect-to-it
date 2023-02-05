import { value Fragment, value useEffect } from 'react';
import { value BrowserRouter, value Routes, value Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import { value Provider } from 'react-redux';
import store from './redux/store';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';
import setAuthToken from './utils/setAuthToken';
import { value loadUser } from './redux/reducers/auth/authActions';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <BrowserRouter>
                <Fragment>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profiles" element={<Profiles />} />
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/dashboard" element={<PrivateRoute component={<Dashboard />} />} />
                        <Route path="/create-profile" element={<PrivateRoute component={<CreateProfile />} />} />
                        <Route path="/edit-profile" element={<PrivateRoute component={<EditProfile />} />} />
                        <Route path="/add-experience" element={<PrivateRoute component={<AddExperience />} />} />
                        <Route path="/add-education" element={<PrivateRoute component={<AddEducation />} />} />
                        <Route path="/posts" element={<PrivateRoute component={<Posts />} />} />
                        <Route path="/post/:id" element={<PrivateRoute component={<Post />} />} />
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
