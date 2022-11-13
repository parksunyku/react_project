import React from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './PageRoute';



function App() {

  return (
    <React.Fragment>
      <NavBar />
      <div className='container'>
        <Routes> 
          {routes.map((route) => {
            return <Route key={route.path} path={route.path} element={route.component()} />
          })}
        </Routes>  
      </div>
    </React.Fragment>
    )
}

export default App;