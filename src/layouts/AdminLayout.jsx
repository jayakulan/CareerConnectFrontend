import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Admin Panel</h1>
        </div>
        <nav className="mt-4">
          <a href="/admin/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</a>
          <a href="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Users</a>
          <a href="/admin/companies" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Companies</a>
          <a href="/admin/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Job Listings</a>
          <a href="/admin/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-medium text-gray-800">Admin Dashboard</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <span className="sr-only">Notifications</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    AU
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;