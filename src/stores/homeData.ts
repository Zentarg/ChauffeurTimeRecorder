import { Tab } from '@/ViewModels/Tab';
import { defineStore } from 'pinia';

export const useHomeDataStore = defineStore({
	id: 'homeData',
	state: () => ({
		tabs: [ new Tab('v1', 'v1'), new Tab('v2', 'v2') ],
		selectedTab: undefined as unknown as Tab,
	}),
});
