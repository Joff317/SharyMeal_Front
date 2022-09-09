// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";

// function useFetch(url, token = "", method = "GET") {
// 	const [data, setData] = useState();
// 	const [test, settest] = useState(false);

// 	useEffect(() => {
// 		fetch(url, {
// 			method: method,
// 			headers: { Authorization: `Bearer ${token}` },
// 		})
// 			.then((res) => res.json())
// 			.then((res) => {
// 				setData(res);
// 				if (res.jwt) {
// 					Cookies.set("token", res.jwt);
// 				}
// 			});
// 	}, [url, token, method]);

// 	return [data, test];
// }

// export default useFetch;
