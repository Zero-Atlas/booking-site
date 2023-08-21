import RootLayout, { loader as rootLoader } from "./Layout/RootLayout";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { action as loginAction } from "./pages/login/Login";
import logoutLoader from "./util/logout";
import DashboardLayout from "./Layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Hotel, { loader as hotelLoader } from "./pages/hotel/Hotel";
import HotelForm, {
  action as addHotelAction,
  loader as hotelFormLoader,
} from "./pages/hotel/HotelForm/HotelForm";
import Room, { loader as roomLoader } from "./pages/room/Room";
import RoomForm, {
  action as addRoomAction,
  loader as roomFormLoader,
} from "./pages/room/RoomForm/RoomForm";
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
      { index: true, element: <Login />, action: loginAction },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: hotelLoader,
        id: "dashboard",
        children: [
          { index: true, element: <Dashboard />, loader: transactionLoader },
          {
            path: "hotel",
            element: <Hotel />,
            loader: hotelLoader,
          },
          {
            path: "transaction",
            element: <Transaction />,
            loader: transactionLoader,
          },
          {
            path: "hotel/new",
            element: <HotelForm />,
            action: addHotelAction,
            loader: hotelFormLoader,
          },
          {
            path: "rooms",
            element: <Room />,
            loader: roomLoader,
          },
          {
            path: "room/new",
            element: <RoomForm />,
            action: addRoomAction,
            loader: roomFormLoader,
          },
        ],
      },
      { path: "logout", loader: logoutLoader },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
