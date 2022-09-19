export let API;
export let CURRENT_URL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  API = "http://localhost:3000/";
  CURRENT_URL = "http://localhost:3001/";
} else {
  // production code
  API = "https://sharymeal-backend.herokuapp.com/";
  CURRENT_URL = "https://shary-meal-front.vercel.app/";
}

// export const API = "https://sharymeal-backend.herokuapp.com/"
// export const API = "http://localhost:3000/"
