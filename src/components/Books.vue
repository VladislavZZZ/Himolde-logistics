<template>

<div v-if="activeAddBookModal" class="modal-backdrop fade show"></div>
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <h1>Poblems Menu</h1>
          <hr><br><br>
          <alert :message=message v-if="showMessage"></alert>
          <table id="activeEvents">
            <div class="container d-flex justify-content-center align-items-center vh-100">
                <div>
                <button
                    v-for="(page, index) in pages"
                    :key="index"
                    @click="navigateToPage(page)"
                    class="btn btn-primary btn-block mb-2"
                >
                    {{ page.name }}
                </button>
                </div>
            </div>
    </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
 import axios from 'axios';
 import Alert from './Alert.vue';


export default {
  data() {
    return {
      activeAddBookModal: false,
      addBookForm: {
        title: '',
        author: '',
        read: [],
        pages: [
          { name: "Page 1", route: "page1.html" },
          { name: "Page 2", route: "page2.html" },
          { name: "Page 3", route: "page3.html" },
        ],
      },
      books: [],
      message: '',
      showMessage: false,
    };
  },
  components:{
    alert: Alert,
  },
  methods: {
    addBook(payload) {
      const path = 'http://127.0.0.1:5000/books';
      axios.post(path, payload)
        .then(() => {
          this.getBooks();
          this.message = 'Book added!';
          this.showMessage = true;
        })
        .catch((error) => {

          console.log(error);
          this.getBooks();
        });
    },
    getBooks() {
      const path = 'http://127.0.0.1:5000/books';
      axios.get(path)
        .then((res) => {
          this.books = res.data.books;
        })
        .catch((error) => {

          console.error(error);
        });
    },
    handleAddReset() {
      this.initForm();
    },
    handleAddSubmit() {
      this.toggleAddBookModal();
      let read = false;
      if (this.addBookForm.read[0]) {
        read = true;
      }
      const payload = {
        title: this.addBookForm.title,
        author: this.addBookForm.author,
        read, // property shorthand
      };
      this.addBook(payload);
      this.initForm();
    },
    initForm() {
      this.addBookForm.title = '';
      this.addBookForm.author = '';
      this.addBookForm.read = [];
    },
    toggleAddBookModal() {
      const body = document.querySelector('body');
      this.activeAddBookModal = !this.activeAddBookModal;
      if (this.activeAddBookModal) {
        body.classList.add('modal-open');
      } else {
        body.classList.remove('modal-open');
      }
    },
  },
  created() {
    this.getBooks();
  },
};
  </script>