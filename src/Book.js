import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

const Book = (props) => {
	const book = props.bookInfo
	const bookImg = book.imageLinks
		? `url(${book.imageLinks.smallThumbnail})`
		: ''
	return (
		<li>
			<div className='book'>
				<div className='book-top'>
					<div
						className='book-cover'
						style={{
							width: 128,
							height: 188,
							backgroundImage: bookImg,
						}}
					></div>
					<ShelfChanger
						book={book}
						shelf={book.shelf}
						onShelfChange={props.onShelfChange}
					/>
				</div>
				<div className='book-title'>{book.title}</div>
				<div className='book-authors'>
					{book.authors ? book.authors.join(', ') : ''}
				</div>
			</div>
		</li>
	)
}

Book.propTypes = {
	bookInfo: PropTypes.object.isRequired,
	onShelfChange: PropTypes.func.isRequired,
}

export default Book
