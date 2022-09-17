import Cookies from "js-cookie";

function usePostForm(url, data, setLogged, current_user, setAuthResult) {

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: data }),
  })
    .then((response) => {
      // console.log(response);

      if (!response.headers.has('Authorization')) {throw "Cancel"}

      Cookies.set("token", response.headers.get("Authorization").replace("Bearer ", ""));
      return response.json();

    })
    .then((res) => {
      // console.log('res', res);  
      current_user(res.user);
      setLogged && setLogged(true);     
    })
    .catch(error => {
      // console.error(error)
      setAuthResult(false)
    });

    
}

export default usePostForm;
