import { clsx } from "@core/clsx";

export function CodeBlock({
	language,
	children,
}: {
	language: string;
	children: string;
}) {
	return (
		<pre class={clsx(language, "!rounded-md")}>
			<code>{children}</code>
		</pre>
	);
}
