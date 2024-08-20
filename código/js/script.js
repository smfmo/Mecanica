async function fetchCarData() {
    try{
        const response = await fetch('/código/js/dados.json')
        const carsData = await response
        
        return carsData
    }
    catch (error){
        console.error('erro ao carregar os dados do carro em: ', error)

        return[]
    }
}

function renderCards(){
    const cardContainer = document.getElementById('car-cards');
    //limpar o card que eventualmente esteja carregado antes
    cardContainer.innerHTML = '';

    const filteredcards = brand == 'todos' ? carsData : carsData.Carsfilter 
    (car => car.brand === brand)

    filteredcards.forEach(car =>{
        const card = `
        <div class="card" style="width: 18rem;">
                <img src="${car.image}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${car.name}</h5>
                  <p class="card-text">valor:${car.price}</p>
                  <p class="card-text">marca:${car.brand}</p>
                  <p class="card-text">quilometragem:${car.km}</p>
                  <p class="card-text">ano:${car.year}</p>
                  <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
              </div>; 
        `
        cardContainer.innerHTML += card;
    })
}
document.querySelectorAll('.nav-link').forEach(link =>{
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        const brand = e.target.getAttribute('data-brand');
        const carsData = await fetchCarData();
        renderCards(carsData, brand);
    });
})

//render inicial
fetchCarData().then(carsData => renderCards(carsData, 'todos'));