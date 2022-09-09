import { useAtomValue } from "jotai";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { currentuser, logged } from "../components/atoms/logged";
import {
	errorMessageValues,
	errorInput,
	errorMessage,
} from "../components/authentication/errors";
import Post from "../components/Post";

function Home(props) {
	const API = "http://127.0.0.1:3000/articles";
	const [data, setData] = useState();

	const loggedd = useAtomValue(logged);
	const token = Cookies.get("token");
	const current_user = useAtomValue(currentuser);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		loggedd &&
			fetch(API)
				.then((response) => {
					return response.json();
				})
				.then((res) => {
					setData(res);
				});
	}, [loggedd, setData]);

	// const onSubmit = (data) => {
	// 	fetch(API, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-type": "application/json",
	// 			Authorization: `Bearer ${token}`,
	// 		},
	// 		body: JSON.stringify({ article: data }),
	// 	})
	// 		.then((response) => {
	// 			return response.json();
	// 		})
	// 		.then((res) => {});

	// 	window.location.reload();
	// };

	return (
		<div>
			<h1 className='text-3xl font-bold underline'>Hello Home!</h1>
			{loggedd && (
				<h1>Hello</h1>
			)}
		</div>
	);
}

export default Home;
