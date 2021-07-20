import React from "react";

const Footer = (props) => {
	const { author, year } = props;
	return (
		<div className="footer_container">
			<h1>
				Developed by {author} in {year}
			</h1>
		</div>
	);
};

export default Footer;
