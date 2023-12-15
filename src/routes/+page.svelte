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
			}, 3000);
		}, 1000);
	};
</script>

<svelte:head>
	<title>Bikin QR | Harry Hidayat</title>
	<meta
		name="description"
		content="Bikin QR Code untuk link atau teks kamu secara bebas dan gratis. Coba sekarang !!!"
	/>
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
		padding-bottom: 60px;
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
