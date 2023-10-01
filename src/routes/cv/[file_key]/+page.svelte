<script lang="ts">
	import PdfViewer from '$components/PDFViewer.svelte'
	import { Loader } from 'lucide-svelte'
	import { page } from '$app/stores'
	import { getS3FileUrl } from '$utils/s3.utils'
	import { onMount } from 'svelte'
	import Button from '$components/ui/button/button.svelte'
	import { goto } from '$app/navigation'
	import Textarea from '$components/ui/textarea/textarea.svelte'
	import type { PageData } from './$types'

	export let data: PageData

	let ready = false
	let parsedCV = 'Waiting for the CV to be parsed by gpt-3.5...'

	// wait for the object in the bucket to be accessible
	onMount(() => {
		fetch(`/api/chat`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content: data.rawContent })
		})
			.then((res: Response) => res.json())
			.then((data: { parsedCV: string }) => {
				parsedCV = data.parsedCV
			})
			.catch(console.error)

		setTimeout(() => (ready = true), 750)
	})

	const onCVDelete = () => {
		fetch(`/api/cv/${$page.params['file_key']}`, {
			method: 'DELETE'
		})
			.then(async () => {
				await goto('/')
			})
			.catch(console.error)
	}
</script>

<div class="flex h-[90vh] w-[100vw] px-10 py-5">
	{#if ready}
		<div class="flex w-full gap-5">
			<PdfViewer pdfUrl={getS3FileUrl($page.params['file_key'])} />
			<Textarea bind:value={parsedCV}></Textarea>
		</div>
	{:else}
		<p class="flex h-full w-full items-center justify-center text-lg">
			Loading CV into the PdfViewer <Loader class="h-8 w-8 animate-spin" />
		</p>
	{/if}
</div>

<div class="flex content-center items-center justify-center pb-5">
	<p class="pr-2 text-sm text-orange-700 dark:text-orange-400">
		Your CV will be automatically removed after 2 days, or you can choose to delete it immediately.
	</p>
	<Button size="sm" variant="destructive" on:click={onCVDelete}>Delete anyway</Button>
</div>
