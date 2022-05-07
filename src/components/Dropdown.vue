<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		modelValue: {},
		options: {
			type: Array,
			required: true,
		},
		textSelector: {
			type: String,
			required: true,
		},
		label: {
			type: String,
		},
	},
	methods: {
		InputChanged(event) {
			console.log(
				event.target.value,
				this.options.find((o) => o.id == event.target.value)
			);
			this.$emit(
				'update:modelValue',
				this.options.find((o) => o.id == event.target.value)
			);
		},
	},
	computed: {
		value() {
			if (this.modelValue)
				if (this.textSelector in this.modelValue)
					return this.modelValue[this.textSelector];
		},
	},
});
</script>

<template>
	<div class="input-container">
		<select
			:class="{ empty: !modelValue }"
			:value="value"
			@input="InputChanged"
		>
			<option v-for="option in options" :value="option[textSelector]">
				{{ option[textSelector] }}
			</option>
		</select>
		<span class="top-label">{{ label }}</span>
	</div>
</template>

<style scoped lang="scss">
.input-container {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	min-width: 200px;

	select {
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
		height: 100%;
		text-transform: uppercase;
		font-weight: 500;
		background-color: var(--color-background-mute);
		color: var(--color-heading);
		border: none;

		&:not(.empty) {
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
}
</style>
