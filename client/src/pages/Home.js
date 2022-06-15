import SearchBar from "../components/SearchBar/SearchBar";
import Logo from "../components/Logo/Logo";
import CreateGroupButton from "../components/CreateGroupButton/CreateGroupButton";

function Home(props) {
    return (
        <div className="home d-flex flex-column">
            <div className="logo-creategroup position-relative d-flex justify-content-center"> 
                <div className="position-absolute top-0 start-0 mt-3 ms-3"> <Logo /> </div>
                <CreateGroupButton />
            </div>
            <div className="searchbar d-flex justify-content-center"> 
                <SearchBar /> 
            </div>
        </div>  
    );

}

export default Home;