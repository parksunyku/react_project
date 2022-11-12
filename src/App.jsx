import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import routes from './routes';



function App() {

  return (
    <Router>
      <NavBar />
      <div className='container'>
        <Routes>
          {routes.map((route) => {
            return <Route key={route.id} path={route.path} element={route.component()} />
          })}
        </Routes>  
      </div>
    </Router>
    )
}

export default App;