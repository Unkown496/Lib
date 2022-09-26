<template>
    <v-app>
        <v-container>
            <v-row
                class="mb-5 mb-lg-8"
            >
                <v-col
                    cols="12"
                    sm="6"
                    class="mb-2"
                >
                    <h1 class="text-h3">{{ companyName }}</h1>
                    <p class="mb-1 text-subtitle-2 font-weight-medium">
                        Наша библиотека может похвастаться 
                        <router-link class="font-weight-bold text-decoration-underline info--text text-non-space" to="/lib">тысячами книг</router-link>.
                    </p>
                    <p class="text-subtitle-2 font-weigth-medium">
                        В нашей библиотеке, вы легко найдете себе интересную книгу
                    </p>
                    <v-btn color="primary" to="/lib">
                        Найти книгу по душе
                    </v-btn>
                </v-col>
                <v-col 
                    cols="12" 
                    sm="6"
                    class="mx-auto"
                >
                    <v-img

                        height="200px"
                        src="../assets/placeholder.webp"
                    ></v-img>
                </v-col>
            </v-row>
            <v-row
            >
                <v-col cols="12">
                    <p class="text-h4 text-center">Наши приемущества</p>
                </v-col>
                <v-scale-transition
                    tag="span"
                    group
                    appear
                    style="width: 100%;"
                    class="d-md-flex"
                >
                    <v-col 
                        cols="12"
                        sm="10"
                        md="3"
                        v-for="(item, i) in opportunitiesService"
                        :key="item"
                        class="mx-sm-auto px-md-2"
                    >
                        <v-card
                            class="h-full"
                            hover
                        >
                            <!-- i === 3 it's styling last arr element -->
                            <v-card-title 
                                class="justify-center text-center"
                                :class="{'px-md-9 py-md-0 pa-lg-4': i === 3}"
                            > 
                                {{item.title}} 
                            </v-card-title>
                            <v-divider class="mx-4"></v-divider>
                            <v-card-actions class="justify-center">
                                <v-btn
                                    fab
                                >
                                    <v-icon>mdi-{{item.icon}}</v-icon>
                                </v-btn>
                            </v-card-actions>
                            <v-card-text class="text-center text-subtitle-2">{{item.description}}</v-card-text>
                        </v-card>
                    </v-col>
                </v-scale-transition>    
            </v-row>
            <v-row>
                <v-col 
                    cols="12"
                    class="pb-0"
                >
                    <p class="text-h4 text-center">Наши лучшие книги</p>
                </v-col>
                <v-col 
                    cols="12"
                >
                    <v-item-group>
                        <v-window
                            v-model="booksCarouselItem"
                            continuous
                            show-arrows
                        >
                            <template v-slot:next="{ on, attrs }">
                                <v-btn
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>
                                        mdi-book-arrow-right
                                    </v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:prev="{ on, attrs }">
                                <v-btn
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>
                                        mdi-book-arrow-left
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-window-item
                                v-for="(item, i) in books"
                                :key="item"
                            >
                                <v-item
                                    v-slot="{ active, toggle }"
                                >
                                    <v-container fluid>  
                                        <v-row
                                            justify="center"
                                        >
                                            <v-col
                                                cols="12"
                                                sm="6"
                                            >
                                                <v-card>
                                                    <div class="py-0 py-sm-2">
                                                        <v-img
                                                            :contain="$vuetify.breakpoint.smAndUp"
                                                            :lazy-img="item.cover"
                                                            :src="item.cover"
                                                            :max-height="$vuetify.breakpoint.smAndUp ? '300': '200'"                                       
                                                            class="white--text align-end"    
                                                        >
                                                            <v-card-title class="d-flex d-sm-none text-body-1 font-weight-bold ">
                                                                {{ item.title }}
                                                                <v-btn color="primary" small> Прочитать</v-btn>
                                                            </v-card-title>
                                                        </v-img>
                                                    </div>
                                                    <v-divider></v-divider>
                                                    <v-card-title class="d-none d-sm-flex justify-sm-space-between">
                                                        {{ item.title }}
                                                        <span
                                                            class="flex-sm-grow-1 d-sm-inline-flex align-sm-baseline"
                                                        >
                                                            <v-btn 
                                                                small 
                                                                color="primary" 
                                                                class="mx-sm-1 mx-md-2 mx-lg-3"
                                                            >
                                                                Прочитать
                                                            </v-btn>
                                                            <span class="flex-grow-1 d-sm-inline-flex justify-sm-end">
                                                                <v-btn 
                                                                    icon
                                                                    @click="toggle"
                                                                >
                                                                    <v-icon
                                                                        rigth
                                                                    >
                                                                        mdi-chevron-{{ active ? "down": "up" }}
                                                                    </v-icon>
                                                                </v-btn>
                                                            </span>
                                                        </span>
                                                    </v-card-title>                                   
                                                    <v-expand-transition>
                                                        <div
                                                            v-show="$vuetify.breakpoint.xsOnly || active"
                                                        >
                                                            <v-divider></v-divider>
                                                            <v-card-actions> 
                                                                <v-rating
                                                                    half-increments
                                                                    dense
                                                                    readonly
                                                                    :value="item.rating"
                                                                    :size="$vuetify.breakpoint.xsOnly ? '14' : '20'"
                                                                >
                                                                </v-rating>
                                                                <div
                                                                    class="d-inline-flex flex-grow-1 justify-end"
                                                                >
                                                                    <v-tooltip bottom>
                                                                        <template v-slot:activator="{on, attrs}">
                                                                        <v-btn 
                                                                            icon
                                                                            v-on="on" 
                                                                            @click="item.onLike ? removeOfLikeBooks(item) : addToLikeBooks(i)"
                                                                            v-bind="attrs"
                                                                            :color="item.onLike ? 'error' : 'primary' "
                                                                            class="v-btn--tips"
                                                                        >
                                                                            <v-icon 
                                                                            v-show="!item.onLike"
                                                                            class="position-absolute-important"
                                                                            >
                                                                            mdi-heart-plus
                                                                            </v-icon>
                                                                            <v-slide-y-transition>
                                                                            <v-icon 
                                                                                v-show="item.onLike"
                                                                                class="position-absolute-important" 
                                                                            >
                                                                                mdi-cards-heart
                                                                            </v-icon>
                                                                            </v-slide-y-transition>
                                                                        </v-btn>
                                                                        </template>
                                                                        <span>{{ item.onLike ? "Убрать из любимого": "Добавить в любимое" }} </span>
                                                                    </v-tooltip> 
                                                                    <v-tooltip bottom>
                                                                        <template v-slot:activator="{on, attrs}">
                                                                        <v-btn 
                                                                            icon
                                                                            v-on="on" 
                                                                            @click="item.onCart ? removeOfCartBooks(item) : addToCartBooks(i)"
                                                                            v-bind="attrs"
                                                                            :color="item.onCart ? 'primary' : '' "
                                                                            class="v-btn--tips"
                                                                        >
                                                                            <v-icon 
                                                                            v-show="!item.onCart"
                                                                            class="position-absolute-important"
                                                                            >
                                                                            mdi-cart-outline
                                                                            </v-icon>
                                                                            <v-slide-y-transition>
                                                                            <v-icon 
                                                                                v-show="item.onCart" 
                                                                                class="position-absolute-important"
                                                                            >
                                                                                mdi-cart
                                                                            </v-icon>
                                                                            </v-slide-y-transition>
                                                                        </v-btn>
                                                                        </template>
                                                                        <span>{{ item.onCart ? "Убрать из корзины" : "Добавить в корзину" }}</span>
                                                                    </v-tooltip>
                                                                    <v-tooltip bottom>
                                                                        <template v-slot:activator="{ on, attrs }">
                                                                        <v-btn 
                                                                            icon
                                                                            v-on="on"
                                                                            v-bind="attrs"
                                                                            :to="`/books/${i}#reviews`"
                                                                            color="primary"
                                                                            class="v-btn-tips"
                                                                        >
                                                                            <v-icon>mdi-comment</v-icon>
                                                                        </v-btn>
                                                                        </template>
                                                                        <span>Посмотреть отзывы</span>
                                                                    </v-tooltip>
                                                                </div>
                                                            </v-card-actions>
                                                        </div>
                                                    </v-expand-transition>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-item>
                            </v-window-item>
                        </v-window>
                    </v-item-group>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
    import { mapState, mapMutations } from 'vuex';
    export default {
        name: "Index",
        data: () => ({
            booksCarouselItem: 0,
            opportunitiesService: [
                {
                    icon: "account",
                    title: "Личный кабинет",
                    description: `Баланс, купленные книги, прочитанные книги, книги которые вы планируете прочитать. Все, и в одном месте.`
                },
                {
                    icon: "credit-card",
                    title: "Оплата онлайн",
                    description: `27/7 вы можете оплатить вашу любимую книгу`
                },
                {
                    icon: "account-group",
                    title: "Тех-поддержка",
                    description: `Наши специалисты решат вас вопрос как можно быстрее!`
                },
                {
                    icon: "book-multiple",
                    title: "Разнообразие жанров",
                    description: `От фантастики до книг по метафизики, вас ждет удивительный мир фантастов!`
                }
            ]
        }),
        methods: {
            ...mapMutations({
                addToLikeBooks: 'books/likeABook',
                addToCartBooks: 'books/cartABook',
                removeOfLikeBooks: 'books/deleteOfLikedBooks',
                removeOfCartBooks: 'books/deleteOfCartedBooks',
            }),
        },
        computed: {
            ...mapState({
                books: state => state.books.books.item,
                booksTip: state => state.books.tips,
                companyName: state => state.companyName,
                
            }),
        },
    }
</script>
<style scoped lang="scss">
    .text {
        &-opportunities {
            width: 70%;
        }
    }
</style>