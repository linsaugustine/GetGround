import reducer, { initialState } from "../books"
import { responseBody } from "../../../mock_data/mockData"

describe("books", () => {
  it("should handle unknown actions", () => {
    const actualState = reducer(initialState, {
      type: "TEST"
    })
    expect(actualState).toEqual(initialState)
  })

  it("should handle GET_BOOKS_START actions", () => {
    const actualState = reducer(initialState, {
      type: "GET_BOOKS_START"
    })
    const expectedState = { ...initialState, isFetching: true, error: null }
    expect(actualState).toEqual(expectedState)
  })

  it("should handle GET_BOOKS_SUCCESS actions", () => {
    const actualState = reducer(initialState, {
      type: "GET_BOOKS_SUCCESS",
      payload: {
        data: responseBody
      }
    })
    const expectedState = {
      ...initialState,
      isFetching: false,
      data: responseBody,
      error: null
    }
    expect(actualState).toEqual(expectedState)
  })

  it("should handle GET_BOOKS_FAILURE actions", () => {
    const error = {
      message: "error"
    }

    const actualState = reducer(initialState, {
      type: "GET_BOOKS_FAILURE",
      payload: {
        error
      }
    })

    const expectedState = {
      ...initialState,
      isFetching: false,
      error
    }

    expect(actualState).toEqual(expectedState)
  })
})
