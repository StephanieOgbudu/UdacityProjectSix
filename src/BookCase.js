import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import BookShelf from "./BookShelf"

class BookCase extends Component {
    state = {}

    componentDidMount = () => {
        this
            .props
            .onRefreshBooks();
    }

    updateShelves = () => {
        // Update the state of the individual shelves to contain the appropriate books
        // for each
        const currentRead = {
            name: "Currently Reading",
            books: this
                .props
                .books
                .filter(book => book.shelf === 'currentlyReading')
        };
        const wantRead = {
            name: "Want to Read",
            books: this
                .props
                .books
                .filter(book => book.shelf === "wantToRead")
        };
        const newRead = {
            name: "Read",
            books: this
                .props
                .books
                .filter(book => book.shelf === "read")
        };

        return ([currentRead, wantRead, newRead]);
    }

    render() {
        let shelves = [];
        if (this.props.books && this.props.books.length) 
            shelves = this.updateShelves();
        
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelves && shelves.map((shelf) => (<BookShelf
                                key={shelf.name}
                                shelf={shelf}
                                onChangeShelf={this.props.onChangeShelf}
                            />))}
                        </div>
                    </div>
                    <button className="open-search">
                        <Link to='/search'>Add Book</Link>
                    </button>
                </div>
            </div>
        )
    }
}

export default BookCase
