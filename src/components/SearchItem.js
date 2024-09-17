import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import items from './items'; // Adjust the path as necessary
import Header from '../components/Header';
import '../styles/SearchItem.css'; // Adjust the path as necessary

const SearchItem = () => {
  const location = useLocation();
  const [searchId, setSearchId] = useState(location.state?.searchId || '');
  const [searchResult, setSearchResult] = useState(null);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    // Convert items object to an array for listing
    setItemList(Object.values(items));
  }, []);

  const handleSearch = () => {
    if (items[searchId]) {
      setSearchResult(items[searchId]);
    } else {
      setSearchResult(null);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <h2>Search Inventory</h2>
          <div className="search-container">
            <input
              type="text"
              className="input-field"
              placeholder="Enter Item ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
            <button className="input-submit" onClick={handleSearch}>
              Search
            </button>
            {searchResult ? (
              <div className="search-result">
                <h3>Item Details</h3>
                <p><strong>ID:</strong> {searchResult.id}</p>
                <p><strong>Name:</strong> {searchResult.name}</p>
                <p><strong>Price:</strong> ${searchResult.price}</p>
                <p><strong>Description:</strong> {searchResult.description}</p>
              </div>
            ) : searchId && (
              <p className="no-result">Item not found</p>
            )}
            <div className="item-list">
              <h3>Available Items</h3>
              <ul>
                {itemList.map(item => (
                  <li key={item.id}>
                    <p><strong>ID:</strong> {item.id}</p>
                    <p><strong>Name:</strong> {item.name}</p>
                    <p><strong>Price:</strong> ${item.price}</p>
                    <p><strong>Available Count:</strong> {item.availableCount}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2024 InvCare. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default SearchItem;
