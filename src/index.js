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


// function App() {
const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="App"> <SearchPage /></div>,
  },
  {
    path: "song",
    element: <div className="App"> <SongPage /></div>,
    // loader: teamLoader,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
