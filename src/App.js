// App.js or App.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Import App-specific styles

function App() {
  const [activities, setActivities] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: ''
  });

  useEffect(() => {
    // Fetch activities from Ktor backend
    axios.get('http://localhost:8080/activities')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error fetching activities:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Post data to Ktor backend
    axios.post('http://localhost:8080/activities', formData)
      .then(response => {
        console.log('Activity posted successfully:', response.data);
        // Refresh the activities list after posting
        axios.get('http://localhost:8080/activities')
          .then(response => {
            setActivities(response.data);
          })
          .catch(error => {
            console.error('Error fetching activities:', error);
          });
      })
      .catch(error => {
        console.error('Error posting activity:', error);
      });
  };

  return (
    <div>
      <h1>Activities</h1>
      
      {/* Form to add a new activity */}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} />

        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />

        <label>Status:</label>
        <input type="text" name="status" value={formData.status} onChange={handleChange} />

        <button type="submit">Add Activity</button>
      </form>

      {/* Display activities in a table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity.id}>
              <td>{activity.id}</td>
              <td>{activity.title}</td>
              <td>{activity.description}</td>
              <td>{activity.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
