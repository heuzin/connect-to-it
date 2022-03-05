import React, { Fragment } from 'react';
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../redux/reducers/profile/profileActions';
import { IProfileEducation } from '../../models/Profile';

type Props = {
    education: Partial<IProfileEducation[]>;
};

const Education: React.FC<Props> = ({ education }) => {
    const dispatch = useDispatch();

    const educations = education.map(edu => (
        <tr key={edu?._id}>
            <td>{edu?.school}</td>
            <td className="hide-sm">{edu?.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu?.from}</Moment> -{' '}
                {edu?.to === null ? ' Now' : <Moment format="YYYY/MM/DD">{edu?.to}</Moment>}
            </td>
            <td>
                <button onClick={() => dispatch(deleteEducation(edu!._id))} className="btn btn-danger">
                    Delete
                </button>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{educations}</tbody>
            </table>
        </Fragment>
    );
};

export default Education;
