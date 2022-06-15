import './logo.css';
import logo from '../../assets/Nomp_placeholder_icon.png';

function Logo(props) {
    return (
            <div className='logo fw-bold text-primary'>
            <img className='nomp-icon' src={logo} alt="Logo"/>
                Nomp
            </div>
    );
}

export default Logo;