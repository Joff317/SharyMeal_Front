export const errorInput = (target) => {
  return target ? "border-red" : "border-gray-300";
};

export const errorMessage = (target) => {
  return target && <span className="text-red text-sm">{target.message}</span>;
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

  title: {
    required: "Le titre est requis",
    maxLength: {
      value: 50,
      message: "Le titre doit faire maximum 50 caractères",
    },
    minLength: {
      value: 3,
      message: "Le titre doit faire minimum 3 caractères",
    },
  },

  description: {
    required: "La description est requise",
  },

  categories: {
    minLength: {
      value: 1,
      message: "Vous devez saisir au moins une catégorie",
    },
  },

  content: {
    required: "Le content est requis",
    maxLength: {
      value: 50,
      message: "Le content doit faire maximum 50 caractères",
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
    pattern: {
      value: /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/,
      message:
        "Le mot de passe doit contenir au moins une lettre, un nombre et un caractère spécial",
    },
    maxLength: {
      value: 20,
      message: "Le mot de passe doit faire maximum 20 caractères",
    },
    minLength: {
      value: 8,
      message: "Le mot de passe doit faire minimum 8 caractères",
    },
  },

  age: {
    min: {
      value: 16,
      message: "Vous devez avoir 16 ans.",
    },
  },

  // price:{
  //   minLength: {
  //     value: 1,
  //     message: "Le prix est requis (inscrire '0' si gratuit)."
  //   },
  // }
};
