import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import items from './items'; // Adjust the path as necessary
import Header2 from '../components/Header2';
import '../styles/SearchItem.css'; // Adjust the path as necessary

const SearchItem = ({uname}) => {
  const location = useLocation();
  uname = location.state?.uname || {}
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
      <Header2 username={uname} />
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
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Available Count</th>
                  </tr>
                </thead>
                <tbody>
                  {itemList.map(item => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{item.availableCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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