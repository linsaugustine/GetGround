export interface Book {
    id: number,
    book_author: string[],
    book_title: string,
    book_publication_year: number,
    book_publication_country: string,
    book_publication_city: string,
    book_pages: number
}

export default interface ResponseData {
    books: Book[],
    count: number
}

export interface Start {
    type: string
}

export interface Success {
    type: string,
    payload: {
        data: ResponseData
    }
}

export interface Failure {
    type: string,
    payload: {
        error: any
    }
}

export type Action = Start | Success | Failure
  