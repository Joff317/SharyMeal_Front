import React from "react";
import Navigation from "./Navigation";

function Layout({ children }) {
	const css = {
		maxW: "2xl",
	};

	return (
		<div>
			<Navigation />
			<div className={`m-auto max-w-screen-${css.maxW}`}>{children}</div>
		</div>
	);
}

export default Layout;
