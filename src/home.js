/* eslint-disable strict */
// Finds a total count for all the books.
const totalBooksCount = (books) => books.length;

// Finds a total count of all accounts.
const totalAccountsCount = (accounts) => accounts.length;

// Finds a total count of currently borrowed books.
const booksBorrowedCount = (books) => books.filter(book => book.borrows[0].returned === false).length;

// Generates a list of the most common genres.
function getMostCommonGenres(books) {
  const result = [];

  // Loops through the {book} from the [books].
  books.reduce((accumulator, book) => {
    // filters all the genres into different arrays.
    const genres = books.filter(el => el.genre === book.genre).map(element => element.genre);

    // Caps the [result] length to 5 genres and pushes the most common genre to [result].
    if (result.length < 5) {
      result.push({ name: genres[0], count: genres.length });
    }
    return accumulator;
  }, 0);

  // Returns the [result] sort from most to least common.
  return result.sort((element1, element2) => element2.count - element1.count);
}

// Generates a list of most popular books.
function getMostPopularBooks(books) {
  let result = [];

  // Sorts the [books] by popularity. Loops through the sorted array and adds the 5 most popular books to the [result].
  books.sort((book1, book2) => book2.borrows.length - book1.borrows.length).forEach(book => {

    // Caps the array length to 5 elements.
    if (result.length < 5) {
      result.push({ name: book.title, count: book.borrows.length });
    }
  });

  // Return the final result.
  return result;
}

// Generates a list of the most popular Author.
function getMostPopularAuthors(books, authors) {
  const result = [];

  // Iterating through each {author} in the [authors]
  authors.forEach(author => {

    // Filters books array by author.
    const filtered = books.filter(book => book.authorId === author.id);

    // Retreives the first and last name of the author.
    const authorName = `${author.name.first} ${author.name.last}`;

    // Sums the amount the author's books have been borrowed.
    const count = filtered.reduce((accumulator, book) => {
      return accumulator + book.borrows.length;
    }, 0);

    // Adds the authors into the [result].
    result.push({ name: authorName, count: count });
  });

  // returns the 5 most popular authors.
  return result.sort((author1, author2) => author2.count - author1.count).slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
