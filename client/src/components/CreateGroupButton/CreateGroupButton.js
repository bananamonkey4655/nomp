import './creategroupbutton.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function CreateGroupButton(props) {
    const handleClick = () => {
        console.log('whatsup');
    }

    return (
        <div className='create-group-box shadow border-50 border-secondary d-flex flex-column text-center'>
            <h3 className="slogan fw-bold"> An efficient way to find where to eat with others </h3>
            {/* <button className="create-group">Create Group</button> */}
            <Link to="/creategroup">
                <Button onClick={handleClick} variant="primary" size="lg" className='fw-bold shadow'>
                    Create Group
                </Button>
            </Link>
        </div>
    );
}

export default CreateGroupButton;