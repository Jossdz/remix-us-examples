import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import axios from "axios";

export const loader = async () => {
	const { data: posts } = await axios.get("http://localhost:3001/posts");

	return { posts };
};

export const action = async ({ request }) => {
	const formData = await request.formData();
	const title = await formData.get("title");

	await axios.post("http://localhost:3001/posts", {
		title
	});

	return {};
};

export default () => {
	const { posts } = useLoaderData();

	return (
		<>
			<h1>Posts</h1>
			<small>
				Para ver las ventajas de remix en cuestion de SSR, usa esta pagina con y
				sin JS activado en el cliente y analiza las diferencias.
			</small>
			<Form method="post" replace>
				<fieldset>
					<textarea name="title" />
					<button type="submit">Add post</button>
				</fieldset>
			</Form>
			{posts?.map((todo) => (
				<p key={todo.id}>{todo.title}</p>
			))}
		</>
	);
};
