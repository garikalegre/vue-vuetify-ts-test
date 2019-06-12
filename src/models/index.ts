import {Vue} from 'vue/types/vue';

export interface ProfileListItem  {
    id: number;
    city: string;
    headline: string;
    fullname: string;
    image: string | null;
}

export interface ProfileType {
    id: number;
    city: string;
    headline: string;
    fullname: string;
    image: string | null;
    video: string | null;
}
export interface PayloadSectorsList {
    parent: number | null;
    children: number | null;
    id: number;
    title: string;
    nodeLevel: number;
    find?: () => void;
    unshift?: () => void;
}
export interface PayloadProfile {
    id: number;
    industry: object;
    city: {
        countryCode: string,
        id: string,
        name: string,
        geoLocation: object,
        isActive: boolean,
    };
    headline: string;
    jobTypes: any[];
    firstname: string;
    lastname: string;
    fullname: string;
    currentlyOpen: boolean;
    isViewable: boolean;
    seekerVideos: [
        {
            skrId: number,
            vidId: number,
            isPublic: boolean,
            isPrimary: boolean,
            order: number,
            video: {
                vidId: number,
                vidUri: string | null,
                vidThumbUriComputed: string | null,
                vidTitle: string,
                vidStatusId: number,
                vidStatusTitle: string,
            },
        },
        ];
    context: object;
    languages: any[];
}
export interface PayloadProfileList {
    items: [
        {
            id: number,
            industry: {
                parent: {
                    parent: number | null,
                    children: number | null,
                    id: number,
                    title: string,
                    nodeLevel: number,
                },
                children: number | null,
                id: number,
                title: string,
                nodeLevel: number,
            },
            city: {
                countryCode: string,
                id: string,
                name: string,
                geoLocation: {
                    latitude: number,
                    longitude: number,
                },
                isActive: boolean,
            },
            headline: string,
            jobTypes: any[],
            firstname: string,
            lastname: string,
            fullname: string,
            currentlyOpen: boolean,
            isViewable: boolean,
            seekerVideos: [
                {
                    skrId: number,
                    vidId: number,
                    isPublic: boolean,
                    isPrimary: boolean,
                    order: number,
                    video: {
                        vidId: number,
                        vidUri: string,
                        vidThumbUriComputed: string,
                        vidTitle: string,
                        vidStatusId: number,
                        vidStatusTitle: string,
                    },
                },
            ],
            context: {
                labels: any[],
                threads: any[],
            },
            languages: any[],
        },
    ];
    hasPrevious: boolean;
    hasNext: boolean;
    skipped: number;
    taken: number;
}
export interface AppState {
    ProfilesListState: {
        loading: boolean,
        profilesList: ProfileListItem[] | any[],
        search: {
            industryId: number,
            forOrgId: number,
            hasNext: boolean,
            skip: number,
            take: number,
        },
    };
    ProfileState: {
        loading: boolean,
        profile: ProfileType | null,
    };
    FilterState: {
        loading: boolean,
        filters: PayloadSectorsList[] | any,
        selected: object,
    };
}
export type VForm = Vue & { reset: () => void  };
