import './groupsettings.css';
import Button from 'react-bootstrap/Button';

const GroupSettings = () => {
    return ( 
    <div className="group-settings-box shadow d-flex flex-column txt-center">
        <h2 className="settings fw-light text-center fs-1 mt-3"> Settings </h2>
        <div className="people"> Number of people </div>
        <div className="location"> Location </div>
        <div className="filters"> Filters </div>
        <div className="get-link"> Get Link </div>
        <Button variant="primary" size="lg" className='fw-bold shadow'> Start Deciding </Button>
    </div>  
    );
}
 
export default GroupSettings;