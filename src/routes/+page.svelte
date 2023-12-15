<script lang="ts">
	import { generateQR } from '$lib';

	let text = '';
</script>

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
