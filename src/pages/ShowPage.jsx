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
    getPost()
  }, [])

  if (loading) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>   
    </div>
  )
};

export default ShowPage;