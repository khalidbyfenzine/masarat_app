// ListScreen.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchDeleteBar from './SearchDeleteBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logger from './Logger';

const ListScreen = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    Logger.log('Loading the photo list');
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    const filteredPosts = posts.filter(post => post.title.includes(keyword) || post.body.includes(keyword));
    setPosts(filteredPosts);
    setCurrentPage(1);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://jsonplaceholder.typicode.com/posts/${postId}`);
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
      Logger.log(`Deleted post with ID ${postId}`);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const navigateToPostDetails = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Post List</h1>
      <SearchDeleteBar handleSearch={handleSearch} handleDelete={handleDelete} />
      <div className="list-group mt-3">
        {currentPosts.map(post => (
          <div key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div onClick={() => navigateToPostDetails(post.id)}>
              <h5 className="mb-1">User ID: {post.userId} | Post ID: {post.id}</h5>
              <h6 className="mb-1">{post.title}</h6>
              <p className="mb-1">{post.body}</p>
            </div>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <nav className="mt-4" aria-label="Page navigation">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }).map((_, index) => (
            <li className="page-item" key={index}>
              <button className="page-link" onClick={() => paginate(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ListScreen;
