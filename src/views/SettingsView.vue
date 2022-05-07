<script setup lang="ts">
import Settings from '../components/Settings.vue';
</script>

<template>
	<main>
		<h1 class="headline">Indstillinger</h1>
		<Settings></Settings>
	</main>
</template>

<style scoped lang="scss">
main {
	padding: var(--general-padding);
	display: flex;
	flex-direction: column;
	gap: 2rem;

	.headline {
		line-height: 1em;
	}
}
</style>
