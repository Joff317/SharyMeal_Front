import { useSetAtom } from "jotai";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { currentuser, logged } from "../atoms/logged";
import { errorMessageValues, errorInput, errorMessage } from "./errors";
import usePostForm from "./usePostForm";

function FormLogin(props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const setLogged = useSetAtom(logged);
	const current_user = useSetAtom(currentuser);
	const navigate = useNavigate();

	const OnSubmit = (data) => {
		usePostForm(
			"http://localhost:3000/users/sign_in",
			data,
			setLogged,
			current_user,
			navigate,
			"/user"
		);
	};

	return (
		<div className='mx-[200px] mt-10'>
			<h1 className='font-bold text-2xl'> Se connecter </h1>
			<form
				className={`max-w-[400px] flex flex-col gap-3 mt-2`}
				onSubmit={handleSubmit(OnSubmit)}>
				<div className='flex flex-col'>
					<p> Email </p>
					<input
						className={`border h-10 pl-3 rounded-md  ${errorInput(
							errors.email
						)}`}
						type='text'
						{...register("email", errorMessageValues.email)}
					/>
					{errorMessage(errors.email)}
				</div>
				<div className='flex flex-col'>
					<p> Password </p>
					<input
						className={`border h-10 pl-3 rounded-md ${errorInput(
							errors.password
						)}`}
						type='Password'
						{...register("password", errorMessageValues.password)}
					/>
					{errorMessage(errors.password)}
				</div>
				<Link to='/sendemail'> Mot de passe oublié ? </Link>
				<button
					className='py-2 px-4 rounded text-white bg-slate-800'
					type='submit'>
					{" "}
					Submit{" "}
				</button>
			</form>
		</div>
	);
}

export default FormLogin;
