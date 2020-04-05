import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Recipe from './Recipe';
import Header from './Header';
import Loader from './Loader';
import RecipeDetails from './RecipeDetails';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function App() {

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [loader, setIsLoader] = useState(false);

  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const foundRecipesRef = useRef(null)
  const executeScroll = () => scrollToRef(foundRecipesRef)

  useEffect(() => {
    const URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&to=40`;
    if (query !== '') {
      fetch(URL)
        .then(res => res.json())
        .then(res => {
          setRecipes(res.hits);
          //console.log(res.hits);
          setIsLoader(false);
          executeScroll();
        })
        .catch(() => setIsLoader(false))
    }
  }, [query]);

  const updateSearch = (event) => {
    setSearch(event.target.value);
  }

  const getSearch = (event) => {
    event.preventDefault();
    if (search !== '') {
      setQuery(search);
      setIsLoader(true);
    }
  }

  return (
    <Router>
      <div>
        <Header />
      </div>
      <Switch>
        <Route path="/recipes/:uri" exact component={RecipeDetails} />
        <Route path="/*" exact render={() =>
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
                      uri={recipe.recipe.uri}
                    />)))
                  : <Loader />
                }
              </div >
            </div >
          </div >
        } />
      </Switch>
    </Router>
  );
}

export default App;
