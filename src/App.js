import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'
import axios from 'axios';


function App() {

  let a = useSelector((state) => { return state })
  console.log(a.user)

  return (

    <div className="App">

      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link className='nav-link' to="/">기본페이지</Link>
        </li>
        <li className="nav-item">
          <Link className='nav-link' to="/detail">상세페이지</Link>
        </li>
      </ul>
      <div>hello</div>
      <div>{a.user}</div>
      <Button onClick={() => {
        axios.get('http://localhost:8080/add').then((result) => {
          console.log(result.data)
        })
      }} variant="primary">Primary</Button>




      <Routes>
        <Route path="/" element={<div>기본페이지임</div>} />
        <Route path="/detail" element={<Detail></Detail>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>



    </div>
  );
}

function Detail() {
  return (
    <div>상세페이지임</div>
  )

}

export default App;
