<script setup lang="ts">
import { DrivingReport } from '@/ViewModels/DrivingReport';
import { reactive, ref } from 'vue';
import Report from '../components/Report.vue';
import Dropdown from '../components/Dropdown.vue';
import { Crossing } from '@/ViewModels/Crossing';
import { useDataStore } from '@/stores/data';
import { useSettingsStore } from '@/stores/settings';
import Tabs from '../components/Tabs.vue';
import { Tab } from '@/ViewModels/Tab';
import { useHomeDataStore } from '@/stores/homeData';
import { useDataV2Store } from '@/stores/datav2';
import Reportv2 from '@/components/Reportv2.vue';
import { useSettingsV2Store } from '@/stores/settingsv2';

let data = useDataStore();
let datav2 = useDataV2Store();
let settings = useSettingsStore();
let settingsv2 = useSettingsV2Store();
let homeData = useHomeDataStore();

function AddReport() {
	data.AddReport();
	data.selectedReport.name = settings.name;
	data.selectedReport.carRegNumber = settings.carRegNumber;
	data.selectedReport.salaryNumber = settings.salaryNumber;
}
function AddV2Report() {
	datav2.AddReport();
	datav2.selectedReport.name = settingsv2.name;
	datav2.selectedReport.carRegNumber = settingsv2.carRegNumber;
	datav2.selectedReport.salaryNumber = settingsv2.salaryNumber;
}
</script>

<template>
	<main>
		<Tabs :tabs="homeData.tabs" v-model="homeData.selectedTab"></Tabs>
		<template v-if="homeData.selectedTab.Key == 'v1'">
			<div class="report-selector">
	
				<h1 class="headline">Kørsels Rapport</h1>
				<div class="selector">
					<Dropdown
						v-model="data.selectedReport"
						:options="data.reports"
						:text-selectors="['date', 'reportNumber']"
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
		</template>
		<template v-else-if="homeData.selectedTab.Key == 'v2'">
			<div class="report-selector">
	
				<h1 class="headline">Kørsels Rapport</h1>
				<div class="selector">
					<Dropdown
						v-model="datav2.selectedReport"
						:options="datav2.reports"
						:text-selectors="['date', 'reportNumber']"
						label="Vælg kørselsrapport"
					></Dropdown>
					<div class="btn" @click="AddV2Report">Ny rapport</div>
					<div class="btn" @click="datav2.DeleteSelectedReport">
						Slet valgt rapport
					</div>
				</div>
			</div>
			<Reportv2
				:report="datav2.selectedReport"
				v-if="datav2.reportCount > 0 && datav2.selectedReport != undefined"
			></Reportv2>
			<div v-else>
				<h2>Vælg en kørselsrapport eller lav en ny.</h2>
			</div>

		</template>
		<template v-else>
			<h2>Vælg en version i toppen ^</h2>
		</template>
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
