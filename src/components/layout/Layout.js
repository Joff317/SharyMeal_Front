import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation/Navigation";

function Layout({ children }) {
	const css = {
		maxW: "2xl",
	};

	return (
		<div className="">
			<Navigation />
			<div className={`m-auto max-w-screen-${css.maxW} `}>{children}</div>
			<Footer/>
		</div>
	);
}

export default Layout;
