export let API;
export let CURRENT_URL;

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  API = "http://localhost:3000/";
  CURRENT_URL = "http://localhost:3001/";
} else {
  API = "https://sharymeal-backend.herokuapp.com/";
  CURRENT_URL = "https://shary-meal-front.vercel.app/";
}
