import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import TestingPage from './pages/TestingPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Route for the Login Page */}
      <Route index element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="*" element={<NotFoundPage/>}></Route>
      <Route path="test" element={<TestingPage/>}></Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
