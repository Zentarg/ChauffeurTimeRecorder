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
		// position: absolute;
		// left: 4rem;
	}
}
</style>
