<script setup lang="ts">
import { DrivingReport } from '@/Classes/DrivingReport';
import { reactive, ref } from 'vue';
import Report from '../components/Report.vue';
import Dropdown from '../components/Dropdown.vue';
import { Crossing } from '@/Classes/Crossing';

let reports = reactive({ val: [] as DrivingReport[] });
if (reports.val.length == 0) {
	let newReport = new DrivingReport(307240, 12);
	newReport.crossings['storebælt'] = new Crossing();
	newReport.crossings['øresund'] = new Crossing();
	newReport.crossings['færge'] = new Crossing();
	reports.val.push(newReport);
}

let reportIdCounter = 307241;

let selectedReport = reactive({ val: reports.val[0] as DrivingReport });

function AddReport() {
	let newReport = new DrivingReport(reportIdCounter, 12);
	newReport.crossings['storebælt'] = new Crossing();
	newReport.crossings['øresund'] = new Crossing();
	newReport.crossings['færge'] = new Crossing();
	reports.val.push(newReport);
	reportIdCounter++;
	selectedReport.val = reports.val[reports.val.length - 1];
}
function DeleteSelectedReport() {
	reports.val = reports.val.filter((x) => {
		return x.id != selectedReport.val.id;
	});
	selectedReport.val = reports.val[reports.val.length - 1];
}
</script>

<template>
	<main>
		<div class="report-selector">
			<h1 class="headline">Kørsels Rapport</h1>
			<div class="selector">
				<Dropdown
					v-model="selectedReport.val"
					:options="reports.val"
					text-selector="id"
					label="Vælg kørselsrapport"
				></Dropdown>
				<div class="btn" @click="AddReport">Ny rapport</div>
				<div class="btn" @click="DeleteSelectedReport">
					Slet valgt rapport
				</div>
			</div>
		</div>
		<Report
			:report="selectedReport.val"
			v-if="reports.val.length > 0 && selectedReport.val != undefined"
		></Report>
		<div v-else>
			<h2>Vælg en kørselsrapport eller lav en ny.</h2>
		</div>
	</main>
</template>

<style scoped lang="scss">
main {
	padding: var(--general-padding);
	display: flex;
	flex-direction: column;
	gap: 2rem;

	.report-selector {
		display: flex;
		flex-direction: column;
		gap: 2rem;

		.headline {
			line-height: 1em;
		}

		.selector {
			display: flex;
			flex-flow: row wrap;
			gap: 1rem;
		}
	}
}
</style>
