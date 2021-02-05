/* eslint-disable strict */
/* eslint-disable no-console */

// Locates author from the [authors] by ID.
const findAuthorById = (authors, id) => authors.find(author => author.id === id);

// Locates a book from the [books] by ID.
const findBookById = (books, id) => books.find(book => book.id === id);

// Creates 2 arrays dependings on the returned status of a book. [[Not Available], [Available]]
const partitionBooksByBorrowedStatus = (books) => [books.filter(book => !book.borrows[0].returned), books.filter(book => book.borrows[0].returned)];

// Generates a list of previous borrowers from a selected book.
function getBorrowersForBook(book, accounts) {
  let result = [];

  // Looping through the [accounts].
  accounts.reduce((accountAcc, account) => {

    // Looping through the [books].
    const borrower = book.borrows.reduce((borrowAcc, borrow) => {

      // pushing borrower account when matched to the borrow log
      if (account.id === borrow.id) {
        account.returned = borrow.returned;
        result.push(account);
        return borrowAcc++;
      }
      return borrowAcc;
    }, 0);
    return accountAcc + borrower;
  }, 0);

  // returns [result] sorted placing the current borrower at the top of the list. Limit borrow history to 10.
  return result.sort((user1, user2) => user1.returned - user2.returned).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
