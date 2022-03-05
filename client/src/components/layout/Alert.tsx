import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';

const Alert = () => {
    const alerts = useSelector((state: RootState) => state.alert);

    return (
        <>
            {alerts !== null &&
                alerts.length > 0 &&
                alerts.map(alert => (
                    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                        {alert.msg}
                    </div>
                ))}
        </>
    );
};

export default Alert;
