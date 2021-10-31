import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import { debounce } from 'throttle-debounce'

class AddBook extends Component {
	static propTypes = {
		books: PropTypes.object.isRequired,
		onShelfChange: PropTypes.func.isRequired,
	}

	state = {
		books: [],
	}

	handleSearch = (query) => {
		if (query !== '') {
			BooksAPI.search(query, 20).then((results) => {
				if (results && !results.error) {
					this.setState(() => ({
						books: results,
					}))
				} else {
					this.setState(() => ({
						books: [],
					}))
				}
			})
		} else {
			this.setState(() => ({
				books: [],
			}))
		}
	}

	render() {
		return (
			<div className='search-books'>
				<div className='search-books-bar'>
					<Link to='/' className='close-search'>
						Close
					</Link>
					<div className='search-books-input-wrapper'>
						<input
							type='text'
							placeholder='Search by title or author'
							ref={(input) => {
								this.textInput = input
							}}
							onChange={debounce(500, () =>
								this.handleSearch(this.textInput.value)
							)}
						/>
					</div>
				</div>
				<ListBooks
					className='search-books-results'
					books={this.state.books}
					shelvedBooks={this.props.books}
					onShelfChange={this.props.onShelfChange}
				/>
			</div>
		)
	}
}

export default AddBook
