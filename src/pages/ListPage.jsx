import axios from 'axios'
import { useState, useEffect } from 'react'
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ListPage = () => {
  const navigate = useNavigate(); 

  const goToEdit = () => {
    navigate("/blogs/edit");
  };

  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get('http://localhost:4000/posts').then((response) => {
      setPosts(response.data)
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
          <div>
            <Link to='/blogs/create' className='btn btn-success'>
              Create New
            </Link>
          </div>
        </div>
        
          {posts.map(post => {
            return ( 
                <Card key={post.id} title={post.title} onClick={goToEdit}>
                  <div>
                    <button 
                    className='btn btn-danger btn-sm'
                    onClick={(e) => deleteBlog(e, post.id)}>
                      Delete
                    </button>
                  </div>
                </Card>
            );
          })}   
        
      </div>
  )
}

export default ListPage