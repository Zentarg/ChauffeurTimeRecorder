<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import IconCog from './components/icons/IconCog.vue';
import IconNote from './components/icons/iconNote.vue';
import { useDataStore } from './stores/data';
import { useDataV2Store } from './stores/datav2';
import { useHomeDataStore } from './stores/homeData';
import { useSettingsStore } from './stores/settings';
import { useSettingsV2Store } from './stores/settingsv2';

onMounted(() => {
	let settings = useSettingsStore();
	let settingsv2 = useSettingsV2Store();
	let data = useDataStore();
	let datav2 = useDataV2Store();
	let homeData = useHomeDataStore();

	if (localStorage.getItem('settings')) {
		settings.$state = JSON.parse(localStorage.getItem('settings'));
	}
	if (localStorage.getItem('settingsv2')) {
		settingsv2.$state = JSON.parse(localStorage.getItem('settings'));
	}
	if (localStorage.getItem('data')) {
		const json = JSON.parse(localStorage.getItem('data'));
		json.reports.sort((a, b) => {
			return a.id - b.id;
		});
		data.$state = json;
	}
	if (localStorage.getItem('datav2')) {
		const json = JSON.parse(localStorage.getItem('datav2'));
		json.reports.sort((a, b) => {
			return a.id - b.id;
		});
		datav2.$state = json;
	}
	if (localStorage.getItem('homeData')) {
		homeData.$state = JSON.parse(localStorage.getItem('homeData'));
	}
	settings.$subscribe((mutation, state) => {
		localStorage.setItem('settings', JSON.stringify(state));
	});
	data.$subscribe((mutation, state) => {
		localStorage.setItem('data', JSON.stringify(state));
	});
	datav2.$subscribe((mutation, state) => {
		localStorage.setItem('datav2', JSON.stringify(state));
	});
	homeData.$subscribe((mutation, state) => {
		localStorage.setItem('homeData', JSON.stringify(state));
	});
});
</script>

<template>
	<header>
		<nav>
			<RouterLink to="/">
				<IconNote></IconNote>
			</RouterLink>
			<RouterLink to="/settings"> <IconCog></IconCog> </RouterLink>
		</nav>
	</header>

	<div class="router-view">
		<RouterView />
	</div>
</template>

<style lang="scss">
@use './assets/mixins.scss' as m;
@import '@/assets/base.scss';

#app {
	display: flex;
	flex-direction: column;
	@include m.tablet {
		flex-direction: row;
	}
	header {
		position: relative;
		width: 4rem;
		flex: 0 0 4rem;

		nav {
			position: fixed;
			padding: var(--general-x-padding);
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 1.5rem;
			background-color: var(--color-background);
			width: 100%;
			z-index: 1;

			@include m.tablet {
				width: auto;
				flex-direction: column;
				padding: var(--general-padding);
			}

			a {
				text-decoration: none;
				color: var(--color-text);
				&:hover {
					color: var(--color-text-hover);
				}
				svg {
					height: 3rem !important;
					width: 3rem !important;
				}
			}
		}
	}

	.router-view {
		width: 100%;
	}
}
</style>
