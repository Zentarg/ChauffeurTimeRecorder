<template>
	<div>
		<div ref="print" class="print-container">
			<slot name="print"></slot>
		</div>
		<iframe ref="iframe"></iframe>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	setup() {
		return {};
	},
	props: {
		printStyle: {
			type: String,
			default: '',
		},
	},
	methods: {
		Print() {
			let style = document.createElement('style');
			style.textContent = this.printStyle;
			this.$refs.iframe.contentWindow.document.head.innerHTML = '';
			this.$refs.iframe.contentWindow.document.body.innerHTML = '';
			this.$refs.iframe.contentWindow.document.head.appendChild(style);
			this.$refs.iframe.contentWindow.document.body.appendChild(
				this.$refs.print.cloneNode(true)
			);

			this.$refs.iframe.contentWindow?.print();
		},
	},
});
</script>

<style scoped lang="scss">
.print-container {
	width: 21cm;
	height: 29.7cm;
	position: absolute;
	left: 0;
	top: 0;
	background: grey;
	color: white;
	-webkit-print-color-adjust: exact;
	display: none;
}
iframe {
	display: none;
	width: 21.1cm;
	height: 29.8cm;
}
</style>
