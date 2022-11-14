import React from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
const ShowPage = () => {
  const {id} = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const getPost = (id) => {
    axios.get(`http://localhost:4000/posts/${id}`).then((response) => {
      setPost(response.data)
      setLoading(false);  
  })
  };

  useEffect(() => {
    getPost(id)
  }, [id])

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString 
  }

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <small className='text-muted'>
        Created At : {printDate(post.createdAt)}
      </small>
      <hr />
      <p>{post.body}</p>   
    </div>
  )
};
 
export default ShowPage;