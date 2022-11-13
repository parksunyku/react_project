import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

const ShowPage = () => {
  const { blogId } = useParams();
  console.log(blogId);

  const getPost = (blogId) => {
    axios.get(`http://localhost:4000/posts/${blogId}`).then((response) => {
      console.log(response)
    })
  };

  useEffect(() => {
    getPost()
  }, [])

  return <div>Show Page</div>;
};

export default ShowPage;