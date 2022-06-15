import defaultProfilePicture from './defaultProfilePicture.png';
import './header.css';

function UserHeader(props) {
    return (
        <header className='nav-bar'>
                <button className='login'>Login</button>
                <img className='img' src={defaultProfilePicture} alt="Profile Picture" />
        </header>
    );
}

export default UserHeader;