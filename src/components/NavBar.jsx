import {Link, NavLink} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
            <div className="navbar-nav">
              <NavLink activeclassname="active" className="nav-link" aria-current="page" to="/blogs">Blogs</NavLink>
            </div>
        </div>
      </nav> 
  )
}

export default NavBar