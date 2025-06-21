import logo from './logo.svg';
import './App.css';
import Newproduct from './react hooks/newproduct';
import Productlist from './react hooks/productlist';
import Mydashboard from './react hooks/dashboard';
import Orderlist from './react hooks/orderlist';
import { HashRouter, Routes ,Route ,Link} from 'react-router-dom';

function AdminHome() {
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
                <li className="nav-item me-4">
                    <Link className="nav-link active" to="/">  <i class="fa-solid fa-gears"> </i> Dashboard </Link>
                </li>
                <li className="nav-item me-3">
                    <Link className="nav-link active" to="/productlist"> <i className="fa fa-tools"> </i> inventory</Link>
                </li>
                <li className="nav-item me-3">
                    <Link className="nav-link active" to="/newproduct"> <i className="fa fa-plus"> </i> New Inventory </Link>
                </li>
                <li className="nav-item me-3">
                    <Link className="nav-link active" to="/manageorder"> <i className="fa fa-headset"> </i> Manage Order </Link>
                </li>
               
                </ul>
                
            </div>
                <label class="text-warning"> Welcome, {localStorage.getItem("name")}, <Link class="text-warning" onClick={logout}> Logout </Link></label>
            </div>
        </nav>

        <Routes>
            <Route exact path="/" element={<Mydashboard/> }/> 
            <Route exact path="/newproduct" element={<Newproduct/> }/> 
            <Route exact path="/productlist" element={<Productlist/> }/> 
            <Route exact path="/manageorder" element={<Orderlist/> }/> 
        </Routes>

    </HashRouter>
  );
}

export default AdminHome;

const logout = () => {

   localStorage.clear(); //clear local storage
   window.location.reload();
}