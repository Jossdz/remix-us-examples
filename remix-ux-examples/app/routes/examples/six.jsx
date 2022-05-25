import { redirect } from "@remix-run/node";
import {
	Form,
	useFetcher,
	useLoaderData,
	useTransition
} from "@remix-run/react";
import axios from "axios";

// Ejemplo 6
// Concurrent mutations

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
	const isAdding =
		transition.state === "submitting" &&
		transition.submission.formData.get("_action") === "create";
	// Los datos del form solo estan disponibles en el estado "submitting" y "loading".

	return (
		<main>
			<h1>Todos</h1>
			<small>Example 6</small>

			<Form method="post" replace>
				<fieldset>
					<textarea name="title" />
					<button type="submit" name="_action" value="create">
						{isAdding ? "Adding" : "Add"} post
					</button>
				</fieldset>
			</Form>
			{posts?.map((post) => (
				<PostCard key={post.id} post={post} />
			))}
		</main>
	);
};

function PostCard({ post }) {
	const fetcher = useFetcher();

	return (
		<div
			key={post.id}
			style={{
				opacity:
					fetcher.state === "submitting" &&
					Number(fetcher.submission?.formData?.get("id")) === post.id
						? 0.25
						: 1,
				display: "flex"
			}}
		>
			<p>{post.title}</p>
			<fetcher.Form replace method="post">
				<input type="hidden" name="id" value={post.id} />
				<button type="submit" name="_action" value="delete">
					Delete
				</button>
			</fetcher.Form>
		</div>
	);
}
