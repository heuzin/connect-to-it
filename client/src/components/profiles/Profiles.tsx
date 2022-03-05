import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { getProfiles } from '../../redux/reducers/profile/profileActions';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
    const dispatch = useDispatch();
    const { profiles, loading } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);

    return (
        <section className="container">
            <Fragment>
                {loading ? (
                    <Spinner />
                ) : (
                    <Fragment>
                        <h1 className="large text-primary">Developers</h1>
                        <p className="lead">
                            <i className="fab fa-connectdevelop"></i> Browse and connect with developeprs
                        </p>
                        <div className="profiles">
                            {profiles.length > 0 ? (
                                profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
                            ) : (
                                <h4>No Profiles found...</h4>
                            )}
                        </div>
                    </Fragment>
                )}
            </Fragment>
        </section>
    );
};

export default Profiles;
