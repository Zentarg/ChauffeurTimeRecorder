<script lang="ts">
import { defineComponent } from 'vue';
import IconCheck from './icons/IconCheck.vue';
import IconClose from './icons/IconClose.vue';

export default defineComponent({
	props: {
		modelValue: {},
		label: {
			type: String,
		},
	},
	methods: {
		InputChanged(event) {
			this.$emit('update:modelValue', event.target.checked);
		},
	},
	components: { IconCheck, IconClose },
});
</script>

<template>
	<label class="label">
		<div class="checkbox-placeholder">
			<IconCheck v-show="modelValue"></IconCheck>
			<IconClose v-show="!modelValue"></IconClose>
		</div>
		<input
			type="checkbox"
			class="checkbox"
			:checked="modelValue"
			@input="InputChanged"
		/>

		{{ label }}</label
	>
</template>

<style scoped lang="scss">
.label {
	position: relative;
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: var(--color-background-mute);
	color: var(--color-heading);
	padding: 0 var(--general-x-padding);
	user-select: none;
	cursor: pointer;
	.checkbox {
		position: absolute;
		opacity: 0;
	}
	.checkbox-placeholder {
		position: relative;
		display: flex;
		pointer-events: none;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
	}
}
</style>
