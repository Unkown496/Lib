<template>
    <v-container
    >

        <v-row>
            <v-col
                cols="12"
            >
                <v-card
                    hover
                    :rounded="$vuetify.breakpoint.xsOnly ? 'md' : 'lg'"
                    
                >
                    <div class="container-title">
                        <v-card-title
                            v-show="isRegistrationForm" 
                            class="w-full info--text position-absolute-important"
                            @click="isRegistrationForm = !isRegistrationForm"
                        >
                            Регистрация 
                        </v-card-title>
                        <v-slide-y-transition appear>
                            <v-card-title
                                v-show="!isRegistrationForm" 
                                class="w-full info--text position-absolute-important"
                                @click="isRegistrationForm = !isRegistrationForm"
                            >
                                Вход 
                            </v-card-title>
                        </v-slide-y-transition>
                    </div>
                </v-card>
            </v-col>
            <v-col
                cols="12"
            >
                <v-form
                    refs="userFormLogin"
                    v-model="userFormLoginValid"
                    v-if="!isRegistrationForm"
                    action="/"
                    lazy-validation
                    @submit="validateLoginForm"
                > 
                    <v-row
                        justify-sm="center"
                    >
                        <v-col
                            cols="12"
                            sm="8"
                        >
                            <v-card>
                                <v-card-title class="font-weight-light">Вход</v-card-title>
                                <v-card-actions
                                    class="flex-column"
                                >
                                    <v-text-field
                                        solo
                                        label="Введите имя"
                                        prepend-inner-icon="mdi-account-edit"
                                        counter="120"
                                        type="text"
                                        :rules="[isFieldRequired]"
                                        name="userLogin"
                                        
                                    ></v-text-field>
                                    <v-text-field
                                        solo
                                        prepend-inner-icon="mdi-pencil-lock"
                                        label="Введите пароль"
                                        counter="120"
                                        :rules="[isFieldRequired]"
                                        :type="showPassoword ? 'text':'password'"
                                        @focus="showVisiblePasswordIcon = true"
                                        @blur="showVisiblePasswordIcon = false"
                                        name="userPasswordLogin"
                                    >
                                        <template v-slot:append>
                                            <v-fade-transition>
                                                <v-icon
                                                    v-show="showVisiblePasswordIcon"
                                                    @click="showPassoword = !showPassoword"
                                                    :color="showVisiblePasswordIcon ? 'info': ''"
                                                >
                                                    mdi-{{ showPassoword ? 'eye-off': 'eye' }}
                                                </v-icon>
                                            </v-fade-transition>
                                        </template>
                                    </v-text-field>
                                </v-card-actions>
                                <div 
                                    class="w-full d-flex justify-end justify-sm-center px-8 py-1 py-sm-2"
                                >
                                    <v-btn
                                        v-show="!userFormLoginValid"
                                        :small="$vuetify.breakpoint.xsOnly"
                                        color="info"
                                        @click="resetValidateLoginForm"
                                    >
                                        Проверить
                                    </v-btn>
                                    <v-fade-transition>
                                        <v-btn
                                            v-show="userFormLoginValid"
                                            :small="$vuetify.breakpoint.xsOnly"
                                            color="success"
                                            type="submit"
                                        >
                                            Отправить
                                        </v-btn>
                                    </v-fade-transition>   
                                </div>                  
                            </v-card>
                        </v-col>
                    </v-row>
                </v-form>
                <v-fade-transition>
                    <v-form
                        lazy-validation
                        v-if="isRegistrationForm"
                        action="/"
                        ref="userForm"
                        v-model="userFormRegistrationValid"  
                        @submit="validateUserFormRegistration"
                    >
                        <v-stepper
                            v-model="userFormSteps"
                            vertical
                        >
                            <v-stepper-step
                                step="1"
                                :rules="[() => isFieldsNotHasError]"
                                :complete="userFormSteps > 1"
                            >
                                <v-card-title>Введите данные</v-card-title>
                            </v-stepper-step>
                            <v-stepper-content
                                step="1"
                            >
                                <v-subheader class="d-none d-sm-flex">Все поля обязательны к заполенению</v-subheader>
                                    <div 
                                        class="ma-1 d-inline-flex flex-column w-fill-avalibale"
                                    >
                                        <v-text-field
                                            solo
                                            prepend-inner-icon="mdi-account-edit"
                                            label="Придумайте имя"
                                            type="text"
                                            counter="120"
                                            :rules="[isFieldRequired]"
                                            name="userLoginRegistration"
                                        ></v-text-field>
                                        <v-text-field
                                            solo
                                            clearable
                                            counter="120"
                                            prepend-inner-icon="mdi-pencil-lock"
                                            label="Придумайте пароль"
                                            :rules="[isFieldRequired]"
                                            :type="showPassoword ? 'text':'password'"
                                            @focus="showVisiblePasswordIcon = true"
                                            @blur="showVisiblePasswordIcon = false"
                                            name="userPasswordRegistration"
                                        >
                                            <template v-slot:append>
                                                <v-fade-transition>
                                                    <v-icon
                                                        v-show="showVisiblePasswordIcon"
                                                        @click="showPassoword = !showPassoword"
                                                        :color="showVisiblePasswordIcon ? 'info': ''"
                                                    >
                                                        mdi-{{ showPassoword ? 'eye-off': 'eye' }}
                                                    </v-icon>
                                                </v-fade-transition>
                                            </template>
                                        </v-text-field>
                                        <v-text-field
                                            solo
                                            prepend-inner-icon="mdi-at"
                                            label="Введите почту"
                                            type="email"
                                            :rules="[isFieldRequired, isValidEmail]"
                                            name="userEmailRegistration"
                                        ></v-text-field>
                                        <v-text-field
                                            solo
                                            prepend-inner-icon="mdi-phone"
                                            label="Введите телефон"
                                            type="tel"
                                            counter="12"
                                            :rules="[isFieldRequired, isValidTel]"
                                            name="userTelefonRegistration"
                                        ></v-text-field>
                                        <v-text-field
                                            solo
                                            prepend-inner-icon="mdi-map-marker"
                                            label="Введите адресс"
                                            type="text"
                                            :rules="[isFieldRequired]"
                                            name="userAdressRegistration"
                                        ></v-text-field>
                                        <v-btn-toggle
                                            dense
                                            class="py-2 justify-md-end bg-none-important"
                                        >
                                            <v-btn
                                                color="info darken-2"
                                                @click="nextStep"
                                            >
                                                Вперед
                                            </v-btn>
                                            <v-btn
                                                color="primary"
                                                disabled
                                                @click="userFormSteps--"
                                            >Назад</v-btn>
                                        </v-btn-toggle>
                                    </div>
                            </v-stepper-content>
                            <v-stepper-step
                                step="2"
                                :complete="userFormSteps > 2"
                            >
                                <v-card-title>Выберите загрузить ли аватарку</v-card-title>
                            </v-stepper-step>
                            <v-stepper-content
                                step="2"
                            >
                                <div 
                                    class="ma-1 d-inline-flex flex-column w-fill-avalibale"
                                >
                                    <v-btn 
                                        color="info"
                                        @click="withoutAvatar = !withoutAvatar"
                                        class="mb-8"
                                    >
                                        {{withoutAvatar ? "C аватаркой": "Без аватарки"}}
                                    </v-btn>
                                    <v-scale-transition>
                                        <!-- 
                                            v-if on field added because form validator check all field 
                                            but you don't need to validate this field for the slide transition 
                                            transition for smooth slide
                                        -->
                                        <v-file-input
                                            v-if="userFormSteps === 2 && !withoutAvatar"
                                            v-model="valueAvatarInput"
                                            solo
                                            :error="valueAvatarInput === null"
                                            :error-messages="valueAvatarInput === null ? 'Нельзя не загружать фотку': ''"
                                            show-size
                                            counter="1"
                                            label="Загрузите аватарку"
                                            truncate-length="50"
                                            prepend-icon=""
                                            prepend-inner-icon="mdi-image"
                                            :rules="fileRules"
                                            name="userAvatarRegistration"
                                        ></v-file-input>
                                    </v-scale-transition>
                                    <v-fade-transition>
                                        <v-btn-toggle
                                            v-show="!!valueAvatarInput || withoutAvatar"
                                            dense
                                            class="py-2 justify-md-end bg-none-important"
                                        >
                                            <v-btn
                                                v-if="!userFormRegistrationValid"
                                                color="info darken-2"
                                                @click="resetValidateUserForm"
                                            >
                                                Проверить
                                            </v-btn>  
                                            <v-fade-transition>  
                                                <v-btn
                                                    v-show="userFormRegistrationValid"
                                                    color="success darken-2"
                                                    type="submit"
                                                    :disabled="!userFormRegistrationValid"
                                                >
                                                    Отправить
                                                </v-btn>
                                            </v-fade-transition>
                                            <v-btn
                                                color="primary"
                                                @click="userFormSteps--"
                                            >Назад</v-btn>
                                        </v-btn-toggle>
                                    </v-fade-transition>
                                </div>
                            </v-stepper-content>                        
                        </v-stepper>
                    </v-form>
                </v-fade-transition>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: "Login",
        data: () => ({
            userFormRegistrationValid: false,
            userFormLoginValid: false,
            userFormSteps: 1,
            showPassoword: false,
            showVisiblePasswordIcon: false,
            isFieldsNotHasError: true,
            isRegistrationForm: true,
            withoutAvatar: false,
            valueAvatarInput: null,
            isFieldRequired: v => !!v || 'Поле обязательно к заполнению',
            isValidEmail: v => /.+@.+\..+/.test(v) || 'E-mail должен быть настоящим',
            isValidTel: v => /\+7\d{10}/.test(v) || /\d{1}\d{10}/.test(v) || "Проверьте правильность ввода номера",     
            fileRules: [
                value => !value || value.size < 2000000 || "Аватарка не может быть больше чем 2Мб", 
                value => /image*/.test(value.type) || "Можно загрузить только изображение",
            ],
        }),
        methods: {
            resetValidateLoginForm() {
                return this.$refs.userFormLogin.resetValidation();
            },
            validateLoginForm() {
                return this.$refs.userFormLogin.validate();
            },
            resetValidateUserForm() {
                return this.$refs.userForm.resetValidation();
            },
            validateUserFormRegistration() {
                return this.$refs.userForm.validate();
            },
            nextStep() {
                let formIsValid = this.$refs.userForm.validate();
                if(formIsValid) {
                    this.isFieldsNotHasError = true;
                    this.userFormSteps = this.userFormSteps + 1;
                    return this.userFormRegistrationValid = false;
                }
                else {
                    return this.isFieldsNotHasError = false;
                }
            },
        },
    }
</script>
<style scoped lang="scss">
    .d {
        &-contents {
            display: contents;
        }
    }
    .container {
        align-items: center;
        display: flex;
        height: 100%;
        &-title {
            width: 100%;
            height: 60px;
        }
    }
</style>