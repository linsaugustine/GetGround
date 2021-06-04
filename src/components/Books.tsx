import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import getBooks from "../actionCreators/books"
import { Book } from "../Types"
import "./Books.scss"

const Books: React.FC = (props): JSX.Element => {
    const query = new URLSearchParams(window.location.search)

    const itemsPerPage = 20
    const dispatch = useDispatch()
    const [pageNumber, setPageNumber] = useState(parseInt(query.get("page")?.toString() || "1"))

    //@ts-ignore
    const books: Book[] = useSelector(state => state.data.books)
    //@ts-ignore
    const totalPages: number = Math.ceil(useSelector(state => state.data.count)/itemsPerPage) 
    //@ts-ignore
    const isFetching: boolean = useSelector(state => state.isFetching)

    useEffect(() => {
        if (!query.get("page")) {
            query.set("page", "1")
            window.location.href = `${window.location.href}?${query.toString()}`
        }
    }, [])

    useEffect(() => {
        dispatch(getBooks(pageNumber, itemsPerPage))
    }, [pageNumber])

    const handlePageClick = (action: string) => {
        let newPage = pageNumber

        switch (action) {
          case "first":
            newPage = 1
            break 
          case "previous":
            newPage = newPage > 1 ? --newPage : 1
            break
            case "next":
              newPage = newPage < totalPages ? ++newPage : totalPages
              break 
            case "last":
              newPage = totalPages
              break     
            default:
              break  
        }
    
        setPageNumber(() => newPage)
        setPageQueryString(query, newPage)
      }

      const setPageQueryString = (queryStr: URLSearchParams, page: number) => {
        queryStr.set("page", page.toString())
        window.history.replaceState( {}, "", `?${queryStr.toString()}`);
      }
    
    return ( isFetching === true 
        ?  <div className="loading">Loading........</div>
        : (
    <div className="books">
        <div className="nav">
            <button disabled={pageNumber === 1 ? true : false}  onClick={() => handlePageClick("first")}>First</button>
            <button disabled={pageNumber === 1 ? true : false} onClick={() => handlePageClick("previous")}>Previous</button>
            <input type="number" value={pageNumber} readOnly></input>{` of ${totalPages}  `}
            <button disabled={pageNumber === totalPages ? true : false} onClick={() => handlePageClick("next")}>Next</button>
            <button disabled={pageNumber === totalPages ? true : false} onClick={() => handlePageClick("last")}>Last</button>
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
                {books && books.map(book => {
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

export default Books