import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = ({editing}) => {
  const navigate = useNavigate();
  const {id} = useParams();

  const [title, setTitle] = useState('')
  const [originalTitle, setOriginalTitle] = useState('')
  const [body, setBody] = useState('')
  const [originalBody, setOriginalBody] = useState('')

  useEffect(() => {
    if(editing) {
      axios.get(`ht tp://localhost:4000/posts/${id}`).then(response => {
        setTitle(response.data.title)
        setBody(response.data.body)
        setOriginalTitle(response.data.title)
        setOriginalBody(response.data.body)
      })    
    }
  }, [id, editing]);

  const isEdited = () => {
    return title !== originalTitle || body !== originalBody;
  }

  const goBack = () => {
    if(editing) {
      navigate(`/blogs/${id}`);
    } else {
      navigate('/blogs')
    }
  }

  const onSubmit = () => {
    if(editing) {
      axios.patch(`http://localhost:4000/posts/${id}`, {
        title,
        body,
      }).then(response => {
        console.log(response) 
        navigate(`/blogs/{id}`)
      })
    } else {
      axios.post('http://localhost:4000/posts', {
        title,
        body,
        createdAt : Date.now()
      }).then(() => {
        navigate('/blogs')
      })
    }
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
        disabled={editing && !isEdited()}
        >
        {editing ? 'Edit' : 'Post'}
      </button>
      <button 
        className='btn btn-danger ms-2'
        onClick={goBack}
        >
        Cancel
      </button>
      </div> 
  )
}

BlogForm.prototype = {
  editing : Boolean
}

BlogForm.defaultProps = {
  editing : false
}

export default BlogForm