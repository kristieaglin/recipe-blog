import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import RecipeCategories from './pages/RecipeCategories/RecipeCategories';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='recipes/:recipeCategory' element={<RecipeCategories />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
