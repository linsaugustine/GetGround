import { PureComponent } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Book } from "../Types"
import getStudies from "../actionCreators/books"
import "./Books.scss"

type OwnState = {
    pageNumber: number
  }

type StateProps = {
    books: Book[],
    totalPages: number,
    isFetching: boolean
}

type DispatchProps = {
    getStudies: (page: number, itemsPerPage: number) => any
}

type Props = StateProps & DispatchProps
const itemsPerPage = 20

export class BooksClass extends PureComponent<Props, OwnState> {
    query = new URLSearchParams(window.location.search)

    constructor(props: Props) {
        super(props)
        this.state = { pageNumber: parseInt(this.query.get("page")?.toString() || "1") }
    }

    componentDidMount() {
        if (!this.query.get("page")) {
            this.query.set("page", "1")
            window.location.href = `${window.location.href}?${this.query.toString()}`
        }
        this.props.getStudies(this.state.pageNumber, itemsPerPage)
    }

    setPageQueryString = (queryStr: URLSearchParams, page: number) => {
        queryStr.set("page", page.toString())
        window.history.replaceState( {}, "", `?${queryStr.toString()}`);
    }

    handlePageClick = (action: string) => {
        let newPage = this.state.pageNumber

        switch (action) {
          case "first":
            newPage = 1
            break 
          case "previous":
            newPage = newPage > 1 ? --newPage : 1
            break
            case "next":
              newPage = newPage < this.props.totalPages ? ++newPage : this.props.totalPages
              break 
            case "last":
              newPage = this.props.totalPages
              break     
            default:
              break  
        }
    
        this.setState({ pageNumber: newPage })
        this.props.getStudies(newPage, itemsPerPage)
        this.setPageQueryString(this.query, newPage)
      }

    render() {
        return ( this.props.isFetching === true 
            ?  <div className="loading">Loading........</div>
            : (
        <div className="books">
            <div className="nav">
                <button disabled={this.state.pageNumber === 1 ? true : false}  onClick={() => this.handlePageClick("first")}>First</button>
                <button disabled={this.state.pageNumber === 1 ? true : false} onClick={() => this.handlePageClick("previous")}>Previous</button>
                <input type="number" value={this.state.pageNumber} readOnly></input>{` of ${this.props.totalPages}  `}
                <button disabled={this.state.pageNumber === this.props.totalPages ? true : false} onClick={() => this.handlePageClick("next")}>Next</button>
                <button disabled={this.state.pageNumber === this.props.totalPages ? true : false} onClick={() => this.handlePageClick("last")}>Last</button>
            </div>
            <div className="books-details">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Pages</th>
                            <th>City</th>
                            <th>Country</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    {this.props.books && this.props.books.map(book => {
                        return (
                            <tbody key={book.id}>
                                <tr>
                                    <td>{book.id}</td>
                                    <td className="title">{book.book_title}</td>
                                    <td className="author">{book.book_author.join(",")}</td>
                                    <td>{book.book_pages}</td>
                                    <td>{book.book_publication_city}</td>
                                    <td>{book.book_publication_country}</td>
                                    <td>{book.book_publication_year}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
        ))
    }
}

const mapStateToProps = (state: any) => {
    const {  data: { books, count }, isFetching } = state
    return { books, totalPages: Math.ceil(count/itemsPerPage), isFetching }
}

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return bindActionCreators({getStudies}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksClass)