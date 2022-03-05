import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../../models/Profile';

type Props = {
    profile: Profile;
};

const ProfileItem: React.FC<Props> = ({ profile }) => {
    const {
        user: { _id, name, avatar },
        status,
        company,
        location,
        skills,
    } = profile;
    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name}</h2>
                <h2>
                    {status} {company && <span> at {company}</span>}
                </h2>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>
            </div>
            <ul>
                {skills.slice(0, 4).map((skill, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i> {skill}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfileItem;
