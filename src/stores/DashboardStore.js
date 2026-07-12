import { observable, action, computed, makeObservable, runInAction } from 'mobx';
import { supabase } from '../services/supabaseClient';

export class DashboardStore {
    surveys = [];
    searchQuery = '';
    selectedCategory = 'all'
    isLoading = false;

    constructor() {
        makeObservable(this, {
            surveys: observable,
            searchQuery: observable,
            selectedCategory: observable,
            isLoading: observable,
            setSearchQuery: action,
            setSelectedCategory: action,
            fetchSurveys: action,
            filteredSurveys: computed
        });
    }

    setSearchQuery(query) {
        this.searchQuery = query;
    }

    setSelectedCategory(category) {
        this.selectedCategory = category;
    }

    async fetchSurveys() {
        this.isLoading = true;
        try {
            const { data, error } = await supabase
                .from('surveys')
                .select('*');
            if (error) throw error;

            runInAction(() => {
                this.surveys = data || [];
            });
        } catch (err) {
            console.error('Error fetching surveys:', err.message);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    get filteredSurveys() {
        return this.surveys.filter(survey => {
            const matchesCategory = this.selectedCategory === 'all' || survey.category === this.selectedCategory;
            const matchesSearch = survey.title?.toLowerCase().includes(this.searchQuery.toLowerCase()) || false;
            return matchesCategory && matchesSearch;
        });
    }
}

export const dashboardStore = new DashboardStore();