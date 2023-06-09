import './App.css';
import LoginSignup from './pages/Login-Signup.js';
import Signup from './pages/Signup.js';
import PersonalSpace from './pages/Persona-space.js'
import Forum from './pages/Forum.js'
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={< LoginSignup />}/>
                <Route path='/signup' element={< Signup />}/>
                <Route path='/personalspace' element={< PersonalSpace />}/>
                <Route path='/forum' element={< Forum />}/>
            </Routes>
        </div>
    );
}

export default App;
