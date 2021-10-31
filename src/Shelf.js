import React from 'react'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'

const Shelf = (props) => {
	return (
		<div className='bookshelf'>
			<h2 className='bookshelf-title'>{props.shelfTitle}</h2>
			<ListBooks
				className='bookshelf-books'
				books={props.books}
				onShelfChange={props.onShelfChange}
			/>
		</div>
	)
}

Shelf.propTypes = {
	shelfTitle: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onShelfChange: PropTypes.func.isRequired,
}

export default Shelf
