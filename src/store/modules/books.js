// import img for dev
import adventureGarretCover from '../../assets/Приключение-Гаррета.webp';
import darkestSquad from '../../assets/Черный-отряд.webp';


// import loadash func
import { filter, findIndex, uniqBy } from 'lodash';


const state = () => ({
  tips: [
    {
      name: "comments",
      icon: "comment",
      text: "Посмотреть отзывы"
    },
    {
      name: "like",
      icon: "heart-plus",
      text: "Добавить в любимые"
    },
    {
      name: "cart",
      icon: "cart",
      text: "Добавить в корзину"
    },
  ],
  allGenres: [
    {
      text: "Фентези",
      name: "Fantasy",
      icon: "fencing"
    },
    {
      text: "Юмористическое",
      name: "Funny",
      icon: "emoticon-excited-outline"
    },
    {
      text: "Темное",
      name: "Darkness",
      icon: "moon-full"      
    }
  ],
  books: {
    item: [{
        id: 0,
        title: "Приключение Гаррета",
        genre: [{
            text: "Фентези",
            name: "Fantasy",
            icon: "fencing"
          },
          {
            text: "Юмористическое",
            name: "Funny",
            icon: "emoticon-excited-outline"
          },
        ],
        cover: adventureGarretCover,
        author: "Глен Кук",
        description: `
            Действие книги разворачивается в вымышленном мире, городе Танфере. Эта территория принадлежит королевству Карента. 
            Здесь живут эльфы, вампиры кентавры и прочие фантастические существа.
            Главный персонаж – частный детектив Гаррет. Ему предстоит расследовать множество запутанных дел. 
            Вместе со своим помощником Покойником детектив берется за разнообразную работу…
          `,
        rating: 4.5,
        price: 100,
        copy: {
          online: true,
          physical: false
        },
        onLike: false,
        onCart: true,
        onPaid: false,
      },
      {
        id: 1,
        title: "Черный отряд",
        subtitle: "Хроники",
        genre: [{
            text: "Фентези",
            name: "Fantasy",
            icon: "fencing"
          },
          {
            text: "Темное",
            name: "Darkness",
            icon: "moon-full"
          },
        ],
        cover: darkestSquad,
        author: "Глен Кук",
        description: `
            Тьма сражается с тьмой, а Черный Отряд кочует из страны в страну и нанимается к тем, кто готов платить & хоть за доблестную битву,
            хоть за кровавую расправу. В целом мире не сыщется равных этим суровым, закаленным воинам, 
            привыкшим свои сомнения хоронить вместе со своими павшими
            братьями. Уже не счесть, который раз они сменили хозяина. Теперь их в бой посылает чудовищная Госпожа, 
            а в подручных у нее самые могущественные колдуны & Десять Взятых.
          `,
        rating: 5,
        price: 200,
        copy: {
          online: false,
          physical: true,
        },
        onLike: true,
        onCart: false,
        onPaid: true,
      }
    ]
  },
  deletedOnLikeBooks: [],
  deletedOnCartBooks: [],
  deletedOnPaidBooks: [],
});


const getters = {
  getLikedBooks: state => {
    return filter(state.books.item, (book) => { return book.onLike });
  },
  getCartBooks: state => {
    return filter(state.books.item, (book) => { return book.onCart });
  },
  getPaidBooks: state => {
    // for dev
    let filterBooksOnPaid = filter(state.books.item, (book) => { return book.onPaid });
    let addDeliverStatistic = filterBooksOnPaid.forEach(book => {
      let randStatDeliver = Math.floor(Math.random() * 100);
      book.deliverStatistic = randStatDeliver;
    });
    return filterBooksOnPaid;
  },

  
  getDeletedLikeBooks: (state, getters) => {
    return uniqBy(state.deletedOnLikeBooks, "id");
  },
  getDeletedCartBooks: state => {
    return uniqBy(state.deletedOnCartBooks, "id");
  },
  getDeletedPaidBooks: state => {
    return uniqBy(state.deletedOnPaidBooks, "id");
  }
};


const actions = {
  // some up to bd like, paid, cart and another books
};


const mutations = {
  // add mutations
  /* payload is not books.item.id is index array state.books.id */
  likeABook(state, payload) {
    return state.books.item[payload].onLike = true;
  },
  cartABook(state, payload) {
    return state.books.item[payload].onCart = true;
  },


  // delete mutation
  /* payload must be a book obj (title, author and etc), not index on books array */
  deleteOfLikedBooks(state, payload) {
    let findIndexToRemoveBook = findIndex(state.books.item, (bookToRemove) => { return bookToRemove.id === payload.id });

    state.books.item[findIndexToRemoveBook].onLike = false;

    return state.deletedOnLikeBooks.push(payload);
  },
  deleteOfCartedBooks(state, payload) {
    let findIndexToRemoveBook = findIndex(state.books.item, (bookToRemove) => { return bookToRemove.id === payload.id });

    state.books.item[findIndexToRemoveBook].onCart = false;


    return state.deletedOnCartBooks.push(payload);
  },
  deleteOfPaidBooks(state, payload) {
    let findIndexToRemoveBook = findIndex(state.books.item, (bookToRemove) => { return bookToRemove.id === payload.id });

    state.books.item[findIndexToRemoveBook].onPaid = false;

    return state.deletedOfPaidBooks.push(payload);
  }, 


  // undo mutation
  /* payload must be a book obj (title, author and etc), not index on books array */
  undoDeleteLikedBooks(state, payload) {
    let findIndexOfUndoBook = findIndex(state.deletedOnLikeBooks, (bookToUndo) => { return bookToUndo.id === payload.id });
    let findIndexOfAllBooks = findIndex(state.books.item, (book) => { return book.id === payload.id });

    state.books.item[findIndexOfAllBooks].onLike = true;

    return state.deletedOnLikeBooks.splice(findIndexOfUndoBook, 1);
  },
  undoDeleteCartedBooks(state, payload) {
    let findIndexOfUndoBook = findIndex(state.deletedOnCartBooks, (bookToUndo) => { return bookToUndo.id === payload.id });
    let findIndexOfAllBooks = findIndex(state.books.item, (book) => { return book.id === payload.id });

    state.books.item[findIndexOfAllBooks].onCart = true;

    return state.deletedOnCartBooks.splice(findIndexOfUndoBook, 1);
  },
  undoDeletePaidBooks(state, payload) {
    let findIndexOfUndoBook = findIndex(state.deletedOnPaidBooks, (bookToUndo) => { return bookToUndo.id === payload.id });
    let findIndexOfAllBooks = findIndex(state.books.item, (book) => { return book.id === payload.id });

    state.books.item[findIndexOfAllBooks].onPaid = true;

    return state.deletedOnPaidBooks.splice(findIndexOfUndoBook, 1);
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}