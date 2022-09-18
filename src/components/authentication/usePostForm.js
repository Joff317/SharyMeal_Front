import Cookies from "js-cookie";

function usePostForm(
  url,
  data,
  setLogged,
  current_user,
  setAuthResult,
  current_user_value
) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: data }),
  })
    .then((response) => {
      // console.log(response);

      if (!response.headers.has("Authorization")) {
        throw "Cancel";
      }

      Cookies.set(
        "token",
        response.headers.get("Authorization").replace("Bearer ", "")
      );
      return response.json();
    })
    .then((res) => {
      console.log("res", res);
      current_user({
        ...current_user_value,
        city: res.user.city,
        name: res.user.name,
        age: res.user.age,
        email: res.user.email,
        gender: res.user.gender,
        description: res.user.description,
        avatar_url: res.user.avatar_url,
      });
      setLogged && setLogged(true);
    })
    .catch((error) => {
      // console.error(error)
      setAuthResult(false);
    });
}

export default usePostForm;
