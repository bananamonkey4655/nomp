import SearchBar from "./SearchBar";
import Logo from "./Logo";
import FindGroup from "./FindGroup";
import './main.css';

function Main(props) {
    return (
        <div className="below-nav-bar">
            <div className="top-half"> 
                <div id="logo"> <Logo /> </div>
                <FindGroup /> 
            </div>
            <div className="bottom-half"> 
                <SearchBar /> 
            </div>
        </div>  
    );

}

export default Main;