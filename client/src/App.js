import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CreatePost from './components/appComps/createPost';
import Profile from './components/appComps/profile';
import Find from './components/find';
import Home from './components/home';
import Forgot from './components/loginComps/forgot';
import Login from './components/loginComps/login';
import SignUp from './components/loginComps/signup';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route path='/home' element={<Home />} />
        <Route path='forgot' element={<Forgot />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/userProfile' element={<Profile />} />
        <Route path='/createPost' element={<CreatePost />} />
        <Route path='/find' element={<Find />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
