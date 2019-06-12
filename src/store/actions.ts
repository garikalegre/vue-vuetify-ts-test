import api from '../api';
import mutationsType from './storeConstatns';
import {ActionContext} from 'vuex';
import {AppState} from '@/models';

export const actions = {
    getProfilesList(context: ActionContext<AppState, any>) {
        context.state.ProfilesListState.search.skip = 0;
        api.setJobSeekerProfiles(context.getters.searchParams)
            .then((response) => {
                context.commit(mutationsType.PROFILES_LIST_LOADING, true);
                if (response && response.data && response.data.body) {
                    context.commit(mutationsType.SAVE_PROFILES_LIST, response.data.body);
                }
                context.commit(mutationsType.PROFILES_LIST_LOADING, false);
            })
            .catch((response) => {
                window.console.log(response);
            });
    },
    getProfile(context: ActionContext<AppState, any>, params: object) {
        api.jobSeekerProfile(params)
            .then((response) => {
                context.commit(mutationsType.PROFILE_LOADING, true);
                if (response && response.data && response.data.body) {
                    context.commit(mutationsType.SAVE_PROFILE, response.data.body);
                }
                context.commit(mutationsType.PROFILE_LOADING, false);
            })
            .catch((response) => {
                window.console.log(response);
            });
    },
    getFilters(context: ActionContext<AppState, any>) {
        api.getListOfSectors()
            .then((response) => {
                context.commit(mutationsType.FILTERS_LOADING, true);
                if (response && response.data && response.data.body) {
                    context.commit(mutationsType.SAVE_FILTERS, response.data.body);
                }
                context.commit(mutationsType.FILTERS_LOADING, false);
            })
            .catch((response) => {
                window.console.log(response);
            });
    },
    clearProfile(context: ActionContext<AppState, any>) {
        context.commit(mutationsType.CLEAR_PROFILE_STATE);
    },
    removeFilter(context: ActionContext<AppState, any>) {
        context.commit(mutationsType.REMOVE_FILTER);
    },
    saveSelectedFilter(context: ActionContext<AppState, any>, payload: number) {
        context.commit(mutationsType.SAVE_SELECTED_FILTER, payload);
    },
    loadMoreProfiles(context: ActionContext<AppState, any>) {
        context.commit(mutationsType.INCREMENT_SEARCH_PAGE);
        api.setJobSeekerProfiles(context.getters.searchParams)
            .then((response) => {
                context.commit(mutationsType.PROFILES_LIST_LOADING, true);
                if (response && response.data && response.data.body) {
                    context.commit(mutationsType.UPDATE_PROFILES_LIST, response.data.body);
                }
                context.commit(mutationsType.PROFILES_LIST_LOADING, false);
            })
            .catch((response) => {
                window.console.log(response);
            });
    },
};
