export const errorInput = (target) => {
	return target ? "border-red-400" : "border-gray-300";
};

export const errorMessage = (target) => {
	return (
		target && <span className='text-red-400 text-sm'>{target.message}</span>
	);
};

export const errorMessageValues = {
	username: {
		required: "Le pseudo est requis",
		maxLength: {
			value: 20,
			message: "Le pseudo doit faire maximum 20 caractères",
		},
		minLength: {
			value: 3,
			message: "Le pseudo doit faire minimum 3 caractères",
		},
	},
	// email: {
	// 	required: "Votre identifiant est incorrect",
	// 	maxLength: {
	// 		value: 40,
	// 		message: "Le pseudo doit faire maximum 20 caractères",
	// 	},
	// 	minLength: {
	// 		value: 3,
	// 		message: "Le pseudo doit faire minimum 3 caractères",
	// 	},
	// },

	titre: {
		required: "Le titre est requis",
		maxLength: {
			value: 20,
			message: "Le titre doit faire maximum 20 caractères",
		},
		minLength: {
			value: 3,
			message: "Le titre doit faire minimum 3 caractères",
		},
	},

	content: {
		required: "Le content est requis",
		maxLength: {
			value: 20,
			message: "Le content doit faire maximum 20 caractères",
		},
		minLength: {
			value: 3,
			message: "Le content doit faire minimum 3 caractères",
		},
	},

	email: {
		required: "L'email est requis",
		pattern: {
			value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
			message: "L'email que vous avez saisi n'est pas valide",
		},
	},

	password: {
		required: "Le mot de passe est requis",
		// pattern: {
		// 	value: /^([A-Z][a-z]+)+$/,
		// 	message: "Le mot de passe doit contenir au moins 1 majuscule",
		// },
	},

	age: {
		min: {
			value: 16,
			message: "Vous devez avoir 16 ans." 
		}
	}



};
