import { Heading, Text } from "@components/ui/Text";

// src/pages/FetchPage.tsx
export async function fetchData() {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return res.json();
}

export function FetchLoading() {
	return (
		<div>
			<Heading>Fetch</Heading>
			<Text>No data yet...</Text>
		</div>
	);
}

export default function FetchPage({ data, error }: { data: any; error: any }) {
	if (error) {
		console.log("THERE IS AN ERROR", error);
		return (
			<div>
				<h1>Error</h1>
				<p>{error.message}</p>
			</div>
		);
	}

	return (
		<div>
			<h1>Fetch</h1>
			<Text class="whitespace-pre">{JSON.stringify(data, null, 2)}</Text>
		</div>
	);
}
