<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Print from './components/Print.vue';
import IconTooling from './components/icons/IconTooling.vue';
import IconCommunity from './components/icons/IconCommunity.vue';
import IconDocumentation from './components/icons/IconDocumentation.vue';
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
		width: 75px;
		height: 100vh;

		nav {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			align-items: center;
			gap: 3rem;
			padding: $general-padding;

			a {
				text-decoration: none;
				color: var(--color-text);
				&:hover {
					color: var(--color-text-hover);
				}
				svg {
					transform: scale(2);
				}
			}
		}
	}

	.router-view {
		position: absolute;
		left: 75px;
		height: 100vh;
		width: calc(100vw - 75px);
	}
}
</style>
