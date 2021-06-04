import Books from "./components/Books"
import BooksClass from "./components/BooksClass"
import './App.scss';

function App() {
  return (
    <div className="App">
      {/* Functional Component - uncomment below line to use */}
      {/* <Books /> */}
      
      {/* @ts-ignore */}
     <BooksClass />
    </div>
  );
}

export default App;
