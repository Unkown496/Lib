<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="4"
                            >
                                <v-card hover>
                                    <v-card-actions>
                                        <v-avatar
                                            tile
                                            height="100%"
                                            width="100%"
                                            color="primary"
                                        >
                                            <v-img
                                                :src="userInfo.avatar"
                                            ></v-img>
                                        </v-avatar>
                                    </v-card-actions>
                                    <v-card-subtitle class="font-weight-bold">Логин: {{userInfo.login}}</v-card-subtitle>
                                    <v-card-text class="font-weight-bold">Email: {{ userInfo.email }}</v-card-text>        
                                </v-card>
                            </v-col>
                            <!-- check -->
                            <v-col
                                cols="12"
                                sm="auto"
                                class="d-none d-sm-flex flex-grow-1 align-sm-center"
                            >
                                <v-card
                                    class="flex-grow-1 h-max-content"
                                >
                                    <v-list
                                        class="flex-grow-1" 
                                    >
                                        <v-list-group
                                            prepend-icon="mdi-account"
                                        >
                                            <!-- For User Info(activity) -->
                                            <template v-slot:activator>
                                                <v-list-item-title class="text-non-space">Информация об аккаунте</v-list-item-title>
                                            </template>
                                            <v-list-item>
                                                <v-list-item-actions>
                                                    <v-list-item-subtitle class="px-1 text-start">Активность часов:</v-list-item-subtitle>
                                                    <v-progress-circular
                                                        :rotate="75"
                                                        :value="userInfo.hoursActivity"
                                                        size="45"
                                                        width="5"
                                                        color="info"
                                                    >
                                                        {{ userInfo.hoursActivity }}
                                                    </v-progress-circular>
                                                </v-list-item-actions>
                                            </v-list-item>
                                        </v-list-group>
                                        <v-list-group
                                            prepend-icon="mdi-book-check-outline"
                                        >
                                            <!-- For readeble books -->
                                            <template v-slot:activator>
                                                <v-list-item-title class="text-non-space">Прочитанные книги</v-list-item-title>
                                            </template>
                                            <v-list-item
                                                v-for="item in userInfo.readsBooks"
                                                :key="item"
                                                link
                                            >
                                                <v-list-item-avatar>
                                                    <v-img
                                                        :src="item.cover"
                                                    ></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                    <v-list-item-subtitle>{{ item.author }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-group>
                                        <v-list-group
                                            prepend-icon="mdi-bookshelf"
                                        >
                                            <!-- For purchased books -->
                                            <template v-slot:activator>
                                                <v-list-item-title class="text-non-space">Купленные книги</v-list-item-title>
                                            </template>
                                            <v-list-item
                                                v-for="item in userInfo.purchasedBooks"
                                                :key="item"
                                                link
                                            >
                                                <v-list-item-avatar>
                                                    <v-img
                                                        :src="item.cover"
                                                    ></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                    <v-list-item-subtitle>{{ item.author }}</v-list-item-subtitle>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-group> 
                                        <v-list-group
                                            prepend-icon="mdi-book-arrow-right-outline"
                                        >
                                            <!-- For dilivered books -->
                                            <template v-slot:activator>
                                                <v-list-item-title class="text-non-space">Доставка</v-list-item-title>
                                            </template>
                                            <v-list-item
                                                v-for="item in userInfo.deliveredBooks"
                                                :key="item"
                                                link
                                            >
                                                <v-list-item-avatar>
                                                    <v-img
                                                        :src="item.cover"
                                                    ></v-img>
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                    <v-list-item-subtitle>{{ item.author }}</v-list-item-subtitle>
                                                    <v-list-item-actions>
                                                        <v-subheader
                                                            class="pl-sm-1"
                                                        >
                                                            Статус доставки:
                                                            <span
                                                                class="mx-1"
                                                                :class="{'success--text': item.status === 100}"
                                                            >{{ item.status === 100 ? 'Доставлено': 'В пути' }}</span>
                                                            <v-icon class="px-1">mdi-{{ item.status === 100 ? 'package-variant-closed-check' : 'truck-delivery-outline' }}</v-icon>
                                                        </v-subheader>
                                                        <v-progress-linear
                                                            :value="item.status"
                                                            :buffer-value="item.status"
                                                            :color="item.status === '100' ? 'success': 'info'"
                                                            class="transitions"
                                                            stream
                                                        >
                                                        </v-progress-linear>
                                                    </v-list-item-actions>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-group>                                                               
                                    </v-list>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                    
                    <v-divider></v-divider>
                        <v-btn
                            icon
                            text
                            tile
                            block
                            @click="isOpenUserInfo = !isOpenUserInfo"
                            class="d-block d-sm-none"
                        >
                            <div 
                                class="v-btn__content"
                                :class="{'translate-x-start': !isOpenUserInfo }"
                            >
                                <v-icon>{{ isOpenUserInfo ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </div>
                        </v-btn>
                    <v-divider v-show="isOpenUserInfo"></v-divider>
                    <v-card-actions
                        v-show="isOpenUserInfo"
                        class="flex-column transitions hidden-sm-only"
                    >
                        <v-expand-transition>    
                            <div
                                v-show="isOpenUserInfo"
                                class="hidden-sm-only"
                                :class="{ 'd-contents': isOpenUserInfo }"
                                
                            >
                                <p class="mb-1 text-center" style="width: 100%;">Активность</p>
                                <v-card
                                    class="mb-3"
                                >
                                    <v-card-actions>
                                        <v-progress-circular
                                            :rotate="360"
                                            :value="userInfo.hoursActivity"
                                            size="85"
                                            width="8"
                                            color="info"
                                        >
                                            {{ userInfo.hoursActivity }} часов
                                        </v-progress-circular>  
                                    </v-card-actions>   
                                </v-card>  
                                <v-divider class="w-full"></v-divider>                 
                                <v-list
                                   dense
                                >
                                    <v-list-group
                                        prepend-icon="mdi-book-check-outline"
                                    >
                                        <!-- For readeble books -->
                                        <template v-slot:activator>
                                            <v-list-item-title class="text-non-space">Прочитанные книги</v-list-item-title>
                                        </template>
                                        <v-list-item
                                            v-for="item in userInfo.readsBooks"
                                            :key="item"
                                            link
                                        >
                                            <v-list-item-avatar>
                                                <v-img
                                                    :src="item.cover"
                                                ></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                <v-list-item-subtitle>{{ item.author }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-group>
                                    <v-list-group
                                        prepend-icon="mdi-bookshelf"
                                    >
                                        <!-- For purchased books -->
                                        <template v-slot:activator>
                                            <v-list-item-title class="text-non-space">Купленные книги</v-list-item-title>
                                        </template>
                                        <v-list-item
                                            v-for="item in userInfo.purchasedBooks"
                                            :key="item"
                                            link
                                        >
                                            <v-list-item-avatar>
                                                <v-img
                                                    :src="item.cover"
                                                ></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                <v-list-item-subtitle>{{ item.author }}</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-group> 
                                    <v-list-group
                                        prepend-icon="mdi-book-arrow-right-outline"
                                    >
                                        <!-- For dilivered books -->
                                        <template v-slot:activator>
                                            <v-list-item-title class="text-non-space">Доставка</v-list-item-title>
                                        </template>
                                        <v-list-item
                                            v-for="item in userInfo.deliveredBooks"
                                            :key="item"
                                            link
                                        >
                                            <v-list-item-avatar>
                                                <v-img
                                                    :src="item.cover"
                                                ></v-img>
                                            </v-list-item-avatar>
                                            <v-list-item-content>
                                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                                                <v-list-item-subtitle>{{ item.author }}</v-list-item-subtitle>
                                                <v-item-actions>
                                                    <v-subheader
                                                        class="pl-sm-1"
                                                    >Статус доставки</v-subheader>
                                                    <v-progress-linear
                                                        :value="item.status"
                                                        color="info"
                                                        stream
                                                    ></v-progress-linear>
                                                </v-item-actions>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list-group>                                                               
                                </v-list>
                            </div>
                        </v-expand-transition>
                    </v-card-actions>
                </v-card>
            </v-col>    
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>Опции</v-card-title>
                    <v-btn
                        text
                        
                        block
                        color="info"
                        class="justify-start"
                    >
                        Смена логина
                        <v-icon 
                            size="18" 
                            rigth
                            class="px-1"
                        >mdi-rename-box</v-icon>
                    </v-btn>                   
                    <v-btn
                        text
                        block
                        color="info"
                        class="justify-start"
                    >
                        Смена почты
                        <v-icon 
                            size="18" 
                            rigth
                            class="px-1"
                        >mdi-email-sync-outline</v-icon>
                    </v-btn>
                    <v-btn
                        text
                        block
                        color="info"
                        class="justify-start"
                    >
                        Связь с техподдержкой
                        <v-icon 
                            size="18" 
                            rigth
                            class="px-1"
                        >mdi-account-question-outline</v-icon>
                    </v-btn>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-actions>
                        <v-dialog
                            v-model="deleteAccount"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    text
                                    outlined
                                    block
                                    color="error"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    Удалить аккаунт
                                    <v-icon
                                        size="30" 
                                        rigth
                                        class="px-1"
                                    >mdi-account-remove-outline</v-icon>
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title class="text-h5 text--secondary secondary"> Удалить аккаунт?</v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    Вы не сможете вернуть купленные вами книги, книги которые вы уже заказали, 
                                    будут доставленны по указанному адресу/отделению почты, 
                                    но, посмотреть статус доставки будет невозможно через сайт

                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions
                                    class="justify-center"
                                >
                                    <v-btn
                                        color="error"
                                        @click="deleteAccount = false"
                                    >Да</v-btn>
                                    <v-btn
                                        color="success"
                                        @click="deleteAccount = false"
                                    >Нет</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <p class="text-subtitle-1 text-center text--secondary">{{companyName}}</p>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: "User",
        data: () => ({
            isOpenUserInfo: false,
            deleteAccount: false,
            userInfo: {
                login: "Test",
                email: "test@mail.com",
                avatar: "https://www.tapeciarnia.pl/tapety/normalne/245937_kon_rzeka_laka.jpg",
                hoursActivity: 10,
                readsBooks: [{ title: "test", author: "testAut", cover: "https://www.tapeciarnia.pl/tapety/normalne/245937_kon_rzeka_laka.jpg"}],
                purchasedBooks: [{title: "test", author: "testAut", cover: "https://www.tapeciarnia.pl/tapety/normalne/245937_kon_rzeka_laka.jpg"}],
                deliveredBooks: [{title: "test", author: "testAut", cover: "https://www.tapeciarnia.pl/tapety/normalne/245937_kon_rzeka_laka.jpg", status: "50"}],
            }
        }),
        computed: {
            ...mapState({
                companyName: state => state.companyName,
            })
        },
    }
</script>
<style scoped lang="scss">
    .v-card {
        &-inline {
            height: 70% !important;
        }
    }
    .d {
        &-contents {
            display: contents;
        }
    }
    .translate { 
        $end-translateX: 45%;
        $start-translateX: -45%;
        &-x-start {
            transform: translateX($start-translateX);
        };
        &-x-end {
            transform: translateX($end-translateX);
        }
    }
    .v-btn {
        &__content {
            transition: .5s all;
        }
    }
</style>