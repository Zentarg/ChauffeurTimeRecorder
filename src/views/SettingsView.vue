<script setup lang="ts">
import Settingsv2 from '@/components/Settingsv2.vue';
import Settings from '../components/Settings.vue';
</script>

<template>
	<main>
		<h1 class="headline">Indstillinger</h1>
		<Settings></Settings>
		<Settingsv2></SettingsV2>
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
