import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import axios from "axios";

// Ejemplo 2 (PENDING UI)

export const loader = async () => {
	const { data: posts } = await axios.get("http://localhost:3001/posts");

	return { posts };
};

export const action = async ({ request }) => {
	const formData = await request.formData();
	let { title } = Object.fromEntries(formData);

	await axios.post("http://localhost:3001/posts", {
		title
	});

	return {};
};

export default () => {
	const { posts } = useLoaderData();
	const transition = useTransition();

	return (
		<>
			<h1>Todos</h1>
			<small>Example 2</small>

			<Form method="post" replace>
				<fieldset>
					<textarea name="title" />
					<button type="submit">
						{transition.submission ? "Adding" : "Add"} post
						{/* 
            Tambien podriamos haber hecho:
            {transition.state === 'submitting' ? "Adding" : "Add"} post

            Gracias al estado de la transicion que puede ser: idle, submitting, loading o success
            */}
					</button>
				</fieldset>
			</Form>
			{posts?.map((todo) => (
				<p key={todo.id}>{todo.title}</p>
			))}
		</>
	);
};
