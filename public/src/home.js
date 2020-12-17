/* eslint-disable strict */

// Finds a total count for all the books.
const totalBooksCount = (books) => books.length;

// Finds a total count of all accounts.
const totalAccountsCount = (accounts) => accounts.length;

// Finds a total count of currently borrowed books.
const booksBorrowedCount = (books) => books.filter(book => !book.borrows[0].returned).length;

// Generates a list of the most common genres.
function getMostCommonGenres(books) {
  const allGenres = [];

  // Adds {name: <genre name>, count: <genre totalCount> } to [allGenres].
  books.reduce((accumulator, book) => {
    const genreArr = books.filter(book1 => book1.genre === book.genre).map(book2 => book2.genre);
    allGenres.push({ name: genreArr[0], count: genreArr.length });
    return accumulator;
  }, 0);

  // Removes Duplicates from [allGenres]
  const result = allGenres.filter((genre, index, self) => index === self.findIndex((temp) => temp.name === genre.name && temp.count === genre.count));

  // Sorts [results] and caps the output to 5 genres.
  return result.sort((genre1, genre2) => genre2.count - genre1.count).slice(0, 5);
}

// Generates a list of most popular books.
function getMostPopularBooks(books) {
  let result = [];

  // Sorts the [books] by popularity. Loops through the sorted array and adds the 5 most popular books to the [result].
  books.sort((book1, book2) => book2.borrows.length - book1.borrows.length).forEach(book => {
    result.push({ name: book.title, count: book.borrows.length });
  });

  // Returns the final result, Removes Duplicates, and only shows the top 5 books. 
  const finalResult = result.filter((book, index, self) => index === self.findIndex((temp) => temp.name === book.name && temp.count === book.count)).slice(0, 5);
  return finalResult;
  
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
