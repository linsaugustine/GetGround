import ResponseData, { Action, Success, Failure } from "../Types"

export interface State {
  isFetching: boolean,
  data: ResponseData,
  error: any
}

export const initialState: State = {
  isFetching: false,
  data: { books: [], count: 0 },
  error: null
}

export default function books(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "GET_BOOKS_START":
      return {
        ...state,
        isFetching: true,
        error: null
      }
    case "GET_BOOKS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        data: (action as Success).payload.data,
        error: null
      }
    case "GET_BOOKS_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: (action as Failure).payload.error
      }
    default:
      return state
  }
}
