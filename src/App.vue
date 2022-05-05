<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import IconCog from './components/icons/IconCog.vue';
import IconNote from './components/icons/iconNote.vue';
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
@import '@/assets/base.scss';

#app {
	header {
		position: absolute;
		width: 4rem;
		height: 100vh;

		nav {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			align-items: center;
			gap: 1.5rem;
			padding: var(--general-padding);

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
		position: absolute;
		left: 4rem;
		height: 100vh;
	}
}
</style>
