import { Route, Routes } from "react-router-dom";
import FormLogin from "./components/authentication/FormLogin/FormLogin";
import Form from "./components/authentication/FormRegister/FormRegister";
import Layout from "./components/layout/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import ReinitPassword from "./pages/PasswordInstructions/ReinitPassword/ReinitPassword";
import SendEmail from "./pages/PasswordInstructions/SendEmail/SendEmail";
import User from "./pages/User/User";
import MealsIndex from "./components/meals/MealsIndex";
import About from "./pages/About/About";
import CreateMeal from "./pages/createMeal/CreateMeal";
import MealDetails from "./components/meals/mealDetails/MealDetails";
import UserDetails from "./components/users/UserDetails";
import ConfirmPayment from "./components/meals/order/ConfirmPayment";
import Rgpd from "./pages/rgpd/Rgpd";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/create-meal" element={<CreateMeal />} />
        <Route path="/register" element={<Form />} />
        <Route path="/sendemail" element={<SendEmail />} />
        <Route path="/new_password/:tokenId" element={<ReinitPassword />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/*" element={<NotFound />} />
        <Route path="/meals/:mealId" element={<MealDetails />} />
        <Route path="/users/:userId" element={<UserDetails />} />
        <Route path="/meals" element={<MealsIndex />} />
        <Route path="/about" element={<About />} />
        <Route path="/confirm_payment" element={<ConfirmPayment />} />
        <Route path="/condition_d_utilisation" element={<Rgpd />} />
      </Routes>
    </Layout>
  );
}

export default App;
