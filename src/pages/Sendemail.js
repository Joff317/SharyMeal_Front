import React, { useRef, useState } from "react";
import { sendForm } from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function Sendemail(props) {
	const form = useRef();
	const [show, setShow] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		sendForm(
			"service_09xl3zh",
			"template_q6ra29y",
			form.current,
			"0Bg9DAwDXxsXNdrlv"
		).then(
			(result) => {
				console.log(result.text);
				setShow(true);
			},
			(error) => {
				console.log(error.text);
			}
		);
	};

	return (
		<div className='mx-[300px]'>
			<h1 className='my-4 text-3xl font-bold'>
				{" "}
				Veuillez noter votre adresse email :
			</h1>
			<form
				onSubmit={handleSubmit}
				ref={form}
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

export default Sendemail;
