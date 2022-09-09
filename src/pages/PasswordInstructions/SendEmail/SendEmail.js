import React, { useState } from "react";
import { API } from "../../../utils/variables";

function SendEmail() {
	const [show, setShow] = useState(false);
	const API_URL_RESET = `${API}users/password` 

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch(API_URL_RESET, {
			method: "POST",
			headers: {
				"Content-Type": 'application/json',
				"Accept": 'application/json',
			},
			body: JSON.stringify({user: {email: e.target.email.value}})
		})
		.then((response) => {
		 return response.json()
		})
		.then((res) => {
			setShow(true)
			console.log(res);
		})
		.catch((error) => console.log(error.message))
	}

	
	return (
		<div className='mx-[300px]'>
			<h1 className='my-4 text-3xl font-bold'>
				{" "}
				Veuillez noter votre adresse email :
			</h1>
			<form
				onSubmit={handleSubmit}

				className='flex flex-col max-w-xs gap-3'>
				<input
					className='border h-10 pl-3 rounded-md'
					placeholder='Noter votre mail'
					name='email'
				/>
				<input
					className='py-2 px-4 rounded text-white bg-slate-800 cursor-pointer'
					type='submit'
					value='envoyer'
				/>
			</form>
			{show && <h1 className='font-bold text-xl text-green-500'> Envoyé ! </h1>}
		</div>
	);
}

export default SendEmail;
