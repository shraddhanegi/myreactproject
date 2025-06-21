import logo from './logo.svg';
import './App.css';
import MyHome from './react hooks/Home';
import MyLogin from './react hooks/login';
import MyCart from './react hooks/cart';
import { HashRouter, Routes ,Route ,Link} from 'react-router-dom';

function App() {
  return (
    <HashRouter>
        <nav className="navbar navbar-expand-md navbar-dark sticky-top bg-dark">
            <div className="container">
            <a className="navbar-brand" href="#"> <i className="fa fa-search fa-lg"> </i> E-Commerce CRM </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse center" id="navbarCollapse">
                <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item me-3">
                    <Link className="nav-link active" to="/"> <i className="fa fa-home"> </i> Home </Link>
                </li>
                <li className="nav-item me-3">
                    <Link className="nav-link active" to="/login"> <i className="fa fa-lock"> </i> Login </Link>
                </li>
                <li className="nav-item me-3">
                    <Link className="nav-link active" to="/cart"> <i class="fa-solid fa-cart-shopping"></i> My Cart </Link>
                </li>
                </ul>
                
            </div>
            </div>
        </nav>

        <Routes>
            <Route exact path="/" element={<MyHome/> }/> 
            <Route exact path="/login" element={<MyLogin/> }/> 
            <Route exact path="/cart" element={<MyCart/> }/>
        </Routes>

    </HashRouter>
  );
}

export default App;
