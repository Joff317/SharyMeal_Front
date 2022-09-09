import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
	 	errorMessageValues,
	 	errorInput,
		errorMessage,
	} from "../../../components/authentication/errors";
import { API } from "../../../utils/variables";	

function ReinitPassword(props) {


	const token = useParams().tokenId;
	console.log(token, typeof token);
	const navigate = useNavigate();
	const [show, setShow] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const OnSubmit = (data) => {
		fetch(API + "users/password", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({
				user: {
					reset_password_token: token,
					password: data.password,
					password_confirmation: data.password_confirmation,
				},
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setShow(true);
				setTimeout(() => {
					navigate("/login");
				}, "2000");
			})
			.catch((error) => console.log(error.message));
	};


	return (
		<>
			<div>ReinitPassword</div>
			<form
				className={`max-w-[400px] flex flex-col gap-3 mt-2`}
				onSubmit={handleSubmit(OnSubmit)}>
				<div className='flex flex-col'>
					<p> Password </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.password
						)}`}
						type='password'
						{...register("password", errorMessageValues.password)}
					/>
					{errorMessage(errors.password)}
				</div>
				<div className='flex flex-col'>
					<p> Confirm password </p>
					<input
						className={`border h-10 pl-3 rounded-md ${errorInput(
							errors.password
						)}`}
						type='Password'
						{...register("password_confirmation", errorMessageValues.password)}
					/>
					{errorMessage(errors.password)}
				</div>

				<button
					className='py-2 px-4 rounded text-white bg-slate-800'
					type='submit'>
					{" "}
					Submit{" "}
				</button>
			</form>
			{show && (
				<h1 className='font-bold text-xl text-green-500'>
					{" "}
					Mot de passe modifié avec succès !{" "}
				</h1>
			)}
		</>
	)
}

export default ReinitPassword;
