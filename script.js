
const form = document.querySelector('#searchForm');
const searchButton = document.querySelector('button');
const searchTerm = document.querySelector('input');
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    

    const config = { params: { q: searchTerm.value }};
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeMovieContainer(res.data);

    searchTerm.value = '';
    searchTerm.addEventListener('change', function () {
        const imgContainers = document.querySelectorAll('.imgContainer');
        imgContainers.forEach((el)=>{
            el.remove();
        });
    });
});

function makeTitle(title){
    const h4 = document.createElement('h4');
    h4.innerText = 'Title : ';
    const span = document.createElement('span');
    span.setAttribute('id', 'movie-title');

    if (title) {
        span.append(title);
    }
    else {
        span.append("No Name");
    }
    
    h4.appendChild(span);
    return h4;
}

function makeRating(rating){

    const p = document.createElement('p');
    p.innerText = "Rating : ";
    const span = document.createElement('span');
    span.setAttribute('id', 'rating');
    // span.append(rating);

    if (rating) {
        span.append(rating);
    }
    else {
        span.append('0.0');
    }
    p.append(span);
    return p;
}


function makePremier(premier){
    const p = document.createElement('p');
    p.innerText = "Premier : ";
    const span = document.createElement('span');
    span.setAttribute('id', 'year');
    if (premier) {
        span.append(premier);
    }
    else {
        span.append("Not Mentioned");
    }

    p.append(span);
    return p;
}



function makeimage(src){
    const img = document.createElement('img');
    img.src =  src;
    return img;
}

function createDetails(result) {
    const details = document.createElement('div');
    details.classList.add('details')
    const title = makeTitle(result.show.name);
    details.append(title);
    const rating = makeRating(result.show.rating.average);
    details.append(rating);
    const premier = makePremier(result.show.premiered);
    details.append(premier);

    return details;
}

async function makeMovieContainer(shows) {
    try {
        const showResult = document.querySelector('#showResult');
        for (let result of shows) {
                
            const imgscr = result.show.image
            if (imgscr) {
                
                const movieContainer = document.createElement('div');
                movieContainer.classList.add('imgContainer');
                
                const img = makeimage( await result.show.image.medium);
                movieContainer.append(img);
                const details = createDetails(result);
                movieContainer.append(details);
               
                showResult.append(movieContainer);
            }
        }
    }
    catch (e) {
        console.log("Error", e);
    }
}
