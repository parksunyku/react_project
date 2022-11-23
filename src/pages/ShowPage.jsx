import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const ShowPage = () => {
  const { id } = useParams();
  console.log(id);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPost = (id) => {
    axios.get(`http://localhost:4000/posts/${id}`).then((res) => {
      console.log(res);
      setPost(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  const printDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className='d-flex'>
        <h1 className='flex-grow-1'>{post.title}</h1>
        <div>
          <Link className='btn btn-primary' to={`blogs/${id}/edit`}>
            Edit
          </Link>
        </div>
        <small className='text-muted'>
          Created At : {printDate(post.createdAt)}
        </small>
        <hr />
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default ShowPage;
