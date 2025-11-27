import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <Outlet />
    </div>
  );
}

export default MainLayout;
