<script lang="ts">
	export let pdfUrl: string
</script>

<iframe
	src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
	class="h-full w-full"
	title="PDF Viewer"
></iframe>
