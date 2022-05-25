import { Link } from "@remix-run/react";

const examples = ["one", "two", "three", "four", "five", "six", "seven"];
export default function Index() {
	return (
		<>
			<h1>Examples</h1>
			{examples.map((el, i) => (
				<li key={i}>
					<Link to={`/examples/${el}`}>Example {el}</Link>
				</li>
			))}
		</>
	);
}
