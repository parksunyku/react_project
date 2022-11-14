import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';

const BlogList = () => {
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

  if (loading ) {
      return (
        <LoadingSpinner />
      );
    }

    if (posts.length === 0) { 
      return (<div>No blog posts found</div>)
    }

    return posts.filter(post => {
      return post.publish
    }).map(post => {
      return ( 
          <Card key={post.id}
                title={post.title}
                onClick={() => navigate(`blogs/${post.id}`)}
          >
            <div>
              <button 
              className='btn btn-danger btn-sm'
              onClick={(e) => deleteBlog(e, post.id)}>
                Delete
              </button>
            </div>
          </Card>
      );
    })
}

export default BlogList