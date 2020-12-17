/* eslint-disable strict */
/* eslint-disable no-console */

// Locates author from the [authors] by ID.
const findAuthorById = (authors, id) => authors.find(author => author.id === id);

// Locates a book from the [books] by ID.
const findBookById = (books, id) => books.find(book => book.id === id);

// Creates 2 arrays dependings on the returned status of a book. [[Not Available], [Available]]
const partitionBooksByBorrowedStatus = (books) => 
  [books.filter(book => !book.borrows[0].returned),
    books.filter(book => book.borrows[0].returned)];

// Generates a list of previous borrowers from a selected book.
function getBorrowersForBook(book, accounts) {
  let result = [];

  // Looping through the [accounts].
  accounts.reduce((accountAccumulator, account) => {

    // Looping through the [books].
    const count = book.borrows.reduce((borrowAccumulator, borrower) => {

      // Destructuring {account} for 'id' variable.
      const { id } = account;

      // pushing borrower account when matched to the borrow history.
      if (id === borrower.id) {
        account.returned = borrower.returned;
        result.push(account);
        return borrowAccumulator++;
      }
      return borrowAccumulator;
    }, 0);
    return accountAccumulator + count;
  }, 0);

  // returns [result] sorted placing the current borrower at the top of the list. Limit borrow history to 10.
  return result.sort((currentBorrower, previousBorrowers) => currentBorrower.returned - previousBorrowers.returned).slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
