import {AppState} from '../models';

export const state: AppState = {
    ProfilesListState: {
        loading: false,
        profilesList: [],
        search: {
            industryId: 10,
            forOrgId: 1000,
            hasNext: true,
            skip: 0,
            take: 5,
        },
    },
    ProfileState: {
        loading: false,
        profile: null,
    },
    FilterState: {
        loading: false,
        filters: [],
        selected: {},
    },
};
