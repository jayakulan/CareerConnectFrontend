import React, { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token;

      if (!token) {
        throw new Error('Not authorized');
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      // In a real app, you would call DELETE API here
      setUsers(users.filter(user => user._id !== id));
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="users-container">
      <div className="users-header">
        <h1 className="users-title">User Management</h1>
        <button className="btn-add">Add New User</button>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                      <h4 className="user-name">{user.name}</h4>
                      <p className="user-email">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-active`}>
                    Active
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-menu">
                    <button className="btn-icon btn-edit" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(user._id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
