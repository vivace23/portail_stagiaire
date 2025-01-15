<script lang="ts" setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

axios.defaults.withCredentials = true;

    //pour la route
    const router = useRouter();


    const loadingState = ref<Boolean>(false);
    const errorModal = ref<Boolean>(false);

    const msgErrorTraitement = ref<string>("");

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

    // fonction pour se connecter
    const login = async ()=>{

        // pour verifier que le champ username n'est pas vide
        if(loginData.username==''){
            inputState.username = true,
            msgInput.username ="Veuillez renseigner votre email"
        }else{
            inputState.username = false
        }

        // pour verifier que le champ password n'est pas vide
        if(loginData.password==''){
            inputState.password = true,
            msgInput.password ="Veuillez renseigner votre mot de passe"
        }else{
            inputState.password = false
        }

        // pour verifier que aucune case n'est vide
        if(
            Object.values(inputState).every(value => value === false)
        ){
            loadingState.value =true;

            // pour verifier les données saisie à celles de la base de donnée
            try {
                
                const auth = await axios.get("http://localhost:3000/loginAdmin/authBackoffice/",
                    {params : {username : loginData.username, password :loginData.password}}
                );

                if(auth.data['loggedIn']==false){
                    if(auth.data['error']){
                        // pour arreter le loading de connexion
                        loadingState.value = false;

                        // pour afficher le modal d'arreur
                        errorModal.value = true;

                        // pour afficher le message de l'erreur
                        msgErrorTraitement.value = "une erreur s'est produite désolé "+auth.data['error']['code']
                    }else{
                        // pour arreter le loading de connexion
                        loadingState.value = false;

                        // pour afficher le modal d'arreur
                        errorModal.value = true;

                        // pour afficher le message de l'erreur
                        msgErrorTraitement.value = "username ou mot de passe incorrect"
                    }
                }else{
                    // pour arreter le loading de connexion
                    loadingState.value = false;

                    // pour la redirection vers la page dashboard
                    router.push("/dashboard");
                }

            } catch (error) {
                loadingState.value = false;

                // pour afficher le modal d'arreur
                errorModal.value = true;

                // pour afficher le message de l'erreur
                msgErrorTraitement.value = "une erreur s'est produite "+ error
            }
        }
    }

</script>


<template>
    <div class="maDiv">
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class=" d-flex items-align-center col-5 py-5 px-5 card  shadow rounded-4 mt-2 border-none">
                <div>
                    <div class="d-flex justify-content-center">
                        <img style="width: 100px" src="../assets/logo.png" alt="Element logo" />
                    </div>
                    <div class="d-flex justify-content-center">
                        <p class="h2 font-monospace">PORTAIL STAGIAIRE</p>
                    </div>
                    <div class="col-auto">

                        <div class="d-flex align-items-center my-3">
                            <div class="flex-grow-1 border-bottom"></div>
                            <p class="h3 fw-light text-center mx-3">connexion admin</p>
                            <div class="flex-grow-1 border-bottom"></div>
                        </div>

                        <!-- champ du username -->
                        <div class="d-grid my-4">
                            <label class="fw-light">Nom d'utilisateur</label>
                            <el-input v-model="loginData.username" />
                            <p v-if="inputState.username" class="text-danger" >{{ msgInput.username }}</p>
                        </div>

                        
                        <!-- champ du mot de passe -->
                        <div class="d-grid my-4">
                            <label class="fw-light">Mot de passe</label>
                            <el-input v-model="loginData.username" />
                            <p v-if="inputState.username" class="text-danger" >{{ msgInput.username }}</p>
                        </div>


                        <p v-if="msgErrorTraitement != ''" class="text-danger" >{{ msgErrorTraitement }}</p>

                        <div class="d-grid mt-5" >
                            <button class="btn btn-primary rounded-4" @click="login">Se connecter</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <!-- modal pour le loading de la connexion -->
        <div>
            <el-dialog   v-model="loadingState" :align-center="true" width="200" :close-on-click-modal="false" :show-close="false">
                <div class="row tw-p-1">
                    <div class="spinner-border col-auto" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="col">Connexion en cours...</div>
                </div>
            </el-dialog>
        </div>

        <!-- modal pour informer si il y a eu une erreur -->
        <div>
            <el-dialog   v-model="errorModal" :align-center="true" width="200" :close-on-click-modal="false" :show-close="false">
                <p>{{ msgErrorTraitement }}</p>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="errorModal = false">fermer</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>

    </div>


</template>

<style>
    html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    }
    .maDiv {
    height: 100vh;
    margin: 0;
    background: 
        linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7)), /* Dégradé semi-transparent */
        url('../assets/devanture.jpeg'); /* Image de fond */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    }

</style>