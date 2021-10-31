import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import AddBook from './AddBook'
import { Link, Route } from 'react-router-dom'

class BooksApp extends React.Component {
	state = { currentlyReading: [], wantToRead: [], read: [] }

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState(() => ({
				currentlyReading: books.filter((b) => b.shelf === 'currentlyReading'),
				wantToRead: books.filter((b) => b.shelf === 'wantToRead'),
				read: books.filter((b) => b.shelf === 'read'),
			}))
		})
	}

	handleShelfChange = (book, shelf) => {
		BooksAPI.update(book, shelf).then((results) => {
			if (shelf === 'none') {
				this.setState((currentState) => ({
					[book.shelf]: currentState[book.shelf].filter(
						(b) => b.id !== book.id
					),
				}))
			} else {
				const oldShelf = book.shelf
				book.shelf = shelf
				if (oldShelf === 'none') {
					this.setState((currentState) => ({
						[shelf]: [...currentState[shelf], book],
					}))
				} else {
					this.setState((currentState) => ({
						[oldShelf]: currentState[oldShelf].filter((b) => b.id !== book.id),
						[shelf]: [...currentState[shelf], book],
					}))
				}
			}
		})
	}

	render() {
		return (
			<div className='app'>
				<Route
					path='/search'
					render={() => (
						<AddBook
							books={this.state}
							onShelfChange={this.handleShelfChange}
						/>
					)}
				/>
				<Route
					exact
					path='/'
					render={() => (
						<div className='list-books'>
							<div className='list-books-title'>
								<h1>MyReads</h1>
							</div>
							<div className='list-books-content'>
								<Shelf
									shelfTitle='Currently Reading'
									books={this.state.currentlyReading}
									onShelfChange={this.handleShelfChange}
								/>
								<Shelf
									shelfTitle='Want to Read'
									books={this.state.wantToRead}
									onShelfChange={this.handleShelfChange}
								/>
								<Shelf
									shelfTitle='Read'
									books={this.state.read}
									onShelfChange={this.handleShelfChange}
								/>
							</div>
							<Link to='/search' className='open-search'>
								Add a book
							</Link>
						</div>
					)}
				/>
			</div>
		)
	}
}

export default BooksApp
