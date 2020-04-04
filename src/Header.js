import React from 'react';
import carousel_image2 from './images/carousel_image2.jpg';
import carousel_image3 from './images/carousel_image3.jpg';


function Header() {
    return (

        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src={carousel_image3} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h2 className="display-4 shadowOutline m-4">Search for your recipe and make it</h2>
                    </div>
                </div>
                <div className="carousel-item">
                    <img src={carousel_image2} className="d-block w-100" alt="..." />
                    <div className="carousel-caption d-none d-md-block">
                        <h2 className="display-4 shadowOutline m-4">with love, or with hate</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
