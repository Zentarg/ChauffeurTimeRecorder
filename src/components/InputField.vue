<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		type: {
			type: String,
			default: 'text',
		},
		modelValue: {
			type: [String, Number],
		},
		label: {
			type: String,
		},
		required: {
			type: Boolean,
			default: false,
		},
		pattern: {
			type: String,
			default: '',
		},
		maxLength: {
			type: String,
			default: ''
		}
	},
	methods: {
		InputChanged(event) {
			this.$emit('update:modelValue', event.target.value);
		},
	},
});
</script>

<template>
	<div class="input-container">
		<input
			class="input"
			:type="type"
			name=""
			:value="modelValue"
			@input="InputChanged"
			:class="{
				empty: modelValue === undefined || modelValue === '',
			}"
			:required="required"
			:pattern="pattern"
			:maxlength="maxLength"
		/>
		<span class="top-label">{{ label }}</span>
	</div>
</template>

<style scoped lang="scss">
.input-container {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 210px;

	.input {
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
		height: 100%;
		font-weight: 400;
		background-color: var(--color-background-mute);
		color: var(--color-heading);
		border: none;

		&:not(.empty), &[type=date] {
			& ~ .top-label {
				transform: translateY(-130%);
				left: 0;
			}
		}
	}

	.top-label {
		position: absolute;
		left: 0.55em;
		color: var(--color-heading);
		transition: 0.2s ease;
		pointer-events: none;
	}

	&:focus,
	&:focus-within {
		.top-label {
			transform: translateY(-130%);
			left: 0;
		}
	}
}
</style>
