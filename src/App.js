import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import BookSearch from './BookSearch'
import * as BookUtils from './utils/BookUtils'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount = () => {
    if(this.state.newBook){
      this.refreshBooks();
    }
  }

  refreshBooks = () => {
    BooksAPI
      .getAll()
      .then((list) => {
        this.setState({
          books: BookUtils.sortBooks(list),
          newBook: false
        });
      });
  }

  changeShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(response => {
        let newList = this
          .state
          .books
          .slice(0);
          const books = newList.filter(listBook => listBook.id === book.id);
          if(books.length){
            books[0].shelf = shelf;
          }
          else{
            newList.push(book);
            newList = BookUtils.sortBooks(newList);
          }
          this.setState({books: newList});
      })
  }

  render(){
    return(
      <div className="app">
        <Route 
          exact path='/'
          render={(() => (<BookCase 
            books={this.state.books}
            onChangeShelf={this.changeShelf}
            onRefreshBooks={this.refreshBooks}/>))} />

        <Route 
          exact path='/search'
          render={(() => (<BookSearch 
            selectedBooks={this.state.books}
            onChangeShelf={this.changeShelf}/>))}
        />
      </div>
      )
  }
}

export default BooksApp
