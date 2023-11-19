import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SearchPage from './pages/SearchPage'
import SongPage from './pages/SongPage'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import DataPage from './pages/DataPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="App"> <SearchPage /></div>,
  },
  {
    path: "song",
    element: <div className="App"> <SongPage /></div>,
  },
  {
    path: "suggest",
    element: <div className="App"> <DataPage /></div>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
