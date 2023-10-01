<script lang="ts">
	export let pdfUrl: string

	console.info('Meow', pdfUrl)
</script>

<iframe
	src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
	class="h-full w-full"
	title="PDF Viewer"
></iframe>
