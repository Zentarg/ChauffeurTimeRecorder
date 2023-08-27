import { defineStore } from 'pinia';

export const useSettingsV2Store = defineStore({
	id: 'settingsv2',
	state: () => ({
		name: '',
		carRegNumber: '',
		salaryNumber: '',
	}),
});
