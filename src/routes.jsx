import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import ListPage from './pages/ListPage';

const routes = [
  {
    id : 1,
    path : '/',
    component : HomePage
  },
  {
    id : 2,
    path : '/blogs',
    component : ListPage
  },
  {
    id : 3,
    path : '/blogs/create',
    component : CreatePage
  },
  {
    id : 4,
    path : '/blogs/edit',
    component : EditPage
  },
]

export default routes;