<template>
    <v-container :class="{'h-full': getCurrentBook === undefined }">
        <v-row v-if="getCurrentBook !== undefined">
            <v-col cols="12">
                <v-card>
                    <v-container>
                        <v-row dense>
                            <v-col 
                                cols="5"
                                sm="2"
                                lg="1"
                                class="d-sm-flex align-sm-center"
                            >
                                <v-card 
                                    class="pa-3 h-full"
                                >
                                    <v-img
                                        :src="getCurrentBook.cover"
                                        contain
                                        class="h-full"
                                    >
                                    </v-img>
                                </v-card>
                            </v-col>
                            <v-col 
                                cols="7"
                                sm="10"
                                lg="11"
                                class="d-md-flex flex-md-column"
                            >
                                <v-card class="flex-md-grow-1">
                                    <v-card-title class="pa-2 pa-sm-4">{{ getCurrentBook.title }}</v-card-title>
                                    <v-card-subtitle class="pt-2 pt-sm-1">- {{getCurrentBook.author}}</v-card-subtitle>
                                    <v-divider class="d-sm-none" />
                                    <div class="d-flex pl-3">
                                        <div class="d-none d-sm-flex flex-sm-grow-1">
                                            <div class="flex-sm-grow-1 align-self-center">
                                                <v-tooltip 
                                                    bottom
                                                    v-for="genre in getCurrentBook.genre"
                                                    :key="genre"
                                                >
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-icon
                                                            v-bind="attrs"
                                                            v-on="on"
                                                        >
                                                            mdi-{{genre.icon}}
                                                        </v-icon>
                                                    </template>
                                                    <span>{{genre.text}}</span>
                                                </v-tooltip>
                                            </div>
                                            <v-chip-group>
                                                <v-chip 
                                                    v-for="copy in getCurrentCopyState"
                                                    :key="copy"
                                                    color="info"
                                                >
                                                    {{copy}}
                                                </v-chip>
                                            </v-chip-group>                                  
                                        </div>
                                        <div class="d-flex d-sm-none">
                                            <v-tooltip 
                                                bottom
                                                v-for="genre in getCurrentBook.genre"
                                                :key="genre"
                                            >
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-icon
                                                        v-bind="attrs"
                                                        v-on="on"
                                                    >
                                                        mdi-{{genre.icon}}
                                                    </v-icon>
                                                </template>
                                                <span>{{genre.text}}</span>
                                            </v-tooltip>
                                        </div>
                                        <v-btn
                                            icon
                                            @click="isOpenMainDesctiption = !isOpenMainDesctiption"
                                            class="d-flex d-sm-none ml-auto"
                                        >
                                            <v-icon>mdi-chevron-{{ isOpenMainDesctiption ? "up" : "down" }}</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-expand-transition appear>
                                        <div v-show="isOpenMainDesctiption || $vuetify.breakpoint.smAndUp">
                                            <v-divider />
                                            <v-card-actions class="pa-sm-0">
                                                <v-container 
                                                    fluid
                                                    class="pa-0"
                                                >
                                                    <v-row 
                                                        dense 
                                                        no-gutters
                                                        class="px-sm-2 d-flex d-sm-none"
                                                    >
                                                        <v-col
                                                            cols="12" 
                                                            sm="6"
                                                            class="d-sm-flex justify-sm-end"
                                                        >
                                                            <v-chip-group>
                                                                <v-chip 
                                                                    v-for="copy in getCurrentCopyState"
                                                                    :key="copy"
                                                                    color="info"
                                                                >
                                                                    {{ copy }}
                                                                </v-chip>
                                                            </v-chip-group>
                                                        </v-col>
                                                    </v-row>
                                                    <v-row 
                                                        dense 
                                                        no-gutters
                                                    >
                                                        <v-col 
                                                            v-show="$vuetify.breakpoint.smAndUp"
                                                            class="d-none d-sm-block"
                                                            cols="12"
                                                        >
                                                            <div class="d-sm-flex">
                                                                <v-rating
                                                                    half-increments
                                                                    dense
                                                                    :value="getCurrentBook.rating"
                                                                    class="flex-sm-grow-1 align-self-center pl-sm-2"
                                                                />
                                                                <v-btn color="success">
                                                                    {{getCurrentBook.price}}
                                                                    <v-icon 
                                                                        right
                                                                    >
                                                                        mdi-currency-rub
                                                                    </v-icon>
                                                                </v-btn>
                                                            </div>
                                                        </v-col>
                                                    </v-row>
                                                </v-container>
                                            </v-card-actions>
                                        </div>
                                    </v-expand-transition>
                                </v-card>
                            </v-col>
                            <v-col 
                                cols="12"
                            >
                                <v-card>
                                    <div class="d-flex align-center">
                                        <v-card-subtitle>Отзывы</v-card-subtitle>
                                        <v-btn
                                            icon
                                            @click="isOpenReviews = !isOpenReviews"
                                            class="ml-auto"
                                        >
                                            <v-icon>mdi-chevron-{{ isOpenReviews ? "up" : "down" }}</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-expand-transition appear>
                                        <div id="reviews" v-show="isOpenReviews">
                                            <v-divider />
                                            <v-list three-line>
                                                <template
                                                    v-for="(item, i) in testReviews"
                                                >
                                                    <v-divider :key="i" v-if="item.divider" />
                                                    <v-list-item 
                                                        :key="item.name"
                                                        v-else
                                                    >
                                                        <v-list-item-avatar>
                                                            <v-icon>mdi-{{ item.avatar }}</v-icon>
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                                                            <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </template>
                                            </v-list>
                                        </div>
                                    </v-expand-transition>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col 
                                cols="12"
                            >
                                <v-btn
                                    tile
                                    block
                                    @click="isOpenDescriptionCard = !isOpenDescriptionCard"
                                >
                                    <p class="mb-0 flex-grow-1">{{ isOpenDescriptionCard ? "Закрыть" : "Открыть" }} описание</p>
                                    <v-icon>mdi-chevron-{{ isOpenDescriptionCard ? "up" : "down" }}</v-icon>
                                </v-btn>
                                <v-expand-transition>
                                    <v-card 
                                        v-show="isOpenDescriptionCard"
                                        tile
                                    >   
                                        <v-card-title>Описание</v-card-title>
                                        <v-divider />
                                        <v-card-actions>
                                            <v-card-text>{{getCurrentBook.description}}</v-card-text>
                                        </v-card-actions>
                                    </v-card>
                                </v-expand-transition>
                            </v-col>
                        </v-row>
                        <v-row class="d-flex d-sm-none">
                            <v-divider />
                            <v-col cols="12">
                                <v-card>
                                    <v-card-actions>
                                        <v-rating
                                            half-increments
                                            dense
                                            :value="getCurrentBook.rating"
                                            class="flex-grow-1"
                                        />
                                        <v-btn color="success">
                                            {{getCurrentBook.price}}
                                            <v-icon 
                                                right
                                            >
                                                mdi-currency-rub
                                            </v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row 
            v-else
            class="h-full"
            align="center"
            justify="center"
        >
            <v-col 
                cols="12"
                sm="10"
                md="9"
                lg="8"
            >
                <v-card elevation="1">
                    <v-system-bar>
                        <span>Все наши книги</span>
                    </v-system-bar>
                    <v-carousel
                        delimiter-icon="mdi-minus"
                        :cycle="isCycleSlides"
                        :show-arrows="false"
                        :height="resizerForCarousel"
                    >
                        <v-carousel-item
                            v-for="(item, i) in books"
                            :key="item"
                        >
                            <v-hover
                                v-slot="{ hover }"
                            >
                                <v-sheet
                                    class="pt-3"
                                    height="80%"
                                    tile
                                >
                                    <v-img
                                        contain
                                        class="mb-3"
                                        height="90%" 
                                        :src="item.cover"
                                    />
                                    <v-overlay
                                        absolute
                                        class="h-[190px] sm:h-[200px] md:h-[250px] lg:h-[270px] pb-3 pb-md-0"
                                        color="info"
                                        opacity=".9"
                                        :value="hover"
                                        :style="{ 'heigth': resizerOverlayForBooks + ';'}"
                                    >
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <v-card-title v-text="item.title" />
                                                    <v-card-subtitle v-text="item.author" />
                                                </v-col>
                                                <v-col 
                                                    cols="12"
                                                    class="d-flex"
                                                >
                                                    <v-rating 
                                                        half-increments
                                                        dense
                                                        class="d-inline-block flex-grow-1"
                                                        color="primary dakren-4"
                                                        :value="item.rating"   
                                                    />
                                                    <v-btn 
                                                        color="success"
                                                        small
                                                    >
                                                        {{item.price}}
                                                        <v-icon rigth>mdi-currency-rub</v-icon>
                                                    </v-btn>
                                                </v-col>
                                                <v-col 
                                                    cols="12"
                                                    class="d-flex justify-end"
                                                >
                                                    <v-btn
                                                        class="align-self-end"
                                                        :to="`/books/${i}`"
                                                        :small="$vuetify.breakpoint.xsOnly"
                                                    >
                                                        Посмотреть
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-overlay>
                                </v-sheet>
                            </v-hover>
                        </v-carousel-item>
                    </v-carousel>
                    <v-card-actions class="pa-2">

                        <v-row dense>
                            <v-col 
                                cols="12"
                                sm="6"
                                md="4"
                            >
                                <v-card-title class="pb-0 pr-sm-0 pb-sm-5">
                                    <p class="mb-0">Книга не найдена</p>
                                    <v-icon 
                                        :small="$vuetify.breakpoint.smAndDown" 
                                        :size="$vuetify.breakpoint.mdAndUp ? '19': ''"
                                    >mdi-help</v-icon>
                                </v-card-title>
                            </v-col>
                            <v-col 
                                class="d-flex flex-grow-1 flex-sm-grow-0 justify-center justify-md-end" 
                                cols="12"
                                sm="6"
                                md="8"
                            >
                                <v-switch
                                    v-model="isCycleSlides" 
                                    label="Прокрутка слайдов"
                                    hide-details
                                    inset
                                ></v-switch>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { mapState } from 'vuex';
    export default {
        name: "Books",
        data: () => ({
            isOpenDescriptionCard: false,
            isOpenMainDesctiption: true,
            isOpenReviews: true,
            isCycleSlides: true,
            modelOnSlideAllBooks: null,
            testReviews: [
            { 
                name: "test", 
                text: 
                `
                    Предварительные выводы неутешительны: 
                    постоянный количественный рост и сфера 
                    нашей активности не даёт нам иного выбора, 
                    кроме определения первоочередных требований.
                `,
                avatar: "account"
            }, 
            { divider: true, },
            {
                name: "test2", 
                text: 
                `
                    Также как дальнейшее развитие различных форм деятельности 
                    требует анализа приоретизации разума над эмоциями.
                `,
                avatar: "user"
            }
        ],
        }),
        methods: {
            backRoute() {
                return history.back();
            },
        },
        computed: {
            ...mapState({
                books: state => state.books.books.item,
                getCurrentBook(state) {
                    const currentRequestId = this.$route.params.id;

                    return state.books.books.item[currentRequestId];
                },
                getCurrentCopyState() {
                    const onlineCopy = this.getCurrentBook.copy.online;
                    const physicalCopy = this.getCurrentBook.copy.physical;

                    if(onlineCopy && !physicalCopy) {
                        return ["Только онлаин копия"];
                    }
                    else if (physicalCopy && !onlineCopy) {
                        return ["Только физическая копия"];
                    }
                    else {
                        return ["Физическая копия", "Онлаин копия"];
                    }

                },
            }),
            resizerOverlayForBooks() {
                let sizeAfterResize = null;

                switch(this.$vuetify.breakpoint.name) {
                    case "xs": 
                        sizeAfterResize = "190";
                        break;
                    case "sm": 
                        sizeAfterResize = "200";
                        break;
                    case "md": 
                        sizeAfterResize = "250";
                        break;
                    case "lg": 
                        sizeAfterResize = "270";
                        break;
                }
                return sizeAfterResize;
            },
            resizerForCarousel() {
                let sizeAfterResize = null;
                

                switch(this.$vuetify.breakpoint.name) {
                    case "xs": 
                        sizeAfterResize = "240";
                        break;
                    case "sm": 
                        sizeAfterResize = "250";
                        break;
                    case "md": 
                        sizeAfterResize = "300";
                        break;
                    case "lg": 
                        sizeAfterResize = "320";
                        break;   
                }
                return sizeAfterResize;
            },
        },
    }
</script>
<style scoped>
    .v-overlay__content {
        flex: 1 !important;
    }
</style>