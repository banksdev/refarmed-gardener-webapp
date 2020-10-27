import './Header.css';
import logo from './../../resources/logo.png'

function Header() {
  return (
    <div className="Header">
        <div className="navigation-container">
            <img src={logo} className="refarmed-logo" alt="logo" />
            <ul>
     
            </ul>
        </div>
    </div>
  );
}

export default Header;
