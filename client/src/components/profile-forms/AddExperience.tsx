import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addExperience } from '../../redux/reducers/profile/profileActions';
import Alert from '../layout/Alert';
import { IProfileExperience } from '../../models/Profile';

const AddExperience = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<Partial<IProfileExperience>>({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
    });

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const { company, title, location, from, to, current, description } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <section className="container">
            <Alert />
            <h1 className="large text-primary">Add An Experience</h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming positions that you have had in the
                past
            </p>
            <small>* = required field</small>
            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();

                    dispatch(addExperience(formData, navigate));
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={e => onChange(e)}
                        name="location"
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
                        Current Job
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
                        placeholder="Job Description"
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

export default AddExperience;
