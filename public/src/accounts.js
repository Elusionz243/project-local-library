/* eslint-disable strict */

// Locates an account by a provided ID.
const findAccountById = (accounts, id) => accounts.find(accountID => accountID.id === id);

// Sorts [accounts] alphabetically by the accounts last name.
const sortAccountsByLastName = (accounts) => accounts.sort((accountA, accountB) => 
  accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);

// Finds the number of times an account has borrowed from the library.
const numberOfBorrows = (account, books) => books.reduce((acc, book) => {
  const total = book.borrows.reduce((borrowAcc, borrowed) => {
    return borrowed.id === account.id ? borrowAcc + 1 : borrowAcc;
  }, 0);
  return acc + total;
}, 0);

// Locates all the books an account has borrowed. Uses getAuthor() function.
const getBooksPossessedByAccount = (account, books, authors) => getAuthor(authors, books).filter((book) => 
  book.borrows.find(borrow => borrow.id === account.id && !borrow.returned));

// Helper Function: getAuthor() returns a copy of the [books] and adds the authors first and last name.
function getAuthor(authors, books) {
  let result = [];
  // Cycles through the [authors] and [books].
  authors.reduce((authorAcc, author) => {
    const addAuthor = books.reduce((bookAcc, book) => {
      const { authorId } = book;
      const { id } = author;

      // Checks if any of the author id's match the book's author id. Adds the author to a new book object and pushes it to the [result].
      if (authorId === id) {
        book.author = author;
        result.push(book);
        bookAcc++;
      }
      return bookAcc;
    }, 0);
    return authorAcc + addAuthor;
  });
  // returns an array of books with the authors inside.
  return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
