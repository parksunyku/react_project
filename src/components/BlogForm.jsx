import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = ({editing}) => {
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:4000/posts/${id}`).then(response => {
      setTitle(response.data.title)
      setBody(response.data.body)
    })    
  }, [id])

  const onSubmit = () => {
      axios.post('http://localhost:4000/posts', {
        title,
        body,
        createdAt : Date.now()
      }).then(() => {
        navigate('/blogs')
      })
    }

  return (
    <div>
      <h1>{editing ? 'Edit' : 'Create'} a blog post</h1>
      <div className='mb-3'>
        <label className='form-label'>Title</label>
        <input 
        className='form-control'
        value={title}
        onChange={(event) =>{setTitle(event.target.value);
        }} /> 
      </div>
      <div className='mb-3'>
        <label className='form-label'>Body</label>
        <textarea 
        className='form-control'
        value={body}
        onChange={(event) =>{setBody(event.target.value);
        }}
        rows='10' /> 
      </div>
      <button 
        className='btn btn-primary'
        onClick={onSubmit}
        >
          {editing ? 'Edit' : 'Post'}
        </button>
      </div> 
  )
} 

BlogForm.prototype = {
  editing : bool
}

BlogForm.defaultProps = {
  editing : false
}

export default BlogForm