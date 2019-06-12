import {AppState, PayloadSectorsList, ProfileListItem, ProfileType} from '../models';

export const getters = {
    profilesList: (state: AppState): ProfileListItem[] => {
        return state.ProfilesListState.profilesList;
    },
    profileItem: (state: AppState): ProfileType | null => {
        return state.ProfileState.profile;
    },
    filtersList: (state: AppState): PayloadSectorsList[] | object => {
        return state.FilterState.filters;
    },
    searchParams: (state: AppState): object => {
        return state.ProfilesListState.search;
    },
    selectedFilter: (state: AppState): object => {
        return state.FilterState.selected;
    },
    profilesLoading: (state: AppState): boolean => {
        return state.ProfilesListState.loading;
    },
};
