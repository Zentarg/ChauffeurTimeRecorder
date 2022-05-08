<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		modelValue: {},
		options: {
			type: Array,
			required: true,
		},
		textSelectors: {
			type: Array,
			required: true,
		},
		label: {
			type: String,
		},
	},
	methods: {
		InputChanged(event) {
			this.$emit(
				'update:modelValue',
				this.options.find((o) => o.id == event.target.value)
			);
		},
		GetOptionLabel(option) {
			let string = '';
			let count = 0;
			for (const key of this.textSelectors) {
				if (key in option) {
					let value = option[key];
					if (key == 'date') {
						let date = option[key];
						if (typeof date == 'string')
							date = new Date(option[key]);
						let day, month, year;
						day = date.getDate();
						month = date.getMonth() + 1;
						year = date.getFullYear();
						if (day < 10) day = '0' + day;
						if (month < 10) month = '0' + month;
						date = `${day}/${month}-${year}`;
						value = date;
					}
					if (count < this.textSelectors.length - 1)
						string += `${value} - `;
					else string += value;
					count++;
				}
			}
			return string;
		},
	},
});
</script>

<template>
	<div class="input-container">
		<select
			:class="{ empty: !modelValue }"
			:value="modelValue.id"
			@input="InputChanged"
		>
			<option v-for="option in options" :value="option.id">
				{{ GetOptionLabel(option) }}
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
