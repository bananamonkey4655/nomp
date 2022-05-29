import UserHeader from './UserHeader';
import GuestHeader from './UserHeader';

function Header(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <GuestHeader />;
    }
    return <UserHeader />;
}

export default Header;