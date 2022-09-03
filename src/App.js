import './App.scss';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
//Components
import Navbar from './Components/Navbar/Navbar';
import routes from './JS/Router/routes';
import React from 'react';

class App extends React.Component{

  render(){ 
    return (
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navbar />}>     
                {Object.keys(routes).map(route => <Route key={routes[route].path} path={routes[route].path} element={routes[route].element}/>)}
            </Route>
        </Routes>
    </BrowserRouter>
    );
  }
}

export default App;
