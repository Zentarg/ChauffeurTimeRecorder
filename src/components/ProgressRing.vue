<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		current: {
			type: Number,
		},
		max: {
			type: Number,
		},
		radius: {
			type: Number,
		},
		stroke: {
			type: Number,
		},
	},
	setup(props) {
		const nornamlizedRadius = props.radius - props.stroke * 2;
		const circumference = nornamlizedRadius * 2 * Math.PI;
		return {
			nornamlizedRadius: nornamlizedRadius,
			circumference: circumference,
		};
	},
	computed: {
		StrokeDashOffset() {
			return (
				this.circumference -
				(this.current / this.max) * this.circumference
			);
		},
	},
});
</script>

<template>
	<div
		class="progress-container"
		:style="{ width: radius * 2 + 'px', height: radius * 2 + 'px' }"
	>
		<svg :height="radius * 2" :width="radius * 2">
			<circle
				stroke="currentColor"
				fill="transparent"
				:stroke-dasharray="circumference + ' ' + circumference"
				:style="{ 'stroke-dashoffset': StrokeDashOffset }"
				:stroke-width="stroke"
				:r="nornamlizedRadius"
				:cx="radius"
				:cy="radius"
			/>
		</svg>
		<svg :height="radius * 2" :width="radius * 2" class="backdrop">
			<circle
				stroke="currentColor"
				fill="transparent"
				:stroke-dasharray="circumference + ' ' + circumference"
				:stroke-width="stroke"
				:r="nornamlizedRadius"
				:cx="radius"
				:cy="radius"
			/>
		</svg>
	</div>
</template>

<style scoped lang="scss">
.progress-container {
	position: relative;
	transform: rotate(-90deg);
	svg {
		position: absolute;

		&.backdrop {
			opacity: 0.5;
		}
	}
}
</style>
