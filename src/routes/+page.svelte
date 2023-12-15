<script lang="ts">
	import { generateQR } from '$lib';
	import { fade, scale } from 'svelte/transition';

	let text = '';
	let showLoading = false;
	let success = false;

	const generateTheQR = () => {
		if (!text) return;
		showLoading = true;
		generateQR({
			data: text,
			downloadOptions: { name: new Date().getTime().toString() }
		});
		text = '';
		setTimeout(() => {
			success = true;
			showLoading = false;
			setTimeout(() => {
				success = false;
			}, 4000);
		}, 500);
	};
</script>

<svelte:head>
	<title>Bikin QR | Harry Hidayat</title>
	<script
		type="text/javascript"
		src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"
	></script>
</svelte:head>

<div id="app">
	{#if showLoading}
		<div in:fade={{ duration: 300 }}>
			<svg
				in:scale
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				style="width: 48px; height: 48px; color: #666;"
				viewBox="0 0 24 24"
				><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"
					><path
						stroke-dasharray="2 4"
						stroke-dashoffset="6"
						d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
						><animate
							attributeName="stroke-dashoffset"
							dur="0.6s"
							repeatCount="indefinite"
							values="6;0"
						/></path
					><path
						stroke-dasharray="30"
						stroke-dashoffset="30"
						d="M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3"
						><animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.1s"
							dur="0.3s"
							values="30;0"
						/></path
					><path stroke-dasharray="10" stroke-dashoffset="10" d="M12 8v7.5"
						><animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.5s"
							dur="0.2s"
							values="10;0"
						/></path
					><path stroke-dasharray="6" stroke-dashoffset="6" d="M12 15.5l3.5 -3.5M12 15.5l-3.5 -3.5"
						><animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.7s"
							dur="0.2s"
							values="6;0"
						/></path
					></g
				></svg
			>
		</div>
	{:else if success}
		<div in:fade>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1024"
				height="1024"
				style="width: 48px; height: 48px; color: green"
				viewBox="0 0 1024 1024"
				><path
					fill="currentColor"
					d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
				/></svg
			>
		</div>
	{:else}
		<div in:fade={{ duration: 300 }}>
			<div>
				<h1>Bikin QR</h1>
				<p>Part of <a href="https://harryhdt.dev" target="_blank">harryhdt.dev</a></p>
			</div>
			<div id="form">
				<input type="text" bind:value={text} placeholder="Your text / link..." />
				<button style="cursor: {text ? 'pointer' : 'not-allowed'};" on:click={generateTheQR}
					>Generate QR</button
				>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(body) {
		margin: 0;
		padding: 16px;
	}
	:global(*) {
		font-size: 14px;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}
	#app {
		display: flex;
		position: fixed;
		inset: 0;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
	#app h1 {
		font-size: x-large;
		font-weight: 600;
		text-align: center;
	}
	#app p {
		color: #888;
		text-align: center;
		margin-top: -8px;
	}
	#app a {
		color: green;
		text-decoration: none;
	}
	#app a:hover {
		color: #555;
		text-decoration: underline;
	}
	#app #form {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	input {
		padding: 12px 16px;
		border: 1px solid #ddd;
		background: #fafafa;
		margin-right: -0.5px;
		position: relative;
		z-index: 2;
		max-width: calc(100vw - 105px - 80px);
	}
	input:focus,
	button:focus {
		outline: none;
		border: 1px solid #ccc;
	}
	button {
		padding: 12px 16px;
		border-radius: 0;
		background: #eee;
		cursor: pointer;
		border: 1px solid #ddd;
		margin-left: -0.5px;
		white-space: nowrap;
	}
	button:hover {
		background: #e7e7e7;
		border: 1px solid #ddd;
	}
</style>
