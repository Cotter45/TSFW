// src/pages/Custom404.ts

import { navigateTo } from "@core/router";

export default function Custom404() {
	return (
		<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
			<h1 style="font-size: 3rem; color: #FF6B6B;">404 - Page Not Found</h1>
			<p style="font-size: 1.25rem; color: #6c757d;">
				Oops! The page you're looking for doesn't exist.
			</p>
			<button
				type="button"
				style="margin-top: 20px; padding: 10px 20px; font-size: 1rem; color: white; background-color: #257A57; border: none; border-radius: 4px; cursor: pointer;"
				onclick={() => navigateTo("/")}
			>
				Go Back Home
			</button>
		</div>
	);
}
