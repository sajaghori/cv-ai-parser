<script>
	import Navbar from '$components/Navbar.svelte'
	import { cn } from '$utils/shadcn.utils'
	import '../app.postcss'
</script>

<div class={cn('grainy min-h-screen font-sans antialiased')}>
	<Navbar />
	<slot />
</div>
