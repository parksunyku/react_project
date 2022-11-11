import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';


function App() {
  

  return (
    <Router>
      <NavBar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/blogs' element={<ListPage />}></Route>
          <Route path='/blogs/create' element={<CreatePage />}></Route>
          <Route path='/blogs/edit' element={<EditPage />}></Route>

        </Routes>  
      </div>
    </Router>
    
    )
}

export default App;