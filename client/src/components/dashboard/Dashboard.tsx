import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { deleteAccount, getCurrentProfile } from '../../redux/reducers/profile/profileActions';
import Alert from '../layout/Alert';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state: RootState) => state.auth);
    const { loading, profile } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    return (
        <section className="container">
            {loading && !profile ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Alert />
                    <h1 className="large text-primary">Dashboard</h1>
                    <p className="lead">
                        <i className="fas fa-user"> Welcome {user && user.name}</i>
                    </p>
                    {profile !== null ? (
                        <Fragment>
                            <DashboardActions />
                            <Experience experience={profile.experience} />
                            <Education education={profile.education} />

                            <div className="my-2">
                                <button className="btn btn-danger" onClick={() => dispatch(deleteAccount())}>
                                    <i className="fas fa-user-minus"></i> Delete My Account
                                </button>
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <p>You have not yet setup a profile, please add some info</p>
                            <Link to="/create-profile" className="btn btn-primary my-1">
                                Create Profile
                            </Link>
                        </Fragment>
                    )}
                </Fragment>
            )}
        </section>
    );
};

export default Dashboard;
