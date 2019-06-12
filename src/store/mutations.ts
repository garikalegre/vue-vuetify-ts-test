import mutationsType from './storeConstatns';
import {AppState, PayloadProfile, PayloadProfileList, PayloadSectorsList, ProfileListItem} from '../models';

export const mutations = {
    [mutationsType.PROFILES_LIST_LOADING](state: AppState, payload: boolean) {
        state.ProfilesListState.loading = payload;
    },
    [mutationsType.PROFILE_LOADING](state: AppState, payload: boolean) {
        state.ProfileState.loading = payload;
    },
    [mutationsType.FILTERS_LOADING](state: AppState, payload: boolean) {
        state.FilterState.loading = payload;
    },
    [mutationsType.CLEAR_PROFILES_LIST_STATE](state: AppState) {
        state.ProfilesListState = {
            loading: false,
            profilesList: [],
            search: {
                industryId: 10,
                forOrgId: 1000,
                hasNext: true,
                skip: 0,
                take: 5,
            },
        };
    },
    [mutationsType.CLEAR_PROFILE_STATE](state: AppState) {
        state.ProfileState = {
            loading: false,
            profile: null,
        };
    },
    [mutationsType.CLEAR_FILTERS_STATE](state: AppState) {
        state.FilterState = {
            loading: false,
            filters: [],
            selected: {},
        };
    },
    [mutationsType.SAVE_PROFILES_LIST](state: AppState, payload: PayloadProfileList) {
        const items: ProfileListItem[] = [];
        let imageUrl: string | null = null;
        if (payload && payload.items) {
            payload.items.forEach((item: any ): void => {
                if (item.seekerVideos && item.seekerVideos.length) {
                    imageUrl = item.seekerVideos[0].video.vidThumbUriComputed;
                }
                items.push({
                    id: item.id,
                    city: item.city.id,
                    headline: item.headline,
                    fullname: `${item.firstname} ${item.lastname}`,
                    image: imageUrl,
                });
            });
            state.ProfilesListState.search.hasNext = payload.hasNext;
        }
        state.ProfilesListState.profilesList = items;
    },
    [mutationsType.SAVE_PROFILE](state: AppState, payload: PayloadProfile) {
        state.ProfileState.profile = {
            id: payload.id,
            city: payload.city.id,
            headline: payload.headline,
            fullname: `${payload.firstname} ${payload.lastname}`,
            image: null,
            video: null,
        };
        if (payload.seekerVideos && payload.seekerVideos.length) {
            state.ProfileState.profile.video = payload.seekerVideos[0].video.vidUri;
            state.ProfileState.profile.image = payload.seekerVideos[0].video.vidThumbUriComputed;
        }
    },
    [mutationsType.SAVE_FILTERS](state: AppState, payload: PayloadSectorsList[]) {
        state.FilterState.filters = payload;
        state.FilterState.filters.unshift({
            id: 10,
            title: 'Parent industry (All Sectors)',
            parent: null,
            children: null,
            nodeLevel: 1,
        });
    },
    [mutationsType.REMOVE_FILTER](state: AppState) {
        state.FilterState.selected = {};
        state.ProfilesListState.search.industryId = 10;
    },
    [mutationsType.SAVE_SELECTED_FILTER](state: AppState, payload: number) {
        state.FilterState.selected = state.FilterState.filters.find(
            (filter: PayloadSectorsList) => payload === filter.id,
        );
        state.ProfilesListState.search.industryId = payload;
    },
    [mutationsType.INCREMENT_SEARCH_PAGE](state: AppState) {
        if (state.ProfilesListState.search.hasNext) {
            state.ProfilesListState.search.skip += 5;
        }
    },
    [mutationsType.UPDATE_PROFILES_LIST](state: AppState, payload: PayloadProfileList) {
        let imageUrl: string = '';
        if (payload && payload.items) {
            payload.items.forEach((item) => {
                if (item.seekerVideos && item.seekerVideos.length) {
                    imageUrl = item.seekerVideos[0].video.vidThumbUriComputed;
                }
                state.ProfilesListState.profilesList.push({
                    id: item.id,
                    city: item.city.id,
                    headline: item.headline,
                    fullname: `${item.firstname} ${item.lastname}`,
                    image: imageUrl,
                });
            });
            state.ProfilesListState.search.hasNext = payload.hasNext;
        }
    },
};
