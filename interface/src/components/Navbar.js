import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // const API_img = 'http://localhost:3000/uploads/';
  const [loginStatus, setLoginStatus] = useState(false);
  const loginCbHanddler = (result) => {
    setLoginStatus(result);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
      navigate('/');
    }
  }, [loginStatus]);
  // const { loginStatus, loginCbHanddler } = props;
  const logoutHandler = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // di routenya /delete from "get" to "delete" karena udh pake axios
        if (loginStatus) {
          localStorage.clear();
        }
        loginCbHanddler(!loginStatus);
        Swal.fire('Logout', '', 'success');
        window.location.reload();
      }
    });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={'/home'}>
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/brand">
                  Brand
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/item">
                  Item
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/warna">
                  Warna
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  User
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className={'nav-link'}
                  href="#"
                  onClick={() => logoutHandler()}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
