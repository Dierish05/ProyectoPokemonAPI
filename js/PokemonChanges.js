let urlPokemon = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1025';
let templateHtml;

let currentOffset = [];
let currentCount = 0;
let currentOffsetCount = 15;
let currentLimit = [];
let currentType = [];
let currentColor = [];

let pokemonListArray = [];
let pokemonListArrayColor = [];
let currentIndex = 0;

const pokemonList = document.getElementById('pokemonList');
const navitemregion = document.getElementById('nav-item-region');
const pokedexFilterRegion = document.getElementById('pokedex-filter-region');
const pokedexFilterType = document.getElementById('pokedex-filter-type');
const pokedexFilterColor = document.getElementById('pokedex-filter-color');
const divBtnFilter = document.getElementById('div-btn-filter'); 
const buttons = document.getElementById('buttons');

// Función para cargar la lista de Pokémon desde la API
async function getPokemon(url){
    try{
        const response = await fetch(url);
        const results = await response.json();
        console.log(results);
        cargarDetallesPokemon(results.results);

        btnNext=results.next ? `<button class="btn">More</button>` : ''
        buttons.innerHTML=btnNext
    }catch(error){
        console.log(error)
    }
}

getPokemon(urlPokemon);

// Función para cargar los detalles de cada Pokémon
//obtiene tambien los colores mandandolo a llamar a traves del API
const cargarDetallesPokemon = async (data) => {
    try {
        for (let index of data) {
          const resp = await fetch(index.url);
          const result = await resp.json();

          const respColor = await fetch(result.species.url);
          const resultColor = await respColor.json();

          console.log(result);
          pokemonListArray.push(result); // Agregar el resultado a la lista de Pokémon
          pokemonListArrayColor.push(resultColor.color.name);
        }
         DataPokemon();
      } catch (error) {
        console.error('Error al cargar los detalles de Pokémon:', error);
      }
  }

// Función para mostrar los Pokémon actuales después de aplicar el filtro
function DataPokemon(){
    try{
          const filteredPokemon = pokemonListArray.filter(pokemon => {
            if (currentType.length === 0 & currentColor.length === 0) return true; // Mostrar todos si no hay color o tipos seleccionados
      
            if(currentType.length != 0 & currentColor.length != 0){
              
              const pokemonTypes = getPokemonTypes(pokemon);
              const pokemonColors = getPokemonColors(pokemon);
        
              return currentType.every(type => pokemonTypes.includes(type)) & currentColor.every(color => pokemonColors.includes(color));
            }
            if(currentType.length != 0){
              const pokemonTypes = getPokemonTypes(pokemon);
      
              return currentType.every(type => pokemonTypes.includes(type));
            }
            if(currentColor.length != 0){

              const pokemonColors = getPokemonColors(pokemon);
      
              return currentColor.every(color => pokemonColors.includes(color));
            }
          });
      
          // Mostrar los próximos 15 Pokémon después del filtrado
          for (let i = currentIndex; i < currentIndex + 15 && i < filteredPokemon.length; i++) {
            if(filteredPokemon[i].sprites.other["official-artwork"].front_default == null){
                templateHtml=`
                <div class="item" id="${filteredPokemon[i].name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'">
                <div class="glass">
                <img src=${filteredPokemon[i].sprites.other.home.front_default} alt=${filteredPokemon[i].name} id="${filteredPokemon[i].name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'"/>
                <p>N.° ${filteredPokemon[i].id}</p>
                <span class="pokemonName" id="${filteredPokemon[i].name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'">${filteredPokemon[i].name}</span>
                `
                filteredPokemon[i].types.forEach(typeData => {
                  const type = typeData.type.name;
                  const button = document.createElement('button');
                  button.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalizar la primera letra
                  button.className = `btn-${type}`;
                  button.id = `${type}`;
                  button.onclick = `window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'`;
                  
                  templateHtml+=button.outerHTML;
                });
                templateHtml+=`
                </div>
                </div>
                `
                pokemonList.innerHTML+=templateHtml;
            }else{
                templateHtml=`
                <div class="item" id="${filteredPokemon[i].name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'">
                <div class="glass">
                <img src=${filteredPokemon[i].sprites.other["official-artwork"].front_default} alt=${filteredPokemon[i].name} id="${filteredPokemon[i].name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'"/>
                <p>N.° ${filteredPokemon[i].id}</p>
                <span class="pokemonName" id="${filteredPokemon[i].name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'">${filteredPokemon[i].name}</span>
                <div class="type-container">
                `
                filteredPokemon[i].types.forEach(typeData => {
                  const type = typeData.type.name;
                  const button = document.createElement('button');
                  button.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalizar la primera letra
                  button.className = `btn-${type}`;
                  button.id = `${type}`;
                  button.onclick = `window.location.href='datos-Pokemon.html?idPokemon=${filteredPokemon[i].name}'`;
                  
                  templateHtml+=button.outerHTML;
                });
                templateHtml+=`
                </div>
                </div>
                </div>
                `
                pokemonList.innerHTML+=templateHtml;
            }
        }
        if(currentIndex > filteredPokemon.length){
          buttons.innerHTML= '';
        }
        NoResults();
    }catch(error){
        console.log(error)
    }
}

// Función para obtener los tipos de un Pokémon de manera flexible
function getPokemonTypes(pokemon) {
  if (pokemon.types) {
    return pokemon.types.map(type => type.type.name);
  }
  return [];
}

// Función para obtener el color de un Pokémon de manera flexible
function getPokemonColors(pokemon) {
  if (pokemonListArrayColor[pokemon.id-1]) {
    return pokemonListArrayColor[pokemon.id-1];
  }
  return [];
}

//funcion para cuando no se encuentran resultados de los pokemon
function NoResults(){
  if(pokemonList.innerHTML==''){
    templateHtml=`
    <div class="error-container">
    <h3>No Pokémon Matched!</h3>

    <p>Try these suggestions:</p>
    <ul>
      <li>Reduce the number of search parameters</li>
      <li>Search for only one Pokémon type at a time</li>
      <li>Try searching with a single color</li>
    </ul>
    </div>

    <style>
    .pokemonList {
      margin: 0 auto;
      color: #616161;
      display: block;

    .error-container{
      border: 2px solid #E3350D;
      border-radius: 10px;
    }
  }
  </style>
    `

    pokemonList.innerHTML+=templateHtml
  }
}

//evento para cuando se quieran ver mas pokemones
buttons.addEventListener('click', (e)=>{
        if(e.target.matches('.btn')){
        currentIndex += 15;
        DataPokemon();
        }
})

//evento para obtener los datos del filtro
divBtnFilter.addEventListener('click', async(e)=>{
    if(e.target.matches('.btn-filter')){
        pokemonList.innerHTML='';
        let urlRegion;

        const checkboxesRegion = {
            kanto: document.getElementById('checkbox-kanto'),
            johto: document.getElementById('checkbox-johto'),
            hoenn: document.getElementById('checkbox-hoenn'),
            sinnoh : document.getElementById('checkbox-sinnoh'),
            teselia : document.getElementById('checkbox-teselia'),
            kalos : document.getElementById('checkbox-kalos'),
            alola : document.getElementById('checkbox-alola'),
            galar : document.getElementById('checkbox-galar'),
            paldea : document.getElementById('checkbox-paldea')
          };

          const checkboxesType = {
            normal: document.getElementById('checkbox-normal'),
            bug: document.getElementById('checkbox-bug'),
            dragon: document.getElementById('checkbox-dragon'),
            fairy : document.getElementById('checkbox-fairy'),
            fire : document.getElementById('checkbox-fire'),
            ghost : document.getElementById('checkbox-ghost'),
            ground : document.getElementById('checkbox-ground'),
            psychic : document.getElementById('checkbox-psychic'),
            steel : document.getElementById('checkbox-steel'),
            dark : document.getElementById('checkbox-dark'),
            electric : document.getElementById('checkbox-electric'),
            fighting : document.getElementById('checkbox-fighting'),
            flying : document.getElementById('checkbox-flying'),
            grass : document.getElementById('checkbox-grass'),
            ice : document.getElementById('checkbox-ice'),
            poison : document.getElementById('checkbox-poison'),
            rock : document.getElementById('checkbox-rock'),
            water : document.getElementById('checkbox-water')
          };

          const checkboxesColor = {
            black: document.getElementById('checkbox-black'),
            blue: document.getElementById('checkbox-blue'),
            brown: document.getElementById('checkbox-brown'),
            gray : document.getElementById('checkbox-gray'),
            green : document.getElementById('checkbox-green'),
            pink : document.getElementById('checkbox-pink'),
            purple : document.getElementById('checkbox-purple'),
            red : document.getElementById('checkbox-red'),
            white : document.getElementById('checkbox-white'),
            yellow : document.getElementById('checkbox-yellow')
          };

          currentOffset = []; 
          currentLimit = []; 
          currentType = [];
          currentColor = [];
          currentIndex = 0;
          pokemonListArray = [];
          pokemonListArrayColor = [];

          for (const i in checkboxesRegion) {
            const checkbox = checkboxesRegion[i];
      
            if (checkbox.checked) {
              currentOffset.push(checkbox.dataset.offset); 
              currentLimit.push(checkbox.dataset.limit); 
            }
          }

          for (const i in checkboxesType) {
            const checkbox = checkboxesType[i];
      
            if (checkbox.checked) {
                currentType.push(checkbox.dataset.type); 
            }
          }

          for (const i in checkboxesColor) {
            const checkbox = checkboxesColor[i];
      
            if (checkbox.checked) {
                currentColor.push(checkbox.dataset.color); 
            }
          }

            if(currentOffset.length == 0){
              getPokemon(urlPokemon);
            }else{
              for(let i=0; i<currentOffset.length;i++){
                urlRegion = `https://pokeapi.co/api/v2/pokemon?offset=${currentOffset[i]}&limit=${currentLimit[i]}`;
                await getPokemonFilter(urlRegion);
                }

                DataPokemon();
            }
    }
})

//funciones para cargar los pokemon cuando se utiliza el filtro por region

// Función para cargar la lista de Pokémon desde la API
async function getPokemonFilter(url){
  try{
      const response = await fetch(url);
      const results = await response.json();
      console.log(results);
      await cargarDetallesPokemonFilter(results.results);

      btnNext=results.next ? `<button class="btn">Load more Pokémon</button>` : ''
      buttons.innerHTML=btnNext
  }catch(error){
      console.log(error)
  }
}

// Función para cargar los detalles de cada Pokémon
const cargarDetallesPokemonFilter = async (data) => {
  try {
    for (let index of data) {
      const resp = await fetch(index.url);
      const result = await resp.json();

      const respColor = await fetch(result.species.url);
      const resultColor = await respColor.json();

      console.log(result);
      pokemonListArray.push(result); // Agregar el resultado a la lista de Pokémon
      pokemonListArrayColor.push(resultColor.color.name);
    }
  } catch (error) {
    console.error('Error al cargar los detalles de Pokémon:', error);
  }
}