import ResponseData, { Action  } from "../Types"
import * as API from "../ApiClients/books"

function start(): Action {
  return {
    type: "GET_BOOKS_START"
  }
}

function success(data: ResponseData): Action {
  return {
    type: "GET_BOOKS_SUCCESS",
    payload: {
      data
    }
  }
}

function failure(error: any): Action {
  return {
    type: "GET_BOOKS_FAILURE",
    payload: {
      error
    }
  }
}

export default function getBooks(page: number, itemsPerPage: number) {
  return (dispatch: any) => {
    dispatch(start())
    return API.getBooks(page, itemsPerPage)
      .then(res => {
        dispatch(success(res))
      })
      .catch(error => {
        dispatch(failure(error))
      })
  }
}
