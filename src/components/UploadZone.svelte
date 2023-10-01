<script lang="ts" context="module">
	type Files = {
		accepted: File[]
		rejected: File[]
	}
</script>

<script lang="ts">
	import Dropzone from 'svelte-file-dropzone/Dropzone.svelte'
	import { Inbox, Loader } from 'lucide-svelte'
	import { goto } from '$app/navigation'

	let files: Files = {
		accepted: [],
		rejected: []
	}

	let loading = false

	const handleFilesSelect = async (
		e: CustomEvent<{ acceptedFiles: File[]; fileRejections: File[] }>
	) => {
		files = {
			accepted: [],
			rejected: []
		}

		const { acceptedFiles, fileRejections } = e.detail
		files.accepted = [...files.accepted, ...acceptedFiles]
		files.rejected = [...files.rejected, ...fileRejections]

		if (acceptedFiles.length < 1) return

		const file = acceptedFiles[0]
		if (file.size > 10 * 1024 * 1024) {
			alert('File size should be less than 10MB')

			return
		}

		const data = new FormData()
		data.append('file', await file)
		data.append('name', file.name)

		try {
			loading = true
			const response = await fetch('/api/cv', {
				method: 'POST',
				body: data
			})

			const { file_key } = await response.json()

			await goto(`/cv/${file_key}`)
			loading = false
		} catch (e) {
			console.error(e)
			loading = false
		}
	}
</script>

<div class="m-4rounded-lg border border-dashed border-gray-300">
	<Dropzone
		inputElement={undefined}
		multiple={false}
		disabled={loading}
		accept=".pdf"
		on:drop={handleFilesSelect}
	>
		{#if loading}
			<p class="flex h-full w-full items-center justify-center text-lg">
				Uploading CV... <Loader class="h-8 w-8 animate-spin" />
			</p>
		{:else}
			<Inbox class="h-10 w-10 text-blue-500" />
			<p class="mt-2 text-sm">Drop PDF Here</p>
			<p class="mt-2 text-sm">10 MB max.</p>
		{/if}
	</Dropzone>
</div>
