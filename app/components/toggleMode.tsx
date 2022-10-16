import { Form } from "@remix-run/react";

const ToggleMode = ({data}:any) => {
	return (
		<div>
			<Form method="post">
				<button type="submit">
					Change to {data === "light" ? "dark" : "light"} mode
				</button>
			</Form>
		</div>
	);
};

export default ToggleMode;
