<script lang="ts" context="module">
</script>

<script lang="ts">
	import MaxWidthWrapper from '$components/MaxWidthWrapper.svelte'
	import UploadZone from '$components/UploadZone.svelte'
	import OpenAIIcon from '$components/OpenAIIcon.svelte'
</script>

<!-- introduction -->
<MaxWidthWrapper class="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
	<div
		class="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50"
	>
		<p class="text-sm font-semibold text-gray-700">Try it!</p>
	</div>

	<h1 class="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
		Parse your <span class="text-blue-600">CV</span>
	</h1>
	<p class="mt-5 flex max-w-prose gap-2 text-zinc-700 sm:text-lg">
		Powered by <span class="text-green-600">OpenAI</span>
		<OpenAIIcon class="h-7 w-7" />
	</p>
</MaxWidthWrapper>

<!-- value proposition section -->
<div class="relative isolate">
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
	>
		<div
			class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
		/>
	</div>

	<UploadZone />
</div>

<style>
</style>
