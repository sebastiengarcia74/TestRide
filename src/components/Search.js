import React, { useState } from 'react';

const Search = ({ handleSearch }) => { //reçoit la fonction recherche en props
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <div className="form-control w-full max-w-xs flex">
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
          className="input input-bordered flex-grow mr-2"
        />
        <button type="submit" className="btn">Search</button>
      </form>
    </div>
  );
  
};

export default Search;
