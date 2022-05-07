<script setup lang="ts">
import { DrivingReport } from '@/ViewModels/DrivingReport';
import { reactive, ref } from 'vue';
import Report from '../components/Report.vue';
import Dropdown from '../components/Dropdown.vue';
import { Crossing } from '@/ViewModels/Crossing';
import { useDataStore } from '@/stores/data';
import { useSettingsStore } from '@/stores/settings';

let data = useDataStore();
let settings = useSettingsStore();

function AddReport() {
	data.AddReport();
	data.selectedReport.name = settings.name;
	data.selectedReport.carRegNumber = settings.carRegNumber;
	data.selectedReport.salaryNumber = settings.salaryNumber;
}
</script>

<template>
	<main>
		<div class="report-selector">
			<h1 class="headline">Kørsels Rapport</h1>
			<div class="selector">
				<Dropdown
					v-model="data.selectedReport"
					:options="data.reports"
					text-selector="id"
					label="Vælg kørselsrapport"
				></Dropdown>
				<div class="btn" @click="AddReport">Ny rapport</div>
				<div class="btn" @click="data.DeleteSelectedReport">
					Slet valgt rapport
				</div>
			</div>
		</div>
		<Report
			:report="data.selectedReport"
			v-if="data.reportCount > 0 && data.selectedReport != undefined"
		></Report>
		<div v-else>
			<h2>Vælg en kørselsrapport eller lav en ny.</h2>
		</div>
	</main>
</template>

<style scoped lang="scss">
@use '../assets/mixins.scss' as m;
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
			flex-flow: column wrap;
			gap: 1rem;
			padding: 0 var(--general-x-padding) 0 3rem;
			width: calc(100% - 4rem);
			& > div {
				max-width: 100%;
			}

			@include m.tablet {
				flex-flow: row wrap;
			}
		}
	}
}
</style>
