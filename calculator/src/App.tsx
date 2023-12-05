import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Support } from './components/pages/Support';
import { Calculator } from './components/pages/Calculator';


const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path:'/',
      element:<Calculator />
    },
    {
      path:'/support',
      element:<Support />
    }
  ])

  return (
    <>
      <link href="/dist/output.css" rel="stylesheet"></link>
      <RouterProvider router={router} />
    </>
  );
}


export default App;

