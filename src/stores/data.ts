import { DrivingReport } from './../ViewModels/DrivingReport';
import { defineStore } from 'pinia';
import { Crossing } from '@/ViewModels/Crossing';

export const useDataStore = defineStore({
	id: 'data',
	state: () => ({
		reports: [] as DrivingReport[],
		selectedReport: undefined as unknown as DrivingReport,
		reportIdCounter: 307241,
	}),
	getters: {
		reportCount: (state) => state.reports.length,
	},
	actions: {
		AddReport() {
			let newReport = new DrivingReport(this.reportIdCounter, 12);
			newReport.crossings['storebælt'] = new Crossing();
			newReport.crossings['øresund'] = new Crossing();
			newReport.crossings['færge'] = new Crossing();
			const index = this.reports.push(newReport) - 1;
			this.reportIdCounter++;
			this.selectedReport = this.reports[index];
		},
		DeleteSelectedReport() {
			this.reports = this.reports.filter((x) => {
				return x.id != this.selectedReport.id;
			});
			this.selectedReport = this.reports[this.reports.length - 1];
		},
	},
});
