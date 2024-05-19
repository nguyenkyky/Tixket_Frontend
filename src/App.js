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
import Users from "./pages/Admin/Users";
import Films from "./pages/Admin/Films/Films";
import Calendar from "./pages/Admin/Calendar/Calendar";
import AddNew from "./pages/Admin/Films/AddNew";
import Edit from "./pages/Admin/Films/Edit";
import DetailPhim from "./pages/Admin/Films/DetailPhim";
import Create from "./pages/Admin/Calendar/Create";
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
          path="/admin/calendar/create/:id/:tenPhim"
          exact
          element={<AdminTemplate childComponent={<Create />} />}
        />
        <Route
          path="/admin/users"
          exact
          element={<AdminTemplate childComponent={<Users />} />}
        />
        <Route
          path="/calendar"
          exact
          element={<AdminTemplate childComponent={<Calendar />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
