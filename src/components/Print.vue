<template>
	<div>
		<div class="btn" @click="Print">Click me</div>
		<div ref="print" class="printContainer">
			<img
				class="backgroundImage"
				src="data:image/png;base64,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"
			/>
			<p class="box-1 box">test</p>
			<p class="box-2 box">test 2</p>
			<p class="box-3 box">test 3</p>
			<p class="box-4 box">test 4</p>
			<p class="box-5 box">test 5</p>
			<ul class="listTest">
				<li>
					<p>test1</p>
				</li>
				<li>
					<p>test2</p>
				</li>
				<li>
					<p>test3</p>
				</li>
				<li>
					<p>test4</p>
				</li>
				<li>
					<p>test5</p>
				</li>
			</ul>
			<div class="flexTest">
				<p>test 1</p>
				<p>test 2</p>
				<p>test 3</p>
				<p>test 4</p>
				<p>test 5</p>
			</div>
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
		title: {
			type: String,
			default: '',
		},
	},
	methods: {
		Print() {
			let iframe = document.createElement('iframe');
			let style = document.createElement('style');

			style.textContent = `
			@page {
				margin: 0;
				size: A4;
			}
			@media print {
				.printContainer {
					width: 21cm;
					height: 29.7cm;
					position: absolute;
					left: 0;
					top: 0;
					background: grey;
					color: white;
					-webkit-print-color-adjust: exact;
				}
				.backgroundImage {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					width: 21cm;
					height: 29.7cm;
				}
				p {
					color: black;
					font-size: 1cm;
					border-bottom: .1cm solid black;
				}

				.box {
					position: absolute;
				}

				.box-1 {
					left: 2.12cm;
					top: 4.27cm;
				}

				.box-2 {
					left: 14cm;
					top: 4.3cm;
				}

				.box-3 {
					left: 2cm;
					top: 7.5cm;
				}

				.box-4 {
					left: 6.7cm;
					top: 9.1cm;
				}

				.box-5 {
					left: 11.7cm;
					top: 7.6cm;
				}

				.listTest {
					position: absolute;
					top: 15cm;
					left: 5cm;
					list-style: none;
				}

				li {
					line-height: 1cm;
				}
				
				.flexTest {
					position: absolute;
					display: flex;
					top: 20cm;
					left: 3cm;
					flex-direction: column;
					gap: .5cm;
				}

				.flexTest p {
					margin: 0;
				}
			}
			`;

			this.$refs.iframe;
			console.log(iframe);
			this.$refs.iframe.contentWindow?.document.head.appendChild(style);
			this.$refs.iframe.contentWindow?.document.body.appendChild(
				this.$refs.print
			);

			this.$refs.iframe.contentWindow?.print();
		},
	},
	mounted() {
		console.log('Mounted Test', this.$refs.print);
		this.Print();
	},
});
</script>

<style scoped lang="scss">
.printContainer {
	width: 21cm;
	min-height: 29.7cm;
	background: blue;
}
iframe {
	width: 0;
	height: 0;
	position: absolute;
	display: none;
	top: 0;
	left: 0;
}

iframe {
	background: url('@/assets/a4Test.png');
}

.btn {
	padding: 2rem;
	align-self: left;
	background: #e3e3e3;
	color: white;
}
</style>
