<script lang="ts">
	import { generateQR } from '$lib';
	import IconLoadingDownload from '$lib/icons/IconLoadingDownload.svelte';
	import IconSuccess from '$lib/icons/IconSuccess.svelte';
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
			}, 2000);
		}, 1000);
	};
</script>

<svelte:head>
	<script
		defer
		type="text/javascript"
		src="https://unpkg.com/qr-code-styling@1.5.0/lib/qr-code-styling.js"
	></script>
</svelte:head>

<div id="app">
	{#if showLoading}
		<div in:fade={{ duration: 300 }}>
			<div in:scale>
				<IconLoadingDownload />
			</div>
		</div>
	{:else if success}
		<div in:scale={{ duration: 300 }}>
			<IconSuccess />
		</div>
	{:else}
		<div id="qr-generator" in:fade={{ duration: 300 }}>
			<div>
				<h1>Bikin QR</h1>
				<p>Part of <a href="https://harryhdt.dev" target="_blank">harryhdt.dev</a></p>
			</div>
			<div id="form">
				<textarea bind:value={text} placeholder="Your text / link..." rows="4" />
				<button style="cursor: {text ? 'pointer' : 'not-allowed'};" on:click={generateTheQR}
					>Bikin QR</button
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
		padding-bottom: 60px;
	}
	#app #qr-generator {
		width: 100%;
		max-width: 512px;
		padding: 16px;
	}
	#app h1 {
		font-size: x-large;
		font-weight: 600;
		text-align: center;
	}
	#app p {
		color: #555;
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
		text-align: center;
	}
	textarea {
		padding: 12px 16px;
		border: 1px solid #ddd;
		background: #fafafa;
		position: relative;
		z-index: 2;
		display: block;
		margin-left: auto;
		margin-right: auto;
		width: calc(100% - 64px);
		margin-bottom: 8px;
		resize: none;
	}
	textarea:focus,
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
		white-space: nowrap;
	}
	button:hover {
		background: #e7e7e7;
		border: 1px solid #ddd;
	}
</style>
