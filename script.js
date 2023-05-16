'use strict';

// Initial References
let movieNameRef = document.querySelector("#movie-name");
let searchBtn = document.querySelector("#search-btn");
let result = document.querySelector("#result");

// Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=a0c1794b`;

    // If input field is empty
    if(movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg"> Please Enter A Movie Name </h3>`;
    }
    // If input field is not empty
    else {
        (async () => {
            try {
                let response = await fetch(url);
                let data = await response.json();

                if (data.Response == 'True') {
                    result.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster}" class="poster" alt="${data.Title} Poster" >
                        <div>
                            <h2> ${data.Title}</h2>
                            <div class="rating"> 
                                <i class="fa-solid fa-star"></i>
                                <h4> ${data.imdbRating} </h4>
                            </div>
                            <div class="details">
                                <span> ${data.Rated} </span>
                                <span> ${data.Year} </span>
                                <span> ${data.Runtime} </span>
                            </div>
                            <div class="genre">
                                <div> ${data.Genre.split(",").join("</div><div>")} </div>
                            </div>
                        </div>
                    </div>
    
                    <div>
                        <h3> Plot: </h3>
                        <p> ${data.Plot} </p>
                        <h3> Cast: </h3>
                        <p> ${data.Actors} </p>
                    </div>
                `;
                } else {
                    result.innerHTML=`<h3 class="msg"> ${data.Error} </h3> `;
                }
            } catch(err) {
                result.innerHTML = `<h3 class="msg"> Error Occured </h3>`
            }
        })();
    }
}

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);

