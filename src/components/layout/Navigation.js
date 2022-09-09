import { useAtom } from "jotai";
import Cookies from "js-cookie";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logged } from "../atoms/logged";

function Navigation(props) {
	let activeStyle = {
		textDecoration: "underline",
	};
	const [loggedd, setLogged] = useAtom(logged);
	const navigate = useNavigate();
	const token = Cookies.get("token");

	const reset = () => {
		setLogged(false);
		Cookies.remove("token");
		navigate("/login");

		fetch("http://127.0.0.1:3000/users/sign_out", {
			method: "DELETE",
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				return response.json();
			})
			.then((res) => {
				console.log(res);
			});
	};

	return (
		<div className='flex items-center justify-center gap-20 py-5 bg-slate-100'>
			<NavLink
				style={({ isActive }) => (isActive ? activeStyle : undefined)}
				to='/'>
				Home
			</NavLink>

			{!loggedd ? (
				<>
					{" "}
					<NavLink
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
						to='/register'>
						Register
					</NavLink>
					<NavLink
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
						to='/login'>
						Login
					</NavLink>{" "}
				</>
			) : (
				<>
					<NavLink
						style={({ isActive }) => (isActive ? activeStyle : undefined)}
						to='/user'>
						Profil
					</NavLink>{" "}
					<button className='py-2 px-4 bg-slate-800 text-white' onClick={reset}>
						{" "}
						Déconnexion{" "}
					</button>
				</>
			)}
		</div>
	);
}

export default Navigation;
