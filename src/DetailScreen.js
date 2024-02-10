// DetailScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Logger from './Logger';

const DetailScreen = () => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    Logger.log('Viewing an item\'s details');
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://jsonplaceholder.typicode.com/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://jsonplaceholder.typicode.com/posts/${id}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id]);

  return (
    <div className="container mt-4">
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <div className="mt-4">
        <h2>Comments</h2>
        {comments.map(comment => (
          <div key={comment.id} className="card mb-2">
            <div className="card-body">
              <h5 className="card-title">{comment.name}</h5>
              <p className="card-text">{comment.body}</p>
              <p className="card-subtitle text-muted">Email: {comment.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailScreen;
