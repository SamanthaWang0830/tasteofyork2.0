import React from 'react';
import {BrowserRouter,  Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import Header from './components/Header/Header.tsx';
import FindRestaurantsPage from './pages/FindRestaurantsPage/FindRestaurantsPage.tsx';
import StudentsPicksPage from './pages/StudentPicksPage/StudentsPicksPage.tsx';
import MyMealsPage from './pages/MyMealsPage/MyMealsPage.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import RegisterPage from './pages/Register/RegisterPage.tsx';

const App: React.FC =()=> {
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/:userId/meals" element={<MyMealsPage/>} />
          <Route path='findRestaurants' element={<FindRestaurantsPage/>} />
          <Route path="studentsPicks"  element={<StudentsPicksPage/>} />
          <Route path="login"  element={<LoginPage/>} />
          <Route path="register"  element={<RegisterPage/>} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App
