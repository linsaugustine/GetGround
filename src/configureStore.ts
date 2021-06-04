import { createStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { createLogger } from "redux-logger"
import reducer from "./reducers/books"

const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV === "development") {
  //@ts-ignore
  middlewares.push(createLogger())
}

export default function configureStore(): any {
  return createStore(reducer, applyMiddleware(...middlewares))
}
