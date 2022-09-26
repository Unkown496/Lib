<template>
  <v-container>
    <v-row>
      <v-col 
        cols="12"
      >
        <v-item-group>
          <p class="text-h4 font-weigth-bold mb-1">Новые книги</p>
          <div class="carousel-books pb-4">
            <v-col
              cols="6"
              md="5"
              lg="4"
              class="mt-3" 
              v-for="(item, i) in books" 
              :key="item"
            >
              <v-item v-slot="{ active, toggle }" :i="i">
                <v-badge 
                  overlap 
                  content="New" 
                  color="error" 
                  class="h-full w-full"
                >
                  <v-hover 
                    v-slot="{ hover }"
                  >
                    <v-card 
                      hover
                      class="h-full transition-all-medium-important"
                      :class="{'trasnform-scale-ligth': hover}"
                    >
                      <v-overlay
                        absolute 
                        opacity=".8" 
                        color="info" 
                        :value="hover" 
                      >
                        <v-container>
                          <v-row class="ma-0">
                            <v-col 
                              cols="12"
                              class="py-0"
                            >
                              <p
                                v-text="item.title" 
                                class="text-center text-non-space text-caption text-sm-body-1 mb-0"
                              /> 
                            </v-col>
                            <v-col 
                              cols="12"
                              class="d-flex justify-center"
                            >
                              <v-btn
                                :to="`/books/${i}`" 
                                :x-small="$vuetify.breakpoint.xsOnly"
                                block
                                elevation="1"  
                              > 
                                Посмотреть
                              </v-btn>
                            </v-col> 
                          </v-row>
                          <v-divider color="secondary" />
                          <v-row class="ma-0">
                            <v-col 
                              cols="12"
                              class="d-flex justify-space-between justify-sm-space-around"
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
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-overlay>
                      <v-container class="pa-0"> 
                        <v-row 
                          :dense="$vuetify.breakpoint.smAndUp"
                          class="ma-0"
                        >
                          <v-col
                            cols="12"
                          >
                            <v-img
                              class="mx-auto"
                              contain
                              :src="item.cover" 
                              :width="resizerForImage" 
                              :height="resizerForImage" 
                            />
                          </v-col>
                          <v-col 
                            cols="12"
                            class="d-flex flex-column flex-sm-row align-sm-baseline"
                          >
                            <p 
                              class="d-sm-inline-block text-end text-sm-start text-caption text-sm-subtitle-1 font-weight-bold mb-0 pa-sm-4 order-2 order-sm-1"
                              v-text="item.title"
                            />
                            <v-card-subtitle 
                              class="text-caption text-sm-subtitle-1 text-end pa-0 pa-sm-4 d-sm-inline-block font-italic flex-grow-1 order-1 order-sm-2" 
                              v-text="`- ${item.author}`"
                            />
                          </v-col>
                        </v-row>
                        <v-divider />
                        <v-row class="ma-1">
                          <v-col cols="6">
                            <v-icon
                              v-for="genre in books[i].genre"
                              :key="genre" 
                              v-text="`mdi-${genre.icon}`"
                            />                        
                          </v-col>
                          <v-col cols="6">
                            <v-btn
                              small
                              block
                              color="success"
                              :to="`/books/${i}`"
                            >
                              {{ item.price }}
                              <v-icon small>mdi-currency-rub</v-icon>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </v-hover>
                </v-badge>
              </v-item>
            </v-col>
          </div>
        </v-item-group>
      </v-col>
    </v-row>
    <v-row
      justify-sm="center"
    >
      <v-col cols="12">
        <v-card
          hover
          :rounded="$vuetify.breakpoint.xsOnly ? 'md' : 'lg' "
          v-click-outside="filterOptionsClickOutside"
        >
          <div class="d-flex w-full">
            <v-btn
              icon
              class="align-self-center"
              @click="isOpenFilterOptions = !isOpenFilterOptions, isFilterOptionClickOutside = false"
            >
              <v-icon class="mx-auto">
                mdi-chevron-{{ isOpenFilterOptions ? 'up' : 'down' }}
              </v-icon>
            </v-btn>
            <v-card-subtitle 
              class="text-sm-subtitle-2 py-0 pa-sm-4 flex-grow-1 align-self-center text-non-space"
              :class="{'text-center': onFilterOptionsModel !== null}"
              @click="isOpenFilterOptions = !isOpenFilterOptions"
              
            >
              {{ onFilterOptionsModel === null ? 'Выбрать опции для фильтра' : onFilterOptions[onFilterOptionsModel].text }}
            </v-card-subtitle>
            <v-scale-transition
              appear
            >
              <v-btn
                icon
                @click="onFilterOptionsModel = null"
                v-show="onFilterOptionsModel >= 0 && onFilterOptionsModel !== null"
                class="align-self-center"
              >
                <v-icon color="error">mdi-close</v-icon>
              </v-btn>
            </v-scale-transition>
          </div>
          <v-expand-transition>
            <v-card-actions
              class="pa-0"
              v-show="isOpenFilterOptions"
            >
              <v-list
                :dense="$vuetify.breakpoint.xsOnly"
                :rounded="$vuetify.breakpoint.xsOnly ? 'md' : 'lg' "
                class="flex-grow-1 pt-0"
              >
                <v-list-item-group
                  v-model="onFilterOptionsModel"
                  color="info"
                > 
                  <template v-for="(item, i) in onFilterOptions">
                    <v-divider :key="i" />
                    <v-list-item
                      :key="item.text"
                      @click="changeFilterBy(item)"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="`mdi-${item.icon}`" />
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.text" />
                      </v-list-item-content>
                      <v-list-item-action 
                        :key="item.actionsFilter"
                        :i="i"
                        v-if="item.actionsFilter !== undefined"
                        class="ma-0 align-center justify-center"
                      >
                        <v-slide-y-transition>
                          <v-btn
                            icon
                            v-show="item.actionsFilter.high === null && item.actionsFilter.low === null"
                            class="position-absolute"
                          >
                            <v-icon> mdi-minus </v-icon>
                          </v-btn>
                        </v-slide-y-transition>

                        <v-slide-y-transition>
                          <v-btn
                            icon 
                            v-show="item.actionsFilter.low === true"
                            class="position-absolute"
                          >
                            <v-icon>mdi-arrow-down-thin</v-icon>
                          </v-btn>
                        </v-slide-y-transition>

                        <v-slide-y-transition>
                          <v-btn
                            icon
                            v-show="item.actionsFilter.high === true"
                            class="position-absolute"
                          >
                            <v-icon> mdi-arrow-up-thin </v-icon>
                          </v-btn>
                        </v-slide-y-transition>
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                  <v-divider />
                </v-list-item-group>
                <v-list-group
                  prepend-icon="mdi-account-edit"
                >
                  <template v-slot:activator>
                    <v-list-item-title>Авторы</v-list-item-title>
                  </template>
                  <v-list-item-group
                    color="info"
                    v-model="chooseAuthor"
                  >
                    <template v-for="(authorName, i) in allAutors">
                      <v-divider :key="i" />
                      <v-list-item
                        :key="authorName"
                      >
                        <v-list-item-icon>
                          <v-icon left>mdi-pencil</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="authorName" />
                        </v-list-item-content>
                      </v-list-item> 
                    </template>
                  </v-list-item-group>
                </v-list-group>
              </v-list>
            </v-card-actions>
          </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
    <v-item-group class="row mw-null justify-sm-center">
      <v-item 
        v-slot="{ toggle, active }" 
        v-for="(item, i) in choseFilter" 
        :key="item"
      >
        <v-col 
          cols="12" 
          sm="9"
          md="8"
          lg="7" 
        >
          <v-card 
            hover
            class="d-flex flex-wrap justify-space-between" 
          >

            <v-row 
              dense
              justify="center"
            >
              <v-col
                cols="6"
                :sm="active ? 2 : 4"
                class="mt-2"
              >
                <span v-show="$vuetify.breakpoint.smAndUp && !active">
                  <v-badge
                    v-show="badgeContentAfterFilter !== null && onFilterOptionsModel < 2"
                    overlap
                    :inline="$vuetify.breakpoint.xsOnly"
                    :content="badgeContentAfterFilter"
                    transition="v-slide-x-transition"
                  >
                    <v-img 
                      contain
                      class="mx-auto"
                      height="100%"
                      :width="resizerForImage"
                      :lazy-src="item.cover"
                      :src="item.cover" 
                    />
                  </v-badge>
                  
                  <v-badge
                    v-show="badgeContentAfterFilter !== null && onFilterOptionsModel >= 2 && i === 0"
                    overlay
                    :content="badgeContentAfterFilter"
                    transition="v-slide-x-transition"
                  >
                    <v-img 
                      contain
                      class="mx-auto"
                      height="100%"
                      :width="resizerForImage"
                      :lazy-src="item.cover"
                      :src="item.cover" 
                    />
                  </v-badge>

                  <v-img
                    v-show="badgeContentAfterFilter === null || badgeContentAfterFilter !== null && onFilterOptionsModel >= 1 && i > 0"
                    contain
                    class="mx-auto"
                    height="100%"
                    :width="resizerForImage"
                    :lazy-src="item.cover"
                    :src="item.cover"  
                  />
                </span>
                <v-img  
                  v-show="$vuetify.breakpoint.smAndUp && active"
                  contain
                  class="mx-auto"
                  height="100%"
                  :width="resizerForImage"
                  :lazy-src="item.cover"
                  :src="item.cover"  
                />
                <v-img
                  v-show="$vuetify.breakpoint.xsOnly"
                  contain
                  class="mx-auto"
                  height="100%"
                  :width="resizerForImage"
                  :lazy-src="item.cover"
                  :src="item.cover"  
                />
              </v-col>
              <v-col
                cols="6"
                :sm="active ? 9 : 7"
                class="d-inline-flex flex-column"
              >
                <div class="pt-sm-5 pb-sm-0">
                  <span v-show="$vuetify.breakpoint.xsOnly">
                    <v-card-text 
                      v-show="badgeContentAfterFilter !== null && onFilterOptionsModel >= 2 && i === 0"
                      v-text="badgeContentAfterFilter"
                      class="text-center rounded info py-0 px-2 white--text"
                    />
                    <v-card-text 
                      v-show="badgeContentAfterFilter !== null && onFilterOptionsModel < 2"
                      v-text="badgeContentAfterFilter"
                      class="text-center rounded info py-0 px-2 white--text" 
                    />
                  </span>

                  <v-card-title 
                    v-text="item.title"
                    class="py-0 d-contents"
                  />
                  <v-card-subtitle 
                    v-text="`- ${item.author}`"
                    class="justify-end font-italic my-sm-1 d-inline-flex w-full"
                  />
                </div>
                <div 
                  class="d-none d-sm-flex pa-sm-1 flex-sm-grow-1 flex-sm-column align-md-center"
                  :class="{'pa-sm-1 pa-md-2 ': active }"
                >
                  <v-btn
                    small
                    outlined
                    class="w-full"
                    @click="toggle"
                  >
                  {{ active ? "Свернуть" : "Посмотреть" }} описание
                  </v-btn>
                  <v-expand-transition>
                    <v-sheet
                      rounded
                      elevation="1"
                      v-show="active"
                    >
                      <v-card-title>Описание</v-card-title>
                      <v-divider/>
                      <v-card-text 
                        v-text="item.description"
                      />
                      <v-divider/>
                      <v-card-actions>
                        <div class="text-subtitle-2">
                          Жанры:
                        </div>
                        <div
                          class="d-flex flex-sm-grow-1 justify-end"
                        >
                          <v-tooltip 
                            bottom
                            v-for="genre in books[i].genre"
                            :key="genre"
                          >
                            <template v-slot:activator="{on, attrs}">
                              <v-icon
                                v-on="on"
                                v-bind="attrs"
                              >
                                mdi-{{genre.icon}}
                              </v-icon>
                            </template>
                            <span>{{ genre.text }}</span>
                          </v-tooltip>
                        </div>
                      </v-card-actions>
                    </v-sheet>
                  </v-expand-transition>
                </div>
                <v-row 
                  dense
                  align-sm="end"
                  class="pl-sm-1 pl-md-2 pr-md-1" 
                >
                  <v-col
                    cols="12"
                    sm="4"
                    md="3"
                    class="d-flex justify-end justify-sm-start pr-2 pr-sm-0"
                  >
                    <v-btn
                      small
                      :block="$vuetify.breakpoint.smAndUp"
                      color="success"
                    >
                      {{item.price}}
                      <v-icon  
                        small
                      >
                        mdi-currency-rub
                      </v-icon>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="8"
                    md="9"
                    class="pr-2 pr-sm-2"
                  >
                    <v-btn
                      block
                      small
                      color="info"
                      :to="`/books/${i}`"
                    >
                      Посмотреть
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
              <v-col 
                cols="12"
                class="px-sm-3"
              >
                <div class="w-full">
                  <v-divider/>
                  <span class="d-inline-flex w-full">
                    <v-btn
                      icon
                      @click="toggle"
                      v-show="$vuetify.breakpoint.xsOnly"
                    >
                      <v-icon>
                        mdi-chevron-{{ active ? 'up' : 'down' }}
                      </v-icon>
                    </v-btn>
                    <v-rating 
                      dense 
                      readonly 
                      half-increments
                      class="d-inline-flex" 
                      size="19"
                      :value="item.rating" 
                    />
                    <div
                      class="d-inline-flex flex-grow-1 justify-end"
                    >
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
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
                                class="postion-absolute-important"
                              >
                                mdi-cards-heart
                              </v-icon>
                            </v-slide-y-transition>
                          </v-btn>
                        </template>
                        <span>{{ item.onLike ? "Убрать из любимого" : "Добавить в любимое" }}</span>
                      </v-tooltip>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn 
                            icon 
                            v-on="on" 
                            @click="item.onCart ? removeOfCartBooks(item) : addToCartBooks(i)" 
                            v-bind="attrs"
                            :color="item.onCart ? 'primary' : ''"
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
                                class="postion-absolute-important"
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
                            class="v-btn--tips"
                          >
                            <v-icon>mdi-comment</v-icon>
                          </v-btn>
                        </template>
                        <span>Посмотреть отзывы </span>
                      </v-tooltip>
                    </div>
                  </span>
                  <v-divider 
                    v-show="active"
                  />
                  <v-expand-transition>
                    <div
                      v-show="active && $vuetify.breakpoint.xsOnly"
                    >
                      <v-card-title>Описание</v-card-title>
                      <v-divider/>
                      <v-card-text>{{ item.description }}</v-card-text>
                      <v-divider/>
                      <v-card-actions>
                        <div class="text-subtitle-2">
                          Жанры:
                        </div>
                        <div
                          class="d-flex flex-grow-1 justify-end"
                        >
                          <v-tooltip 
                            bottom
                            v-for="genre in books[i].genre"
                            :key="genre"
                          >
                            <template v-slot:activator="{on, attrs}">
                              <v-icon
                                v-on="on"
                                v-bind="attrs"
                              >
                                mdi-{{genre.icon}}
                              </v-icon>
                            </template>
                            <span>{{ genre.text }}</span>
                          </v-tooltip>
                        </div>
                      </v-card-actions> 
                    </div>
                  </v-expand-transition>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-item>
    </v-item-group>
  </v-container>
</template>
<script>
  import { uniq } from "lodash";
  import { mapGetters, mapMutations, mapState } from "vuex";


  export default {
    name: "Lib",
    data: () => ({
      isOpenFilterOptions: false,
      onFilterOptionsModel: null,
      onFilterOptionsAuthors: null,
      onFilterCopies: null,
      onFilterOptions: [
        {
          text: "Физическая копия",
          options: "physicalCopy",
          icon: "book-open-blank-variant"
        }, 
      {
        text: "Электронная копия",
        options: "onlineCopy",
        icon: "package-variant-closed"
      }, 
      {
        text: "По цене",
        icon: "currency-rub",
        actionsFilter: {
          high: null,
          low: null
        }
      },
      {
        text: "По рейтингу",
        icon: "star",
        actionsFilter: {
          high: null,
          low: null,
        },
      }
    ],
    chooseAuthor: null,
    genreUserSelect: [],
  }),
  methods: {
    ...mapMutations({
      addToLikeBooks: 'books/likeABook',
      addToCartBooks: 'books/cartABook',
      removeOfLikeBooks: 'books/deleteOfLikedBooks',
      removeOfCartBooks: 'books/deleteOfCartedBooks',
    }),
    filterOptionsClickOutside() {
      this.isOpenFilterOption = false;
    },
    onFilterOptionsSwitch() {
      return this.onFilterOptionModelChange = true;
    },
    changeFilterBy(item, state) {
      if(item.actionsFilter.low && !item.actionsFilter.high) {
        return item.actionsFilter.high = null, item.actionsFilter.low = null;
      }
      else if(item.actionsFilter.high && !item.actionsFilter.low) {
        return item.actionsFilter.low = true, item.actionsFilter.high = false;
      }
      else {
        return item.actionsFilter.high = true, item.actionsFilter.low = false;
      }
    }
  },
    computed: {
      ...mapGetters({
        likeBooks: "books/getLikedBooks",
        cartBooks: "cart/cartBooksAfterUniq"
      }),
      ...mapState({
        books: state => state.books.books.item,
        booksGenre: 'books/allGenres',
        booksTip(state) {
          let tips = state.books.tips;
          let actionsOnTips = ["", this.addToLikeBooks, this.addToCartBooks]
          let tipsOnActions = state.books.tips.forEach((tip, i) => {
            tip.action = actionsOnTips[i];
          });

          
          return tipsOnActions, state.books.tips;
        },
        allAutors(state) {
          const allBooks = state.books.books.item;
          let allAutors = [];


          allBooks.forEach(book => {
            allAutors.push(book.author);
          });
          allAutors = uniq(allAutors);
          

          return allAutors;
        },

      }),

      filterForBooksCopies() {
        const allBooksNotFiltred = this.books;
        let filteredBooksOnline = [];
        let filteredBooksPhysical = [];
        let filteredBooksAnother = [];
        
        
        allBooksNotFiltred.forEach(book => {
          if(book.copy.physical) {
            filteredBooksPhysical.push(book);
          }
          else if(book.copy.online) {
            filteredBooksOnline.push(book);
          }
          else {
            filteredBooksAnother.push(book);
          }
        });
        
        switch(this.onFilterOptionsModel) {
          case 0: 
            return filteredBooksPhysical;
          case 1: 
            return filteredBooksOnline;
          default:
            return [];
        }
      
      },

      filterForBookPrice() {
        const allBooks = this.books;


        if(this.onFilterOptions[2].actionsFilter.low && !this.onFilterOptions[2].actionsFilter.high) {
          return allBooks.sort((bookA, bookB) => bookA.price - bookB.price);
        }
        else if(this.onFilterOptions[2].actionsFilter.high && !this.onFilterOptions[2].actionsFilter.low) {
          return allBooks.sort((bookA, bookB) => bookB.price - bookA.price);
        }
        return [];
      },
      
      filterForBookRating() {
        const allBooks = this.books;

        if(this.onFilterOptions[3].actionsFilter.low && !this.onFilterOptions[3].actionsFilter.high) {
          return allBooks.sort((bookA, bookB) => bookA.rating - bookB.rating);
        }
        else if(this.onFilterOptions[3].actionsFilter.high && !this.onFilterOptions[3].actionsFilter.low) {
          return allBooks.sort((bookA, bookB) => bookB.rating - bookA.rating);
        }
        return [];
      },

      choseFilter() {
        let finalFiltredBooks = [];

        // choose user select filter
        switch(this.onFilterOptionsModel) {
          case 0:
            finalFiltredBooks = this.filterForBooksCopies;
            break;
          case 1:
            finalFiltredBooks = this.filterForBooksCopies;
            break;
          case 2: 
            if(this.onFilterOptions[2].actionsFilter.low || this.onFilterOptions[2].actionsFilter.high) {
              finalFiltredBooks = this.filterForBookPrice;
              break;
            }
            else {
              finalFiltredBooks = this.books;
              break;
            }
          case 3: 
            if(this.onFilterOptions[3].actionsFilter.low || this.onFilterOptions[3].actionsFilter.high) {
              finalFiltredBooks = this.filterForBookRating;
              break;
            }
            else {
              finalFiltredBooks = this.books;
              break;
            }
          default: 
            finalFiltredBooks = this.books;
            break;
        }
        return finalFiltredBooks;
      },
      badgeContentAfterFilter() {
        let badgeContent = null;

        switch(this.onFilterOptionsModel) {
          case 0:
            badgeContent = "Только физ. копия";
            break; 
          case 1: 
            badgeContent = "Только онлайн копия";
            break;
          case 2:
            if(this.onFilterOptions[2].actionsFilter.low) {
              badgeContent = "Самая дешевая";
              break;
            }
            else if(this.onFilterOptions[2].actionsFilter.high) {
              badgeContent = "Самая дорогая";
              break;
            }
            else {
              badgeContent = null;
              break;
            }
          case 3: 
            if(this.onFilterOptions[3].actionsFilter.low) {
              badgeContent = "Наименьший рейтинг";
              break;
            }
            else if(this.onFilterOptions[3].actionsFilter.high) {
              badgeContent = "Выбор пользователей";
              break;
            }
            else {
              badgeContent = null;
              break; 
            }
          default:
            badgeContent = null;
            break; 
        }
        return badgeContent;
      },
      filterForAuthors() {},
      resizerForImage() {
        let sizeAfterResize = null;

        switch (this.$vuetify.breakpoint.name) {
          case 'xs':
            sizeAfterResize = 95;
            break;
          case 'sm':
            sizeAfterResize = 140;
            break;
          case 'md':
            sizeAfterResize = 150;
            break;
          case 'lg':
            sizeAfterResize = 160;
            break;
        }
        return sizeAfterResize;
      },
    },
  }
</script>
<style scoped lang="scss">
  /* change animation delay for undeline link's (docs css animation-delay) */
  $animation-selected-speed: .5s;
  $animation-line-color: #80DEEA;

  .active-item {
    &-options {
      display: inline-block;
      position: relative !important;
      transition: 2s all;

      &:after {
        animation: selected $animation-selected-speed ease-in-out;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .1rem;
        background-color: currentColor;
      }
    }
  }

  .animate {
    &-selected {
      cursor: pointer !important;
      // append priority on class properties
      display: inline-block;
      position: relative !important;
      transition: 2s all;

      &:after {
        animation: selected $animation-selected-speed ease-in-out;
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: .1rem;
        background-color: $animation-line-color;
      }
    }
  }

  @keyframes selected {
    from {
      width: 0%;
    }

    to {
      width: 100%;
    }
  }

  .carousel {
    &-books {
      display: flex;

      flex: {
        direction: row;
      };
      overflow-x: scroll;
      overflow-y: hidden;
      gap: 2.2rem;
      padding: .2rem;
    }
  }
</style>