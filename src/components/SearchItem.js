import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header2 from '../components/Header2';
import '../styles/SearchItem.css'; // Adjust the path as necessary

const SearchItem = ({ uname, email }) => {
  const location = useLocation();
  uname = location.state?.uname || '';
  email = location.state?.email || '';
  const [searchText, setSearchText] = useState(''); // Changed from searchId to searchText for name-based search
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://invcare-1.onrender.com/getdb', {
        params: {
          email: email, // Pass user ID to fetch their specific MongoDB instance
          item: searchText, // Pass search text for the item name
        },
      });

      if (response.data.items.length > 0) {
        setSearchResults(response.data.items);
        setErrorMessage('');
      } else {
        setSearchResults([]);
        setErrorMessage('No items found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage('Error fetching data');
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
              placeholder="Enter Item Name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="input-submit" onClick={handleSearch}>
              Search
            </button>
            {errorMessage && <p className="no-result">{errorMessage}</p>}
            {searchResults.length > 0 && (
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
                    {searchResults.map(item => (
                      <tr key={item._id}>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>${item.price}</td>
                        <td>{item.availableCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
