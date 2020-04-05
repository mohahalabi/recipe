import React, { useState, useEffect, useRef, Fragment } from 'react';
import Loader from './Loader';
import { Link } from 'react-router-dom';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

function RecipeDetails(props) {

    const [recipe, setRecipe] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const APP_ID = process.env.REACT_APP_APP_ID;
    const APP_KEY = process.env.REACT_APP_API_KEY;
    const uri = props.match.params.uri;

    const recipesRef = useRef(null)
    const executeScroll = () => scrollToRef(recipesRef)

    useEffect(() => {
        const URL = `https://api.edamam.com/search?r=${uri}&app_id=${APP_ID}&app_key=${APP_KEY}`;
        fetch(URL)
            .then(res => res.json())
            .then(res => {
                setRecipe(res[0]);
                setIsLoaded(true);
                executeScroll();
                //console.log(res[0]);
            })
    }, [uri]);

    return (
        <div className="container my-5">
            <div className="row mt-4 mb-5">
                <div className="col">
                    <Link to={`/`} className="btn btn-sm btn-outline-secondary">Go back</Link>
                </div>
            </div>
            < div className="row justify-content-center mb-4" ref={recipesRef}>
                {isLoaded ?
                    <Fragment>
                        <div className="col-md-3 text-center p-2 mb-2">
                            <img src={recipe.image} className="img-thumbnail" alt={recipe.label} />
                            <div className="my-1">
                                {recipe.healthLabels.map((label, index) =>
                                    <span className="badge badge-primary m-1 p-1" key={index}>{label}</span>)}
                            </div>
                        </div>
                        <div className="col-md-9 mb-2">
                            <h4 className="display-4">{recipe.label}</h4>
                            <div className="mt-2 mb-4">
                                <span className="badge badge-info m-1 p-2">{`${Math.floor(recipe.calories)} Calories`}</span>
                                {recipe.dietLabels.map((label, index) => <span className="badge badge-secondary m-1 p-2" key={index}>{label}</span>)}
                            </div>
                            {recipe.ingredientLines.map((ingredient, index) => <p key={index}>{ingredient}</p>)}
                            <a href={recipe.url} className="btn btn-link" target="_blank" rel="noopener noreferrer">How to make it.</a>
                        </div>
                    </Fragment>
                    : <Loader />}
            </div >
        </div >
    )
}

export default RecipeDetails;
