import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail, {
  action as detailAction,
  loader as detailLoader,
} from "./pages/detail/Detail";
import Login, { action as loginAction } from "./pages/login/Login";
import Search, { action as searchAction } from "./pages/search/Search";
import logout from "./util/logout";
import "./global.css";
import RootLayout, { loader as rootLoader } from "./Layout/RootLayout";
import { loader as homeLoader } from "./pages/home/Content/Content";
import Transaction, {
  loader as transactionLoader,
} from "./pages/transaction/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    id: "root",
    children: [
      {
        path: "",
        element: <Home />,
        loader: homeLoader,
        id: "home",
      },
      { path: "search", element: <Search />, action: searchAction },
      {
        path: "detail/:hotelId",
        element: <Detail />,
        loader: detailLoader,
        action: detailAction,
      },
      {
        path: "transaction",
        element: <Transaction />,
        loader: transactionLoader,
      },
      { path: "transaction" },
      { path: "login", element: <Login />, action: loginAction },
      { path: "logout", loader: logout },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
