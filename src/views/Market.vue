<template>
    <v-container>
        <v-row>
            <v-col
                cols="12"
            >
                <p class="mb-2 mb-sm-4 text-h5 text-sm-h4">Добавленные книги</p>
                <v-card  :rounded="$vuetify.breakpoint.xsOnly ? 'md' : 'lg' ">
                    <v-container>
                        <v-row
                            no-gutters 
                            dense
                        >
                            <v-col cols="12">
                                <v-list 
                                    subheader
                                    dense
                                 >
                                    <div class="d-flex">
                                        <v-subheader class="flex-grow-1">Корзина</v-subheader>
                                        <v-icon>mdi-cart</v-icon>
                                        <v-menu 
                                            left
                                            bottom 
                                            offset-y 
                                            transition="scale-transition"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                icon
                                                v-on="on"
                                                v-show="removedOfCartBooks.length !== 0"
                                                @click="openRemovedCartMenu = !openRemovedCartMenu"
                                                v-bind="attrs"
                                                >
                                                    <v-icon
                                                        small
                                                        rigth
                                                    >
                                                        mdi-chevron-{{ openRemovedCartMenu ? "down": "up" }}
                                                    </v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list
                                                two-line
                                                subheader
                                                dense
                                            >
                                                <v-subheader>Удаленные книги</v-subheader>
                                                <v-divider />
                                                <template v-for="(removedBook, i) in removedOfCartBooks">
                                                    <v-list-item
                                                        :key="removedBook" 
                                                        dense
                                                    >
                                                        <v-list-item-avatar>
                                                            <v-img :src="removedBook.cover" />
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-text="removedBook.title" />
                                                            <v-list-item-subtitle v-text="removedBook.author" />
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                            <v-btn
                                                                icon
                                                                @click="undoOfCartBooks(removedBook)"
                                                            >
                                                                <v-icon>
                                                                    mdi-arrow-u-left-top
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-list-item-action>
                                                    </v-list-item>
                                                    <v-divider :key="i" inset v-show="getLastOnRemovedCartBooks - 1 !== i" />
                                                </template>
                                            </v-list>
                                        </v-menu>
                                    </div>
                                </v-list>
                                <v-divider />
                            </v-col>
                            <v-col cols="12">
                                <v-list 
                                    dense
                                    two-line
                                >
                                    <v-scale-transition appear>
                                        <v-list-item
                                            v-show="booksOnCart.length === 0"
                                            class="pa-3"
                                        >
                                            <v-list-item-icon>
                                                <v-icon>mdi-help</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Вы еще не добавили ни одного элемента</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-scale-transition>
                                    <v-scale-transition>
                                        <span v-show="booksOnCart.length > 0">
                                            <template v-for="(book, i) in booksOnCart">
                                                <v-list-item
                                                    :key="book"
                                                    dense
                                                >
                                                    <v-list-item-avatar>
                                                        <v-img :src="book.cover" />
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="book.title" />
                                                        <v-list-item-subtitle v-text="book.author" />
                                                    </v-list-item-content>
                                                    <v-list-item-action>
                                                        <v-menu
                                                            offset-y
                                                            :top="$vuetify.breakpoint.xsOnly"
                                                            :left="$vuetify.breakpoint.xsOnly"
                                                            :bottom="$vuetify.breakpoint.smAndUp"
                                                            :right="$vuetify.breakpoint.smAndUp"
                                                        >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn 
                                                                    icon
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                >
                                                                    <v-icon>mdi-dots-vertical</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-btn-toggle 
                                                                borderless
                                                                :class="{'d-block': $vuetify.breakpoint.xsOnly}"
                                                            >
                                                                <v-btn
                                                                    color="info" 
                                                                    text
                                                                    :to="`/books/${i}`"
                                                                >
                                                                    Посмотреть
                                                                    <v-icon right>mdi-book-open-variant</v-icon>
                                                                </v-btn>
                                                                <v-btn
                                                                    text
                                                                    color="success"
                                                                >
                                                                    Купить
                                                                    <v-icon right>mdi-cash</v-icon>
                                                                </v-btn>
                                                                <v-btn
                                                                    text
                                                                    color="error"
                                                                    @click="removeCartBook(book)"
                                                                >
                                                                    Удалить из корзины
                                                                    <v-icon right>mdi-close</v-icon>
                                                                </v-btn>
                                                            </v-btn-toggle>
                                                        </v-menu>
                                                    </v-list-item-action>
                                                </v-list-item>
                                                <v-divider inset v-show="getLastIndexOnCartBooks - 1 !== i" />
                                            </template>
                                        </span>
                                    </v-scale-transition>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row
                            no-gutters 
                            dense
                        >
                            <v-col cols="12">
                                <v-list 
                                    subheader
                                    dense
                                >
                                    <div class="d-flex">
                                        <v-subheader class="flex-grow-1">Любимые книги</v-subheader>
                                        <v-icon>mdi-cards-heart</v-icon>
                                        <v-menu 
                                            left
                                            bottom 
                                            offset-y 
                                            transition="scale-transition"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-btn
                                                    icon
                                                    v-on="on"
                                                    v-show="removedOfLikeBooks.length !== 0"
                                                    @click="openRemovedLikeMenu = !openRemovedLikeMenu"
                                                    v-bind="attrs"
                                                >
                                                    <v-icon
                                                        small
                                                        rigth
                                                    >
                                                        mdi-chevron-{{ openRemovedLikeMenu ? "down": "up" }}
                                                    </v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list
                                                two-line
                                                subheader
                                                dense
                                            >
                                                <v-subheader>Удаленные книги</v-subheader>
                                                <v-divider />
                                                <template v-for="(removedBook, i) in removedOfLikeBooks">
                                                    <v-list-item
                                                        :key="removedBook" 
                                                        dense
                                                    >
                                                        <v-list-item-avatar>
                                                            <v-img :src="removedBook.cover" />
                                                        </v-list-item-avatar>
                                                        <v-list-item-content>
                                                            <v-list-item-title v-text="removedBook.title" />
                                                            <v-list-item-subtitle v-text="removedBook.author" />
                                                        </v-list-item-content>
                                                        <v-list-item-action>
                                                            <v-btn
                                                                icon
                                                                @click="undoOfLikeBooks(removedBook)"
                                                            >
                                                                <v-icon>
                                                                    mdi-arrow-u-left-top
                                                                </v-icon>
                                                            </v-btn>
                                                        </v-list-item-action>
                                                    </v-list-item>
                                                    <v-divider inset v-show="getLastOnRemovedLikeBooks - 1 !== i" />
                                                </template>
                                            </v-list>
                                        </v-menu>
                                    </div>
                                </v-list>
                                <v-divider />
                            </v-col>
                            <v-col cols="12">
                                <v-list 
                                    dense
                                    two-line
                                >
                                    <v-scale-transition appear>
                                        <v-list-item
                                            v-show="booksOnLike.length === 0"
                                            class="pa-3"
                                        >
                                            <v-list-item-icon>
                                                <v-icon>mdi-help</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Вы еще не добавили ни одного элемента</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-scale-transition>
                                    <v-scale-transition>
                                        <span v-show="booksOnLike.length > 0">
                                            <template v-for="(book, i) in booksOnLike">
                                                <v-list-item
                                                    :key="book"
                                                    dense
                                                >
                                                    <v-list-item-avatar>
                                                        <v-img :src="book.cover" />
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="book.title" />
                                                        <v-list-item-subtitle v-text="book.author" />
                                                    </v-list-item-content>
                                                    <v-list-item-action>
                                                        <v-menu
                                                            offset-y
                                                            :top="$vuetify.breakpoint.xsOnly"
                                                            :left="$vuetify.breakpoint.xsOnly"
                                                            :bottom="$vuetify.breakpoint.smAndUp"
                                                            :right="$vuetify.breakpoint.smAndUp"
                                                        >
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn 
                                                                    icon
                                                                    v-bind="attrs"
                                                                    v-on="on"
                                                                >
                                                                    <v-icon>mdi-dots-vertical</v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <v-btn-toggle 
                                                                borderless
                                                                :class="{'d-block': $vuetify.breakpoint.xsOnly}"
                                                            >
                                                                <v-btn
                                                                    color="info" 
                                                                    text
                                                                    :to="`/books/${i}`"
                                                                >
                                                                    Посмотреть
                                                                    <v-icon right>mdi-book-open-variant</v-icon>
                                                                </v-btn>
                                                                <v-btn
                                                                    text
                                                                    color="success"
                                                                >
                                                                    Купить
                                                                    <v-icon right>mdi-cash</v-icon>
                                                                </v-btn>
                                                                <v-btn
                                                                    text
                                                                    color="error"
                                                                    @click="removeLikeBook(book)"
                                                                >
                                                                    Удалить из любимого
                                                                    <v-icon right>mdi-close</v-icon>
                                                                </v-btn>
                                                            </v-btn-toggle>
                                                        </v-menu>
                                                    </v-list-item-action>
                                                </v-list-item>
                                                <v-divider inset v-show="getLastIndexOnLikeBooks - 1 !== i" />
                                            </template>
                                        </span>
                                    </v-scale-transition>
                                </v-list>
                            </v-col>
                        </v-row>
                        <v-row
                            no-gutters 
                            dense
                        >
                            <v-col cols="12">
                                <v-list 
                                    subheader
                                    dense
                                >
                                    <div class="d-flex">
                                        <v-subheader class="flex-grow-1">Оплаченные книги</v-subheader>
                                        <v-icon>mdi-cash-multiple</v-icon>
                                    </div>
                                </v-list>
                                <v-divider />
                            </v-col>
                            <v-col cols="12">
                                <v-list 
                                    dense
                                    two-line
                                >
                                    <v-scale-transition appear>
                                        <v-list-item
                                            v-show="booksOnPaid.length === 0"
                                            class="pa-3"
                                        >
                                            <v-list-item-icon>
                                                <v-icon>mdi-help</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                                <v-list-item-title>Вы еще не добавили ни одного элемента</v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-scale-transition>
                                    <v-scale-transition>
                                        <span v-show="booksOnPaid.length > 0">
                                            <template
                                                v-for="(book, i) in booksOnPaid"
                                            >
                                                <v-list-item
                                                    dense
                                                    :key="book"
                                                >
                                                    <v-list-item-avatar>
                                                        <v-img :src="book.cover" />
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-text="book.title" />
                                                        <v-list-item-subtitle v-text="book.author" />
                                                    </v-list-item-content>
                                                    <v-list-item-action>
                                                        <v-progress-circular
                                                            :rotate="360"
                                                            :size="50"
                                                            :width="$vuetify.breakpoint.xsOnly ? '2': '4'"
                                                            :value="book.deliverStatistic"
                                                            color="info"
                                                            v-show="book.deliverStatistic < 100"
                                                        >
                                                            {{ book.deliverStatistic }}%
                                                        </v-progress-circular>
                                                        <v-scale-transition appear>
                                                            <v-progress-circular
                                                                :rotate="360"
                                                                :size="50"
                                                                :width="$vuetify.breakpoint.xsOnly ? '2': '4'"
                                                                :value="book.deliverStatistic"
                                                                color="success"
                                                                v-show="book.deliverStatistic === 100"
                                                            >
                                                                <v-icon color="success">
                                                                    mdi-check
                                                                </v-icon>
                                                            </v-progress-circular>
                                                        </v-scale-transition>
                                                    </v-list-item-action>
                                                </v-list-item>
                                                <v-divider inset v-show="getLastIndexOnPaidBooks - 1 !== i" />
                                            </template>
                                        </span>
                                    </v-scale-transition>
                                </v-list>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-card>
                    <v-card-actions>
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
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
    import { lastIndexOf } from "lodash";
    import { mapGetters, mapMutations } from "vuex";
    
    export default {
        name: "Cart",
        data: () => ({
            openRemovedCartMenu: false,
            openRemovedLikeMenu: false,
        }),
        methods: {
            ...mapMutations({
                removeLikeBook: 'books/deleteOfLikedBooks',
                removeCartBook: 'books/deleteOfCartedBooks',
                removePaidBook: 'books/deleteOfPaidBooks',


                undoOfLikeBooks: 'books/undoDeleteLikedBooks',
                undoOfCartBooks: 'books/undoDeleteCartedBooks',
                undoOfPaidBooks: 'books/undoDeletePaidBooks',
            }),
        },
        computed: {
            ...mapGetters({
                booksOnLike: 'books/getLikedBooks',
                booksOnCart: 'books/getCartBooks',
                booksOnPaid: 'books/getPaidBooks',


                removedOfCartBooks: 'books/getDeletedCartBooks',
                removedOfLikeBooks: 'books/getDeletedLikeBooks',
                removedOfPaidBooks: 'books/getDeletedPaidBooks',
            }),
            getLastIndexOnCartBooks() {
                return lastIndexOf(this.booksOnCart);
            },
            getLastIndexOnLikeBooks() {
                return lastIndexOf(this.booksOnLike);
            },
            getLastIndexOnPaidBooks() {
                return lastIndexOf(this.booksOnPaid);
            },
            getLastOnRemovedCartBooks() {
                return lastIndexOf(this.removedOfCartBooks);
            },
            getLastOnRemovedLikeBooks() {
                return lastIndexOf(this.removedOfLikeBooks);
            }, 
        }
    }
</script>