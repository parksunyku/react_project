import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import BlogList from '../components/BlogList';

const ListPage = () => {
  const navigate = useNavigate(); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)

  const getPosts = () => {
    axios.get('http://localhost:4000/posts').then((response) => {
      setPosts(response.data);
      setLoading(false);
    })
  }

  const deleteBlog = (e, id)=> {
    e.stopPropagation();
    axios.delete(`http://localhost:4000/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post =>  post.id !== id)
      )
    });
  }

  useEffect(() => {
    getPosts();
  }, []);

  

  return (
      <div> 
        <div className='d-flex justify-content-between'>
          <h1>Blogs</h1>
        </div>
        <BlogList />
      </div>
  )
}

export default ListPage