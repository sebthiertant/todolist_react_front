import React from "react";
import Animation from "../LoadingLottie/LoadingLottie";
import loading from "../../assets/loading_animation.json";

const Footer = (props) => {
	const { author, year } = props;
	return (
		<div className="footer_container">
			<Animation lotti={loading} height={200} width={200} />
			<h1>
				Developed by {author} in {year}
			</h1>
		</div>
	);
};

export default Footer;
