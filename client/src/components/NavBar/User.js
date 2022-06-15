import defaultProfilePicture from '../../assets/defaultProfilePicture.png';

function User(props) {
    return (
        <header className='nav-bar'>
                <button className='login'>Login</button>
                <img className='img' src={defaultProfilePicture} alt="Profile Picture" />
        </header>
    );
}

export default User;