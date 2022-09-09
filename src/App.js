import { Route, Routes } from "react-router-dom";
import FormLogin from "./components/forms/login";
import Form from "./components/forms/register";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ReinitPassword from "./pages/ReinitPassword";
import Sendemail from "./pages/Sendemail";
import User from "./pages/User";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/user' element={<User />} />
				<Route path='/register' element={<Form />} />
				<Route path='/sendemail' element={<Sendemail />} />
				<Route path='/new_password/:tokenId' element={<ReinitPassword />} />
				<Route path='/login' element={<FormLogin />} />
			</Routes>
		</Layout>
	);
}

export default App;
