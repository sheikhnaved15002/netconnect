import { useState } from "react";

import "./App.css";
// import { Button } from "./components/ui/button";
import Signup from "./component/Signup";

import Login from "./component/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Home from "./component/Home";

function App() {
  // const [count, setCount] = useState(0);
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/signup", element: <Signup /> },
  ]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
