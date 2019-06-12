<template functional>
    <v-card :to="`/profile/${props.profile.id}`" class="pa-3 my-3 mx-2" color="blue lighten-4">
        <v-layout row wrap>
            <v-flex xs4 d-flex>
                <v-img :src="props.profile.image" max-width="100%"/>
            </v-flex>
            <v-flex xs8 profile-info pl-3>
                <span class="subheading">{{props.profile.headline}}</span>
                <span class="body-1">{{props.profile.city}}</span>
                <span class="body-1">{{props.profile.fullname}}</span>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<style lang="scss" scoped>
    .profile-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }
</style>
