<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { UserFilled } from '@element-plus/icons-vue';

axios.defaults.withCredentials = true;

    //pour la route
    const router = useRouter();


    const loadingState = ref<Boolean>(false);
    const errorModal = ref<Boolean>(false);

    const msgErrorTraitement = ref<string>("");

    // pour la recherche des stagiaires
    const searchInput = ref<string>("");

    // pour la liste des stagiaires
    const tableData = [
        {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },{
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },{
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
        {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
        },
    ];

    const serviceSelected = ref('')
    const listServices = [
        {
            value: 'Option1',
            label: 'Option1',
        },
        {
            value: 'Option2',
            label: 'Option2',
            disabled: true,
        },
        {
            value: 'Option3',
            label: 'Option3',
        },
        {
            value: 'Option4',
            label: 'Option4',
        },
        {
            value: 'Option5',
            label: 'Option5',
        },
        {
        value: 'Option6',
        label: 'Option6',
        },
        {
            value: 'Option7',
            label: 'Option7',
        },
    
    ]

    // pour les données de connexion
    const loginData = reactive({
        username: '',
        password: ''
    })

    // pour verifier que les inout sont pas vides
    const inputState = reactive({
        username: false,
        password: false
    })

    // le message d'erreur pour les cases
    const msgInput = reactive({
        username: '',
        password: ''
    })

</script>


<template>
    <div class="container tw-bg-gray-50 vh-100 mb-5 pb-5">
        <!-- pour la barre du profil de l'admin -->
        <div class="card tw-shadow-xl mt-3 rounded border-0 px-2 py-2">
            <div class="d-flex justify-content-between align-items-center">
                <div class="col-2">
                    <img src="../assets/logo.png" alt="" width="75" height="75">
                    <p class="font-monospace">PORTAIL STAGIAIRES</p>
                </div>
                <div>
                    <el-dropdown placement="bottom" class="px-2">
                        <div class="d-flex align-items-center px-2 py-0">
                            admin &nbsp;
                            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item> Se déconnecter</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>

            </div>
        </div>

        <!-- pour le bouton d'ajout d'un nouveau stagiaire -->
        <div class="d-flex justify-content-end mt-3">
            <el-button class="tw-shadow-xl" type="primary" round>Ajouter un stagiaire</el-button>
        </div>
        <!-- pour la liste des stagiaires et le nombre de stagiaire par service -->
         <div class="row mt-3">
            <!-- pour la liste des stagiaires -->
            <div class="col-8 ">
                <div class="card tw-shadow-xl mt-3 rounded border-0 px-3 py-3 mr-3">

                    <p class="h4 tw-font-serif">Liste des stagiaires</p>

                    <!-- pour la barre de recherche des stagiaires -->
                    <div class="d-flex justify-content-between mb-3">
                        <el-input placeholder="Rechercher un stag" prefix-icon="el-icon-search" clearable v-model="searchInput" class="w-50"></el-input>

                        <!-- pour filter en fonction des services -->
                        <el-select v-model="serviceSelected" placeholder="Select" style="width: 240px">
                            <el-option v-for="item in listServices" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
                        </el-select>
                    </div>

                    <!-- tableau des stagiaires -->
                    <div class="table-responsive mb-3">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column prop="date" label="Date" width="180" />
                            <el-table-column prop="name" label="Name" width="180" />
                            <el-table-column prop="address" label="Address" />
                        </el-table>
                    </div>

                </div>
            </div>

            <!-- pour le nombre de stagiaire par service -->
            <div class="col-4  card tw-shadow-xl mt-3 rounded border-0 px-3 py-3" style="height: 300px;">
                <p class="h4 tw-font-serif">Liste des stagiaires par services</p>
            </div>
         </div>
    </div>
</template>

<style scoped>
    .col-8-custom {
        height: auto; /* ou une hauteur spécifique comme '500px' */
    }

    .col-4-custom {
        height: auto; /* ou une hauteur spécifique comme '300px' */
    }
</style>