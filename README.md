# MyReads Project

The project is a book tracking application that consists of two pages: a main page and a search page. The main page has 3 shelves: `Currently Reading`, `Want to Read` and `Read`. A book is shown with its title and all of its authors and can be moved between shelves. The search page lets users look for books and place them in a certain shelf. Any changes made to books on the search page are reflected on the main page once the user navigates back to it.

## Installation and launch instructions

- install all project dependencies with `npm install`
- start the development server with `npm start`

## Project files

```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── AddBook.js # The Component that renders the search page
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of your app.
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── Book.js # The Component that renders a book (its title, authors and image)
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for the app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # Modified this file to be able to use BrowserRouter
    └── ListBooks.js # The component that lists all the books in a provided array
    └── Shelf.js # The Component that renders a shelf (its name and all the books it contains)
    └── ShelfChanger.js # The Component that renders the control that allows users to switch between shelves
```

## AddBook

This component renders the search page. Has an input bar and lists the search results, using the `ListBooks` component.

### AddBook - props

- books: `<Object>` that contains the books that are currently on one of the 3 shelves. It's passed down to `ListBooks`
- onShelfChange: function that is used to switch a book between shelves. It's not called in this component, just passed further to the `ListBooks` child component

Has only one method: `handleSearch`.

### `handleSearch`

Method Signature:

```js
handleSearch(query)
```

- query: `<String>` contains the input from the user
- Calls the `search` method from the BooksApi and modifies the books property of the component's state based on these results

## Book

This component renders a book instance: its image, title and authors. It also has a child component `ShelfChanger` that is used to switch a book between shelves.

### Book - props

- bookInfo: `<Object>` containing at minimum an `id` attribute
- onShelfChange: function that is used to switch a book between shelves. It's not called in this component, just passed further to the `ShelfChanger` child component

## ListBooks

This component renders the books in a provided list. For each book in the list renders a `Book` child component with its own key( the key is equal to the book id).

### ListBooks - props

- books: `<Array>` that contains all the books returned by the search
- shelvedBooks: `<Object>` that contains the books that are currently on one of the 3 shelves.
- onShelfChange: function that is used to switch a book between shelves. It's not called in this component, just passed further to the `Book` child component

Has two methods: `isOnShelf` and `setShelf`.

### `isOnShelf`

Method Signature:

```js
isOnShelf(book, shelf)
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Verifies if the book is already on the shelf
- Returns true if it found the book on the shelf, otherwise returns false

### `setShelf`

Method Signature:

```js
setShelf(book)
```

- book: `<Object>` containing at minimum an `id` attribute
- Uses the `isOnShelf` method to verify if the book is on a shelf in the main page and selects the correct shelf. Selects `None` otherwise.
- Returns the book object with the correct shelf selected

## Shelf

This component renders a shelf: its title and a `ListBooks` component for the books on this shelf

### Shelf - props

- shelfTitle: `<String>` containing the title of the shelf. One of: `Currently Reading`, `Want to Read` and `Read`
- books: `<Array>` that contains all the books on this shelf
- onShelfChange: function that is used to switch a book between shelves. It's not called in this component, just passed further to the `ListBooks` child component

## ShelfChanger

This component renders the control that allows a book to change its shelf. The actual change is done by the `App` component

### ShelfChanger - props

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- onShelfChange: function that is used to switch a book between shelves.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

- [`getAll`](#getall)
- [`update`](#update)
- [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

- book: `<Object>` containing at minimum an `id` attribute
- shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
- Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

- query: `<String>`
- maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
- Returns a Promise which resolves to a JSON object containing a collection of book objects.
- These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important

The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
