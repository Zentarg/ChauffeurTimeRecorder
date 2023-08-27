<script lang="ts">
import type { Tab } from '@/ViewModels/Tab';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
	props: {
		type: {
			type: String,
			default: 'text',
		},
		tabs: {
			type: Array,
			default: []
		},
		modelValue: {},
	},
	data() {
		return {
			convertedTabs: this.tabs as Tab[]
		}
	},
	methods: {
		TabClicked(tab: Tab) {
			this.$emit('update:modelValue', tab);
		},
	},
});
</script>

<template>
	<div class="tabs-container">
		<div v-for="tab in convertedTabs" :key="tab.Key" @click="TabClicked(tab)" class="tab" :class="{'active' : modelValue?.Key == tab.Key}">
			{{ tab.Name }}
		</div>
	</div>
</template>

<style scoped lang="scss">
	.tabs-container {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		gap: 10px;

		.tab {
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: bold;
			font-size: 1.5em;
			width: 100px;
			height: 50px;
			background: var(--color-tabs-background);
			cursor: pointer;

			&:hover {
				background: var(--color-tabs-background-hover);
			}

			&.active {
				background: var(--color-tabs-background-active);
			}
		}

	}
</style>
