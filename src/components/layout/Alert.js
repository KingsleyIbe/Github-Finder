import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
    const alertContent = useContext(AlertContext);

    const { alert } = alertContent;
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"/>{alert.msg}
            
            </div>
        )
       
    );
};
 export default Alert;