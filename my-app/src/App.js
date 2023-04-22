import './App.css';
import LoginSignup from './pagesjs/Login-Signup.js';
import Signup from './pagesjs/Signup.js';
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={< LoginSignup />}/>
                <Route path='/signup' element={< Signup />}/>
            </Routes>
        </div>
    );
}

export default App;
