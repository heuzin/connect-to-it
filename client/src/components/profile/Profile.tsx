import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RootState } from '../../redux/reducers';
import { getProfileById } from '../../redux/reducers/profile/profileActions';
import Spinner from '../layout/Spinner';
import ProfileAbout from './ProfileAbout';
import ProfileEducation from './ProfileEducation';
import ProfileExperience from './ProfileExperience';
import ProfileGithub from './ProfileGithub';
import ProfileTop from './ProfileTop';

const Profile = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const { profile, loading } = useSelector((state: RootState) => state.profile);
    const auth = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (params.id) dispatch(getProfileById(params.id));
    }, [dispatch, params]);
    return (
        <section className="container">
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">
                        Back To Profiles
                    </Link>
                    {auth.isAuthenticated && !auth.loading && auth.user?._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-dark">
                            Edit Profile
                        </Link>
                    )}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map(exp => (
                                        <ProfileExperience key={exp._id} experience={exp} />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map(edu => (
                                        <ProfileEducation key={edu._id} education={edu} />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>

                        {profile.githubusername && <ProfileGithub username={profile.githubusername} />}
                    </div>
                </Fragment>
            )}
        </section>
    );
};

export default Profile;
