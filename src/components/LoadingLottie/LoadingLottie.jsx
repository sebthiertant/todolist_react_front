import React from "react";
import Lottie from "react-lottie";

export default function LoadingLottie({ lotti, width, height }) {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: lotti,
		speed: 0.5,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<div className="animtion_container">
			<Lottie options={defaultOptions} height={height} width={width} />
		</div>
	);
}
