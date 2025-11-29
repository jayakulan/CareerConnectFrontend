import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'seeker', status: 'Active', joinDate: '2023-11-01' },
    { id: 2, name: 'TechCorp Inc.', email: 'contact@techcorp.com', role: 'company', status: 'Active', joinDate: '2023-10-15' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'seeker', status: 'Inactive', joinDate: '2023-11-05' },
    { id: 4, name: 'Admin User', email: 'admin@careerconnect.com', role: 'admin', status: 'Active', joinDate: '2023-09-01' },
    { id: 5, name: 'StartupHub', email: 'hello@startuphub.io', role: 'company', status: 'Pending', joinDate: '2023-11-20' },
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

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
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">
                      {user.name.charAt(0)}
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
                  <span className={`status-badge status-${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </td>
                <td>{user.joinDate}</td>
                <td>
                  <div className="action-menu">
                    <button className="btn-icon btn-edit" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => handleDelete(user.id)}
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
