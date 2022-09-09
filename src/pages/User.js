import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { logged } from "../components/atoms/logged";

function User(props) {
	const API = "http://127.0.0.1:3000/member-data";
	const token = Cookies.get("token");
	const [data, setData] = useState();
	const loggedd = useAtomValue(logged);

	useEffect(() => {
		loggedd &&
			fetch(API, {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((response) => {
					return response.json();
				})
				.then((res) => {
					console.log(res);
					setData(res.user);
				});
	}, [setData]);

	return (
		<div className='flex flex-col justify-center gap-2'>
			{data && (
				<>
					<h1 className='text-2xl font-bold text-center mt-5'>
						{" "}
						{data.email}{" "}
					</h1>
					<h1 className='text-center mt-2'> user_id = {data.id} </h1>
				</>
			)}
		</div>
	);
}

export default User;
