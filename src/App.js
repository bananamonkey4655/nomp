import logo from './logo.svg';
import './App.css';
import Main from './Main';
import Header from './Header';

function App() {
  return (
    <div>
      <Header isLoggedIn={false}/>
      <Main />
    </div>
  );
}

export default App;
