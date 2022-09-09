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

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route element={<ProtectedRoutes/>}>
					<Route path='/user' element={<User/>} />
				</Route>
				<Route path='/register' element={<Form />} />
				<Route path='/sendemail' element={<SendEmail />} />
				<Route path='/new_password/:tokenId' element={<ReinitPassword />} />
				<Route path='/login' element={<FormLogin />} />
				<Route path='/*' element={<NotFound/>}/>
			</Routes>
		</Layout>
	);
}

export default App;
