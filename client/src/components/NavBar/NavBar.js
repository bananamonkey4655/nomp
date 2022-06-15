import User from './User';
import Guest from './Guest';
import './navbar.css';

function NavBar(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <Guest />;
    }
    return <User />;
}

export default NavBar;