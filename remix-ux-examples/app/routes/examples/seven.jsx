import { redirect } from "@remix-run/node";
import {
	Form,
	useFetcher,
	useLoaderData,
	useTransition
} from "@remix-run/react";
import axios from "axios";

// Ejemplo 7
// Optimistic ui

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
		try {
			// throw new Error("Error");
			await axios.delete(`http://localhost:3001/posts/${id}`);
		} catch (error) {
			return {
				error: true
			};
		}
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
			<small>Example 7</small>

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
			{isAdding && transition.submission?.formData?.get("title")}
		</main>
	);
};

function PostCard({ post }) {
	const fetcher = useFetcher();

	const error = fetcher.data?.error;

	return (
		<div
			key={post.id}
			style={{
				opacity:
					fetcher.state === "submitting" &&
					Number(fetcher.submission?.formData?.get("id")) === post.id
						? 0.25
						: 1,
				display: "flex",
				color: error ? "red" : "black"
			}}
		>
			<p>{post.title}</p>
			<fetcher.Form replace method="post">
				<input type="hidden" name="id" value={post.id} />
				<button type="submit" name="_action" value="delete">
					{error ? "Retry" : "Delete"}
				</button>
			</fetcher.Form>
		</div>
	);
}
