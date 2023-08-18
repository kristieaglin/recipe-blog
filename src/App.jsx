import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import RecipeCategories from './pages/RecipeCategories/RecipeCategories';
import Auth from './pages/Auth/Auth'
import AddRecipe from './pages/AddRecipe/AddRecipe';
import RecipeDetails from './pages/RecipeDetails/RecipeDetails';

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/add' element={<AddRecipe />} />
        <Route path='/recipes/:recipeCategory' element={<RecipeCategories />} />
        <Route path='/details/:recipeId' element={<RecipeDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
