import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserHistory,
  createHashHistory,
  createMemoryHistory,
} from "history";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Switch } from "react-router";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Detail from "./pages/DetailFilm/Detail";
import CheckoutTemplate from "./templates/CheckoutTemplate/CheckoutTemplate";
import Checkout from "./pages/Checkout/Checkout";
import { UserTempalte } from "./templates/UserTemplate/UserTemplate";
import CheckoutTab from "./pages/Checkout/Checkout";
import TicketHistory from "./pages/TicketHistory/TicketHistory";
import Loading from "./components/Loading/Loading";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users/Users";
import Films from "./pages/Admin/Films/Films";
import Calendar from "./pages/Admin/Calendar/Calendar";
import AddNew from "./pages/Admin/Films/AddNew";
import Edit from "./pages/Admin/Films/Edit";
import DetailPhim from "./pages/Admin/Films/DetailPhim";
import Create from "./pages/Admin/Calendar/Create";
import EditUser from "./pages/Admin/Users/EditUser";
import OrderHistory from "./pages/Admin/Users/OrderHistory";
import CumRap from "./pages/Admin/CumRap/CumRap";
import AddNewHeThongRap from "./pages/Admin/CumRap/AddNewHeThongRap";
import EditHeThongRap from "./pages/Admin/CumRap/EditHeThongRap";
import EditCumRap from "./pages/Admin/CumRap/EditCumRap";
import AddNewCumRap from "./pages/Admin/CumRap/AddNewCumRap";
import Banner from "./pages/Admin/Banner/Banner";
export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading />
      <Routes>
        <Route
          path="/"
          exact
          element={<HomeTemplate childComponent={<Home />} />}
        />
        <Route
          path="/home"
          exact
          element={<HomeTemplate childComponent={<Home />} />}
        />
        <Route
          path="/contact"
          exact
          element={<HomeTemplate childComponent={<Contact />} />}
        />
        <Route
          path="/news"
          exact
          element={<HomeTemplate childComponent={<News />} />}
        />
        <Route
          path="/detail/:id"
          exact
          element={<HomeTemplate childComponent={<Detail />} />}
        />
        <Route
          path="/profile"
          exact
          element={<HomeTemplate childComponent={<Detail />} />}
        />
        <Route
          path="/login"
          exact
          element={<UserTempalte childComponent={<Login />} />}
        />
        <Route
          path="/register"
          exact
          element={<UserTempalte childComponent={<Register />} />}
        />

        <Route
          path="checkout/:id"
          exact
          element={<CheckoutTemplate childComponent={<CheckoutTab />} />}
        />
        <Route
          path="/order/history/"
          exact
          element={<CheckoutTemplate childComponent={<TicketHistory />} />}
        />
        <Route
          path="/admin"
          exact
          element={<AdminTemplate childComponent={<Dashboard />} />}
        />
        <Route
          path="/admin/films"
          exact
          element={<AdminTemplate childComponent={<Films />} />}
        />
        <Route
          path="/admin/films/addnew"
          exact
          element={<AdminTemplate childComponent={<AddNew />} />}
        />
        <Route
          path="/admin/films/detail/:id/:tenPhim"
          exact
          element={<AdminTemplate childComponent={<DetailPhim />} />}
        />
        <Route
          path="/admin/films/edit/:id/:tenPhim"
          exact
          element={<AdminTemplate childComponent={<Edit />} />}
        />
        <Route
          path="/admin/calendar/create/:id"
          exact
          element={<AdminTemplate childComponent={<Create />} />}
        />
        <Route
          path="/admin/calendar"
          exact
          element={<AdminTemplate childComponent={<Calendar />} />}
        />
        <Route
          path="/admin/users"
          exact
          element={<AdminTemplate childComponent={<Users />} />}
        />

        <Route
          path="/admin/users/orders/history/:taiKhoan"
          exact
          element={<AdminTemplate childComponent={<OrderHistory />} />}
        />
        <Route
          path="/admin/users/edit/:taiKhoan"
          exact
          element={<AdminTemplate childComponent={<EditUser />} />}
        />
        <Route
          path="/admin/cumrap"
          exact
          element={<AdminTemplate childComponent={<CumRap />} />}
        />
        <Route
          path="/admin/cumrap/create"
          exact
          element={<AdminTemplate childComponent={<AddNewHeThongRap />} />}
        />
        <Route
          path="/admin/cumrap/create/:maHeThongRap"
          exact
          element={<AdminTemplate childComponent={<AddNewCumRap />} />}
        />
        <Route
          path="/admin/cumrap/edit/:maHeThongRap"
          exact
          element={<AdminTemplate childComponent={<EditHeThongRap />} />}
        />
        <Route
          path="/admin/cumrap/edit/:maHeThongRap/:maCumRap"
          exact
          element={<AdminTemplate childComponent={<EditCumRap />} />}
        />
        <Route
          path="/admin/banner"
          exact
          element={<AdminTemplate childComponent={<Banner />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
