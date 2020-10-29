import './Header.css';
import logo from './../../resources/logo.png'

function Header() {
  return (
    <header>
      <img id="logo" src={logo} className="refarmed-logo" alt="logo" />
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">History</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
