import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Home</Link>
            <div className="navbar-nav">
              <Link className="nav-link active" aria-current="page" to="/blogs">Blogs</Link>
            </div>
        </div>
      </nav>
  )
}

export default NavBar