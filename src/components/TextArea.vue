<script lang="ts">
import { defineComponent } from 'vue';
import ProgressRing from './ProgressRing.vue';

export default defineComponent({
	props: {
		modelValue: {
			type: [String, Number],
			required: true,
		},
		maxChars: {
			type: Number,
		},
	},
	setup(props) {
		return {
			scrollbarVisible: false,
		};
	},
	methods: {
		InputChanged(event) {
			this.$emit('update:modelValue', event.target.value);
		},
	},
	computed: {
		CharCountStyle() {
			if (this.scrollbarVisible)
				return {
					right:
						'calc(1em + ' +
						(this.$refs.input.offsetWidth -
							this.$refs.input.clientWidth) +
						'px)',
				};
			if (!this.$refs.input) return this.$refs;
			return false;
		},
	},
	watch: {
		modelValue(v, oldV) {
			if (!this.$refs.input) return false;
			this.scrollbarVisible =
				this.$refs.input.scrollHeight > this.$refs.input.clientHeight;
		},
	},
	components: { ProgressRing },
});
</script>

<template>
	<div
		class="input-container"
		:class="{ 'scrollbar-visible': scrollbarVisible }"
	>
		<textarea
			class="input"
			ref="input"
			:value="modelValue"
			@input="InputChanged"
			:maxlength="maxChars"
		/>
		<div class="char-count" :style="{ CharCountStyle }">
			<ProgressRing
				:current="modelValue.toString().length"
				:max="maxChars"
				:radius="15"
				:stroke="2"
			></ProgressRing>
			{{ modelValue.toString().length }}/{{ maxChars }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.input-container {
	position: relative;
	.input {
		padding: 0.5rem;
		font-size: 1rem;
		width: 100%;
		height: 100%;
		max-width: 100%;
		min-height: 5em;
		text-transform: uppercase;
		font-weight: 400;
		background-color: var(--color-background-mute);
		color: var(--color-heading);
		padding-left: 75px;
	}
	.char-count {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 6ch;

		left: 1em;
		top: 0.5rem;
	}
}
</style>
