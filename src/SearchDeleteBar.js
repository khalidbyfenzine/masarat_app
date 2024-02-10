import React, { useState } from 'react';

const SearchDeleteBar = ({ handleSearch, handleDelete }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchClick = () => {
    handleSearch(searchKeyword);
  };

  return (
    <div>
      <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchDeleteBar;
