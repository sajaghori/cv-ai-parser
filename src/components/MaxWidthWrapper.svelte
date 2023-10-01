<script lang="ts">
	import { cn } from '$utils/shadcn.utils'
</script>

<div class={cn('mx-auto w-full max-w-screen-xl px-2.5 md:px-20')} {...$$restProps}>
	<slot />
</div>
