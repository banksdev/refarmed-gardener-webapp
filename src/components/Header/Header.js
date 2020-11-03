import './Header.css';
import logo from './../../resources/logo.png';
import { Link, withRouter } from 'react-router-dom';

function Header(props) {
  return (
    <header>
      <img id="logo" src={logo} className="refarmed-logo" alt="logo" />
      <nav>
        <ul>
          <li> <Link to='/' onClick={() => props.history.push('/')}>Home</Link></li>
          <li> <Link to='/history' onClick={() => props.history.push('/history')}>History</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default withRouter(Header);
