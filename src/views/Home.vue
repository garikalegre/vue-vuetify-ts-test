<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-toolbar flat>Seekers</v-toolbar>
        </v-flex>
        <v-flex xs10 ml-2>
            <div class="input-field">
                <div>
                    <v-chip
                            close
                            class="chip--select-multi"
                            @input="remove()"
                            v-if="Boolean(Object.keys(selectedFilter).length)"
                    >
                        {{ selectedFilter.title }}
                    </v-chip>
                </div>
                <div>
                    <v-btn icon @click.stop="dialog = true">
                        <v-icon>arrow_drop_down</v-icon>
                    </v-btn>
                </div>
            </div>
        </v-flex>
        <v-flex xs1>
            <v-btn :disabled="profilesLoading" dark color="primary" icon @click="searchProfiles()">
                <v-icon>search</v-icon>
            </v-btn>
        </v-flex>
        <v-flex xs12 sm6 md5 lg4 v-for="item in profileListItems" :key="item.id">
            <profile-card :profile="item"/>
        </v-flex>
        <v-flex xs12>
            <p class="subheading text-xs-center mt-4" v-if="!profileListItems.length">Empty result in sector</p>
        </v-flex>
        <v-flex xs12>
            <v-btn :disabled="!searchParams.hasNext || profilesLoading" class="mx-auto" color="primary"
                   @click="loadMore()" outline block>Load More
            </v-btn>
        </v-flex>
        <v-dialog v-model="dialog" fullscreen hide-overlay>
            <div class="modal-header mx-3">
                <span class="subheading">Choose sector</span>
                <div>
                    <v-btn dark color="red" @click="cancelDialog()" icon>
                        <v-icon>clear</v-icon>
                    </v-btn>
                    <v-btn dark color="green" @click="saveSelected()" icon>
                        <v-icon>done</v-icon>
                    </v-btn>
                </div>
            </div>
            <v-form ref="form">
                <v-autocomplete
                        @change="selectedSeeker($event)"
                        :items="filters"
                        chips
                        placeholder="Choose sectors"
                        item-text="title"
                        item-value="id"
                        class="mx-3"
                >
                    <template v-slot:selection="data">
                        <v-chip
                                close
                                class="chip--select-multi"
                                @input="() => {$refs.form.reset()}"
                        >
                            {{ data.item.title }}
                        </v-chip>
                    </template>
                    <template v-slot:item="data">
                        <template>
                            <v-list-tile-content>
                                <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
                            </v-list-tile-content>
                        </template>
                    </template>
                </v-autocomplete>
            </v-form>
        </v-dialog>
    </v-layout>
</template>

<script lang="ts">
    import Vue from 'vue';
    import ProfileCardItem from '@/components/Home/ProfileCardItem.vue';
    import {PayloadSectorsList, ProfileListItem, VForm} from '@/models';

    export default Vue.extend({
        name: 'home',
        components: {
            'profile-card': ProfileCardItem,
        },
        data() {
            return {
                dialog: false,
                selectedId: 10,
            };
        },
        created(): void {
            this.$store.dispatch('getProfilesList');
            this.$store.dispatch('getFilters');
        },
        computed: {
            profileListItems(): ProfileListItem[] {
                return this.$store.getters.profilesList;
            },
            filters(): PayloadSectorsList[] | object {
                return this.$store.getters.filtersList;
            },
            searchParams(): object {
                return this.$store.getters.searchParams;
            },
            selectedFilter(): object {
                return this.$store.getters.selectedFilter;
            },
            profilesLoading(): boolean {
                return this.$store.getters.profilesLoading;
            },
            form(): VForm {
                return this.$refs.form as VForm;
            },
        },
        methods: {
            loadMore() {
                this.$store.dispatch('loadMoreProfiles');
            },
            remove() {
                this.$store.dispatch('removeFilter');
            },
            selectedSeeker(value: number) {
                this.selectedId = value;
            },
            saveSelected() {
                this.dialog = false;
                this.form.reset();
                this.$store.dispatch('saveSelectedFilter', this.selectedId);
            },
            searchProfiles() {
                this.$store.dispatch('getProfilesList');
            },
            cancelDialog() {
                this.form.reset();
                this.dialog = false;
            },
        },
    });
</script>

<style lang="scss" scoped>
    .input-field {
        border: 1px solid black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 20px;
        width: 100%;
    }

    /deep/ .v-dialog {
        background-color: white;

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
