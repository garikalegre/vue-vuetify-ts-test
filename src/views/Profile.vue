<template>
    <v-card max-width="600" class="ma-2 pa-3">
        <v-btn to="/home" icon><v-icon>arrow_back</v-icon></v-btn>
        <div>
            <video ref="videoRef" :src="profile.video" width="100%" controls></video>
        </div>
        <v-card-title primary-title>
            <div class=" profile-info ">
                <span class="subheading">{{profile.headline}}</span>
                <span class="body-1">{{profile.city}}</span>
                <span class="body-1">{{profile.fullname}}</span>
            </div>
        </v-card-title>
    </v-card>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {ProfileType} from '@/models';

    export default Vue.extend({
        name: 'profile',
        created() {
            this.$store.dispatch('getProfile',
                {
                    Id: Number(this.$route.params.id),
                    forOrgId: 1000,
                    includeVideos: true,
                });
        },
        computed: {
            profile(): ProfileType | null {
                return this.$store.getters.profileItem;
            },
        },
        beforeDestroy() {
            this.$store.dispatch('clearProfile');
        },
    });
</script>

<style lang="scss" scoped>
    .profile-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
</style>
