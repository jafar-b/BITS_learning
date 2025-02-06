/* Task: Create an object bookLibrary to manage a collection of books.
The object should have the following properties and methods:
books: An array of book objects (each book has title, author, and yearPublished).
addBook(book): Adds a new book to the collection.
getBooksByAuthor(author): Returns all books by a given author.
removeBook(title): Removes a book by title.
Add a method getAllBooks to return a list of all book titles.

*/

const bookLibrary = {
  books: [],
  getAllBooks: function () {
    return this.books.map((book) => book.title);
  },

  addBook: function (book) {
    this.books.push(book);
    console.log(`Book ${book.title} added successfully`);
  },
  getBooksByAuthor: function (author) {
    if (author) {
     console.log(`The books by author ${author} are:`);
     
        return this.books.filter((book) => book.author === author).map((book)=>book.title);
    }
  },
  removeBook: function (title) {
    this.books = this.books.filter((book) => book.title !== title);
    console.log(`${title} deleted, new books array is:`, this.getAllBooks());
  },
};

bookLibrary.addBook({
  title: "Book1",
  author: "Jafar",
  yearPubliched: 2019,
});
bookLibrary.addBook({
  title: "book2",
  author: "Jafar",
  yearPubliched: 2022,
});
console.log(bookLibrary.getBooksByAuthor("Jafar"));

bookLibrary.removeBook("Book1");

// //output: 
// Book Book1 added successfully
// Book book2 added successfully
// The books by author Jafar are:
// [ 'Book1', 'book2' ]
// Book1 deleted, new books array is: [ 'book2' ]