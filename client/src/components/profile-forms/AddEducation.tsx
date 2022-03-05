import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addEducation } from '../../redux/reducers/profile/profileActions';
import Alert from '../layout/Alert';
import { IProfileEducation } from '../../models/Profile';

const AddEducation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<IProfileEducation>>({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">Add Your Education</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp you have attended
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();

                    dispatch(addEducation(formData, navigate));
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Degree or Certificate"
                        name="degree"
                        value={degree}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field of Study"
                        value={fieldofstudy}
                        onChange={e => onChange(e)}
                        name="fieldofstudy"
                    />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" value={from} onChange={e => onChange(e)} name="from" />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            checked={current}
                            onChange={e => {
                                setFormData({ ...formData, current: !current });
                                setToDateDisabled(prevDate => !prevDate);
                            }}
                        />{' '}
                        Current Education
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols={30}
                        rows={5}
                        placeholder="Prgram Description"
                        value={description}
                        onChange={e => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">
                    Go Back
                </Link>
            </form>
        </section>
    );
};

export default AddEducation;
