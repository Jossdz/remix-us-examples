import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import axios from "axios";

// Ejemplo 3,
// Problemas con la transicion generica.

export const loader = async () => {
	const { data: posts } = await axios.get("http://localhost:3001/posts");

	return { posts };
};

export const action = async ({ request }) => {
	const formData = await request.formData();
	let { title, _action, id } = Object.fromEntries(formData);

	if (_action === "create") {
		await axios.post("http://localhost:3001/posts", {
			title
		});
	}

	if (_action === "delete") {
		await axios.delete(`http://localhost:3001/posts/${id}`);
	}

	return {};
};

export default () => {
	const { posts } = useLoaderData();
	const transition = useTransition();
	return (
		<>
			<h1>Todos</h1>
			<small>Example 3</small>

			<Form method="post" replace>
				<fieldset>
					<textarea name="title" />
					<button type="submit" name="_action" value="create">
						{transition.submission ? "Adding" : "Add"} post
					</button>
				</fieldset>
			</Form>
			{posts?.map((post) => (
				<div key={post.id}>
					<p>{post.title}</p>
					<Form method="post" replace>
						<input type="hidden" name="id" value={post.id} />
						<button type="submit" name="_action" value="delete">
							Delete
						</button>
					</Form>
				</div>
			))}
		</>
	);
};
