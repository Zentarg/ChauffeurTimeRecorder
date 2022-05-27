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
			let prevTitle = document.title;
			let currentDate = new Date();
			let day, month, year;
			day = currentDate.getDate();
			month = currentDate.getMonth() + 1;
			year = currentDate.getFullYear().toString().slice(2, 4);
			if (day < 10) day = '0' + day;
			if (month < 10) month = '0' + month;
			document.title = `${day}${month}${year}`;

			let style = document.createElement('style');
			style.textContent = this.printStyle;
			let title = document.createElement('title');
			title.textContent = "test";
			this.$refs.iframe.contentWindow.document.head.innerHTML = '';
			this.$refs.iframe.contentWindow.document.body.innerHTML = '';
			this.$refs.iframe.contentWindow.document.head.appendChild(style);
			this.$refs.iframe.contentWindow.document.body.appendChild(
				this.$refs.print.cloneNode(true)
			);
			this.$refs.iframe.contentWindow?.print();
			
			document.title = prevTitle;
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
