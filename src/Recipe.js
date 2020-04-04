import React from 'react'

const Recipe = ({ title, calories, image, ingredients }) => {
    return (
        <div>
            <div className="card mb-4 p-0" style={{ width: 300 + "px" }}>
                <img src={image} className="card-img-top" alt={title} />
                <div className="card-body text-center">
                    <h5 className="card-title lead text-truncate">{title}</h5>
                    <h5 className="card-text lead  mt-2 mb-4">{`Calories: ${Math.floor(calories)}`}</h5>
                    <a href="#" className="btn btn-sm btn-outline-info">View detailes</a>
                </div>
            </div>
        </div>


    )
};

export default Recipe;