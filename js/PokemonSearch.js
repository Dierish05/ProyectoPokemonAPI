document.getElementById('buttonSearch').addEventListener('click', function (event) {
  event.preventDefault();
  
  const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  
  if (searchInput === '') {
    clearResults();
    return;
  }
  
  if (isNaN(searchInput)) {
    // Búsqueda por nombre
    searchPokemonByName(searchInput);
  } else {
    // Búsqueda por ID
    searchPokemonById(parseInt(searchInput));
  }
});

function clearResults() {
  pokemonList.innerHTML = '';
  pokemonListArray = [];
  currentIndex = 0;
  getPokemon(urlPokemon);
}

async function searchPokemonByName(name) {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=1025`;  // Obtener una lista de los primeros 1000 Pokémon
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const matchingPokemon = filterPokemonByName(data.results, name);
  
    if(matchingPokemon.length != 0){
      displayResults(matchingPokemon);
    }else{
      pokemonListArray=[];
      pokemonListArrayColor = [];
      pokemonList.innerHTML='';
      NoResults();
    }
  } catch (error) {
    console.error('Error al buscar Pokémon:', error);
    displayResults([]);
  }
}

async function searchPokemonById(id) {
  if (id >= 1 && id <= 1025){
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    displayResults([data]);
  } catch (error) {
    console.error('Error al buscar Pokémon por ID:', error);
    displayResults([]);
  }
  }else{
    pokemonList.innerHTML='';
    NoResults();
  }
}

function filterPokemonByName(pokemonList, name) {
  return pokemonList.filter(pokemon => pokemon.name.includes(name));
}

function displayResults(pokemonArray) {
  // const resultsContainer = document.getElementById('results');
  pokemonList.innerHTML='';
  
  if (pokemonArray.length === 0) {
    NoResults();
    return;
  }
  
  pokemonArray.forEach(async pokemon => {
    try {
      pokemonList.innerHTML='';
      pokemonListArray = [];
      if(pokemon.url == null){
        const data = pokemon;
  
        if(data.sprites.other["official-artwork"].front_default == null){
          templateHtml=`
          <div class="item" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">
          <div class="glass">
          <img src=${data.sprites.other.home.front_default} alt=${data.name} id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'"/>
          <p>N.° ${data.id}</p>
          <span class="pokemonName" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">${data.name}</span>
          `
          data.types.forEach(typeData => {
            const type = typeData.type.name;
            const button = document.createElement('button');
            button.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalizar la primera letra
            button.className = `btn-${type}`;
            button.id = `${type}`;
            button.onclick = `window.location.href='datos-Pokemon.html?idPokemon=${data.name}'`;
            
            templateHtml+=button.outerHTML;
          });
          templateHtml+=`
          </div>
          </div>
          `
          pokemonList.innerHTML+=templateHtml;
        }else{
            templateHtml=`
            <div class="item" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">
            <div class="glass">
            <img src=${data.sprites.other["official-artwork"].front_default} alt=${data.name} id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'"/>
            <p>N.° ${data.id}</p>
            <span class="pokemonName" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">${data.name}</span>
            `
            data.types.forEach(typeData => {
              const type = typeData.type.name;
              const button = document.createElement('button');
              button.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalizar la primera letra
              button.className = `btn-${type}`;
              button.id = `${type}`;
              button.onclick = `window.location.href='datos-Pokemon.html?idPokemon=${data.name}'`;
            
              templateHtml+=button.outerHTML;
            });
            templateHtml+=`
            </div>
            </div>
            `
            pokemonList.innerHTML+=templateHtml;
        }
      }else{
        const response = await fetch(pokemon.url);
        const data = await response.json();
  
        if(data.sprites.other["official-artwork"].front_default == null){
          templateHtml=`
          <div class="item" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">
          <div class="glass">
          <img src=${data.sprites.other.home.front_default} alt=${data.name} id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'"/>
          <p>N.° ${data.id}</p>
          <span class="pokemonName" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">${data.name}</span>
          `
          data.types.forEach(typeData => {
            const type = typeData.type.name;
            const button = document.createElement('button');
            button.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalizar la primera letra
            button.className = `btn-${type}`;
            button.id = `${type}`;
            button.onclick = `window.location.href='datos-Pokemon.html?idPokemon=${data.name}'`;
            
            templateHtml+=button.outerHTML;
          });
          templateHtml+=`
          </div>
          </div>
          `
          pokemonList.innerHTML+=templateHtml;
        }else{
            templateHtml=`
            <div class="item" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">
            <div class="glass">
            <img src=${data.sprites.other["official-artwork"].front_default} alt=${data.name} id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'"/>
            <p>N.° ${data.id}</p>
            <span class="pokemonName" id="${data.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${data.name}'">${data.name}</span>
            `
            data.types.forEach(typeData => {
              const type = typeData.type.name;
              const button = document.createElement('button');
              button.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalizar la primera letra
              button.className = `btn-${type}`;
              button.id = `${type}`;
              button.onclick = `window.location.href='datos-Pokemon.html?idPokemon=${data.name}'`;
            
              templateHtml+=button.outerHTML;
            });
            templateHtml+=`
            </div>
            </div>
            `
            pokemonList.innerHTML+=templateHtml;
        }
      }
      NoResults();
    } catch (error) {
      console.error('Error al obtener información del Pokémon:', error);
    }
  });
}

function displayResultsCopy(pokemonArray) {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';
  
  if (pokemonArray.length === 0) {
    resultsContainer.innerHTML = '<p>No se encontraron Pokémon con ese nombre o ID.</p>';
    return;
  }
  
  pokemonArray.forEach(async pokemon => {
    try {
      pokemonList.innerHTML='';
      if(pokemon.url == null){
        const data = pokemon;
  
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon-card');
        pokemonElement.innerHTML = `
          <h3>${data.name}</h3>
          <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
        resultsContainer.appendChild(pokemonElement);
      }else{
        const response = await fetch(pokemon.url);
        const data = await response.json();
  
        const pokemonElement = document.createElement('div');
        pokemonElement.classList.add('pokemon-card');
        pokemonElement.innerHTML = `
          <h3>${data.name}</h3>
          <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
        resultsContainer.appendChild(pokemonElement);
      }
      NoResults();
    } catch (error) {
      console.error('Error al obtener información del Pokémon:', error);
    }
  });
}
