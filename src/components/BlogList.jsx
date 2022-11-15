import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from './Pagination';
import { bool } from 'prop-types';

const BlogList = ({ isAdmin }) => {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const params = new URLSearchParams(location.search)
  const pageParam = params.get('page')
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const limit = 5;

  useEffect(() => {
    setNumberOfPages(Math.ceil(setNumberOfPosts/limit));
  }, [numberOfPosts]);

  const onClickPageButton = (page) => {
    navigate(`${location.pathname}?page=${page}`)
    getPosts(page)
  }
  const getPosts = (page = 1) => {
    let params = {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
      }
  
  useEffect(() => {
    setCurrentPage(parseInt(pageParam) || 1);
    getPosts(parseInt(pageParam) || 1)
  }, [pageParam])


    if (!isAdmin) {
      params = {... params, publish : true}
    }
    axios.get(`http://localhost:4000/posts`, {
      params
    }).then((res) => {
      setNumberOfPosts(res.headers['x-total-count'])
      setPosts(res.data);
      setLoading(false);
    })
  }

  const deleteBlog = (e, id)=> {
    e.stopPropagation();

    axios.delete(`http://localhost:4000/posts/${id}`).then(() => {
      setPosts(prevPosts => prevPosts.filter(post =>  post.id !== id))
    });
  }

  if (loading ) {
      return (
        <LoadingSpinner />
      );
    }

    if (posts.length === 0) { 
      return (<div>No blog posts found</div>)
    }

<div>
  BlogList
  Pagination
</div>
  const renderBlogList = () => {
    return posts.map(post => {
      return ( 
          <Card key={post.id}
                title={post.title}
                onClick={() => navigate(`blogs/${post.id}`)}
          >
            {isAdmin ? (<div>
              <button 
              className='btn btn-danger btn-sm'
              onClick={(e) => deleteBlog(e, post.id)}>
                Delete
              </button>
            </div>) : null}
          </Card>
    );
  })
  }
    return (
      <div>
        {renderBlogList()}
        {numberOfPages > 1 && <Pagination
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          onClick={onClickPageButton}
        />}
      </div>
    )
}

BlogList.prototype = {
  isAdmin : bool
}

BlogList.defaultProps = {
  isAdmin : false 
}
export default BlogList