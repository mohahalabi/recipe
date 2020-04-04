import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Recipe from './Recipe';
import Header from './Header';
import Loader from './Loader';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function App() {

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [loader, setIsLoader] = useState(false);

  const foundRecipesRef = useRef(null)
  const executeScroll = () => scrollToRef(foundRecipesRef)

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(URL);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    setIsLoader(false);
    executeScroll();
  }

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }

  const getSearch = (event) => {
    event.preventDefault();
    setQuery(search);
    setIsLoader(true);
  }

  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="container-fluid mt-4 mb-5">
        <div className="d-flex mb-5 justify-content-center align-items-center">
          <form className="form-inline my-sm-2 my-lg-0" onSubmit={getSearch}>
            <input type="text" className="form-control border-dark rounded-0 mb-2 mr-2"
              style={{ width: '220px' }}
              placeholder="Ex: Meat, Chicken, Cheese" value={search} onChange={updateSearch} />
            <button type="submit" className="btn btn-outline-dark rounded-0 mb-2">Search</button>
          </form>
        </div>

        <div className="row justify-content-center" ref={foundRecipesRef}>
          <div className="card-deck justify-content-center" >
            {!loader ?
              recipes.map((recipe =>
                (<Recipe
                  key={recipe.recipe.uri}
                  title={recipe.recipe.label}
                  calories={recipe.recipe.calories}
                  image={recipe.recipe.image}
                  ingredients={recipe.recipe.ingredients} />)))
              : <Loader />
            }
          </div >
        </div >
      </div >
    </div>
  );
}

export default App;
