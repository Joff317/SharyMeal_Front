import { Route, Routes } from "react-router-dom";
import FormLogin from "./components/authentication/login";
import Form from "./components/authentication/register";
import Layout from "./components/layout/Layout";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ReinitPassword from "./pages/ReinitPassword";
import Sendemail from "./pages/Sendemail";
import User from "./pages/User";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route element={<ProtectedRoutes/>}>
						<Route path='/user' element={<User />} />
					
					</Route>
				<Route path='/register' element={<Form />} />
				<Route path='/sendemail' element={<Sendemail />} />
				<Route path='/new_password/:tokenId' element={<ReinitPassword />} />
				<Route path='/login' element={<FormLogin />} />
				<Route path='/*' element={<NotFound/>}/>
			</Routes>
		</Layout>
	);
}

export default App;
