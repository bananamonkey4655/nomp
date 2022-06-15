import UserHeader from './UserHeader';
import GuestHeader from './UserHeader';
import './header.css';

function Header(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <GuestHeader />;
    }
    return <UserHeader />;
}

export default Header;