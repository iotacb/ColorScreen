import { useRef, useEffect } from "react";

function App() {
	const can = useRef(null);

	const extractColorFromUrl = (url) => {
		// hex colors (3 or 6 digits)
		const hex = url.match(/#([0-9a-f]{3}){1,2}\b/gi);
		if (hex) {
			return hex[0];
		}
		// rgb colors
		const rgb = url.match(/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/gi);
		if (rgb) {
			return rgb[0];
		}

		// hsl colors
		const hsl = url.match(/hsl\((\d{1,3}),(\d{1,3}%),(\d{1,3}%)\)/gi);
		if (hsl) {
			return hsl[0];
		}

		// named colors
		const named = url.match(
			/(aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow)/gi
		);
		if (named) {
			return named[0];
		}

		// random color if no color is found
		return `hsl(${Math.random() * 360}, 100%, 50%)`;
	};

	useEffect(() => {
		if (can.current) {
			const ctx = can.current.getContext("2d");
			const color = extractColorFromUrl(window.location.href);
			console.log(color);
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, can.current.width, can.current.height);
		}
	}, []);

	return (
		<canvas
			style={{
				width: "100vw",
				height: "100vh",
			}}
			ref={can}
		></canvas>
	);
}

export default App;
