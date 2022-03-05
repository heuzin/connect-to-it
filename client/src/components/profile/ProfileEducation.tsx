import React from 'react';
import Moment from 'react-moment';
import { IProfileEducation } from '../../models/Profile';

type Props = {
    education: IProfileEducation;
};

const ProfileEducation: React.FC<Props> = ({ education: { school, degree, fieldofstudy, to, from, description } }) => (
    <div>
        <h3 className="text-dark">{school}</h3>
        <p>
            <Moment format="YYYY/MM/DD">{from}</Moment> - {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
        </p>
        <p>
            <strong>Degree: </strong> {degree}
        </p>
        <p>
            <strong>Field of Study: </strong> {fieldofstudy}
        </p>
        <p>
            <strong>Description: </strong> {description}
        </p>
    </div>
);

export default ProfileEducation;
