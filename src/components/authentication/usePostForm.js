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
      current_user({
        ...current_user_value,
        city: res.user.city,
        name: res.user.name,
        age: res.user.age,
        email: res.user.email,
        gender: res.user.gender,
        description: res.user.description,
        avatar_url: res.user.avatar_url,
        id: res.user.id,
      });
      setLogged && setLogged(true);
    })
    .catch((error) => {
      setAuthResult(false);
    });
}

export default usePostForm;
