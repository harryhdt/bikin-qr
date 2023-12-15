<script lang="ts">
	import { generateQR } from '$lib';

	let text = '';
</script>

<svelte:head>
	<title>Bikin QR | Harry Hidayat</title>
</svelte:head>

<div>
	<input type="text" bind:value={text} placeholder="Your text / link..." />
	<button
		on:click={() =>
			generateQR({
				data: text,
				qrConfig: { fileName: new Date().getTime().toString() }
			})}>Generate QR</button
	>
</div>
