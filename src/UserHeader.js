import defaultProfilePicture from './defaultProfilePicture.png';

function UserHeader(props) {
    return (
        <header>
            <div>
                <button>Login</button>
                <img src={defaultProfilePicture} alt="Profile Picture" />
            </div>
        </header>
    );
}

export default UserHeader;