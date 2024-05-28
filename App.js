import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Details from './Details';
import './App.css';
import Form from './form';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Form/>}></Route>
        <Route path='/details' element={<Details/>}></Route>
      </Routes>
      </BrowserRouter>
     </div>
  );
}

export default App;
