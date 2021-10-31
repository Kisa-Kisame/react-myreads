import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class ListBooks extends Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		shelvedBooks: PropTypes.object,
		onShelfChange: PropTypes.func.isRequired,
	}

	isOnShelf = (book, shelf) => {
		const filteredBooks = this.props.shelvedBooks[shelf].filter(
			(b) => b.id === book.id
		)
		return filteredBooks.length === 1
	}

	setShelf = (book) => {
		switch (true) {
			case this.isOnShelf(book, 'currentlyReading'):
				book.shelf = 'currentlyReading'
				break
			case this.isOnShelf(book, 'wantToRead'):
				book.shelf = 'wantToRead'
				break
			case this.isOnShelf(book, 'read'):
				book.shelf = 'read'
				break
			default:
				book.shelf = 'none'
				break
		}
		return book
	}

	render() {
		const books =
			this.props.shelvedBooks && this.props.books !== []
				? this.props.books.map((b) => this.setShelf(b))
				: this.props.books
		return (
			<ol className='books-grid'>
				{books.map((book) => (
					<Book
						key={book.id}
						bookInfo={book}
						onShelfChange={this.props.onShelfChange}
					/>
				))}
			</ol>
		)
	}
}

export default ListBooks
