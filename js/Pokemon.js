let urlPokemon = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=15';
let templateHtml;

const pokemonList = document.getElementById('pokemonList')
const navitemregion = document.getElementById('nav-item-region')
const pokedexFilterRegion = document.getElementById('pokedex-filter-region')
const pokedexFilterType = document.getElementById('pokedex-filter-type') 
const pokedexFilterColor = document.getElementById('pokedex-filter-color') 
const btnFilter = document.getElementById('btn-filter') 
const buttons = document.getElementById('buttons')

const getPokemon = async(url)=>{
    try{
        const response = await fetch(url);
        const results = await response.json();
        urlNext = results.next;
        console.log(results);
        DataPokemon(results.results);

        btnNext=results.next ? `<button class="btn" data-url=${results.next}>Load more Pokémon</button>` : ''
        buttons.innerHTML=btnNext
    }catch(error){
        console.log(error)
    }
}

buttons.addEventListener('click',(e)=>{
    if(e.target.matches('.btn')){
        let value=e.target.dataset.url
        console.log(value)
        getPokemon(value)
    }
})

getPokemon(urlPokemon);

const DataPokemon= async(data)=>{
    //pokemonList.innerHTML='';
    try{
        for(let index of data){
            const resp = await fetch(index.url);
            const result = await resp.json();
            console.log(result);
            if(result.id <= 1025){
                if(result.sprites.other["official-artwork"].front_default == null){
                    templateHtml=`
                    <div class="item" id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">
                    <div class="glass">
                    <img src=${result.sprites.other.home.front_default} alt=${result.name} id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'"/>
                    <span class="pokemonName" id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">${result.name}</span>
                    </div>
                    </div>
                    `
                    pokemonList.innerHTML+=templateHtml
                }else{
                    templateHtml=`
                    <div class="item" id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">
                    <div class="glass">
                    <img src=${result.sprites.other["official-artwork"].front_default} alt=${result.name} id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'"/>
                    <span class="pokemonName" id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">${result.name}</span>
                    </div>
                    </div>
                    `
                    pokemonList.innerHTML+=templateHtml
                }
            }
            
        } 
        //seleccionarElementos()
    }catch(error){
        console.log(error)
    }
}


/*function seleccionarElementos(){
    document.querySelectorAll(".item").forEach(el => {
        el.addEventListener("click", e => {
          const id = e.target.getAttribute("id");
          console.log("Se ha clickeado el id "+id);
          //localStorage.setItem('IdPokemon', id);
        });
      });
}*/



pokedexFilterRegion.addEventListener('click',(e)=>{
    if(e.target.matches('.checkbox-kanto')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
    }

    if(e.target.matches('.checkbox-johto')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=151&limit=100')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=151&limit=100')
    }

    if(e.target.matches('.checkbox-hoenn')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=251&limit=135')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=251&limit=135')
    }

    if(e.target.matches('.checkbox-sinnoh')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=386&limit=108')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=386&limit=108')
    }

    if(e.target.matches('.checkbox-teselia')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=494&limit=155')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=494&limit=155')
    }

    if(e.target.matches('.checkbox-kalos')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=649&limit=72')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=649&limit=72')
    }

    if(e.target.matches('.checkbox-alola')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=721&limit=88')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=721&limit=88')
    }

    if(e.target.matches('.checkbox-galar')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=809&limit=96')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=809&limit=96')
    }

    if(e.target.matches('.checkbox-paldea')){
        console.log('https://pokeapi.co/api/v2/pokemon?offset=905&limit=105')
            getPokemon('https://pokeapi.co/api/v2/pokemon?offset=905&limit=120')
    }
})

const getPokemonByType = async(url)=>{
    try{
        const response = await fetch(url);
        const results = await response.json();
        console.log(results.pokemon);
        DataPokemonByType(results.pokemon);
    }catch(error){
        console.log(error)
    }
}

const DataPokemonByType= async(data)=>{
    pokemonList.innerHTML='';
    try{
        for(let index of data){
            const resp = await fetch(index.pokemon.url);
            const result = await resp.json();
            console.log(result.pokemon);
            if(result.id <= 1025){
                if(result.sprites.other["official-artwork"].front_default == null){
                    templateHtml=`
                    <div class="item" id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">
                    <div class="glass">
                    <img src=${result.sprites.other.home.front_default} alt=${result.name} id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'"/>
                    <span class="pokemonName" id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">${result.name}</span>
                    </div>
                    </div>
                    `
                    pokemonList.innerHTML+=templateHtml
                }else{
                    templateHtml=`
                    <div class="item" id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">
                    <div class="glass">
                    <img src=${result.sprites.other["official-artwork"].front_default} alt=${result.name} id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'"/>
                    <span class="pokemonName" id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">${result.name}</span>
                    </div>
                    </div>
                    `
                    pokemonList.innerHTML+=templateHtml
                }
            }
        }
        //seleccionarElementos();
    }catch(error){
        console.log(error)
    }
}

pokedexFilterType.addEventListener('click',(e)=>{
    // if(e.target.matches('.btn-all-type')){
    //     console.log('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
    //         getPokemon('https://pokeapi.co/api/v2/pokemon?offset=0&limit=151')
    // }

    if(e.target.matches('.checkbox-normal')){
        console.log('https://pokeapi.co/api/v2/type/normal')
        getPokemonByType('https://pokeapi.co/api/v2/type/normal')
    }

    if(e.target.matches('.checkbox-bug')){
        console.log('https://pokeapi.co/api/v2/type/bug')
        getPokemonByType('https://pokeapi.co/api/v2/type/bug')
    }

    if(e.target.matches('.checkbox-dragon')){
        console.log('https://pokeapi.co/api/v2/type/dragon')
        getPokemonByType('https://pokeapi.co/api/v2/type/dragon')
    }

    if(e.target.matches('.checkbox-fairy')){
        console.log('https://pokeapi.co/api/v2/type/fairy')
        getPokemonByType('https://pokeapi.co/api/v2/type/fairy')
    }

    if(e.target.matches('.checkbox-fire')){
        console.log('https://pokeapi.co/api/v2/type/fire')
        getPokemonByType('https://pokeapi.co/api/v2/type/fire')
    }

    if(e.target.matches('.checkbox-ghost')){
        console.log('https://pokeapi.co/api/v2/type/ghost')
        getPokemonByType('https://pokeapi.co/api/v2/type/ghost')
    }

    if(e.target.matches('.checkbox-ground')){
        console.log('https://pokeapi.co/api/v2/type/ground')
        getPokemonByType('https://pokeapi.co/api/v2/type/ground')
    }

    if(e.target.matches('.checkbox-psychic')){
        console.log('https://pokeapi.co/api/v2/type/psychic')
        getPokemonByType('https://pokeapi.co/api/v2/type/psychic')
    }

    if(e.target.matches('.checkbox-steel')){
        console.log('https://pokeapi.co/api/v2/type/steel')
        getPokemonByType('https://pokeapi.co/api/v2/type/steel')
    }

    if(e.target.matches('.checkbox-dark')){
        console.log('https://pokeapi.co/api/v2/type/dark')
        getPokemonByType('https://pokeapi.co/api/v2/type/dark')
    }
    
    if(e.target.matches('.checkbox-electric')){
        console.log('https://pokeapi.co/api/v2/type/electric')
        getPokemonByType('https://pokeapi.co/api/v2/type/electric')
    }

    if(e.target.matches('.checkbox-fighting')){
        console.log('https://pokeapi.co/api/v2/type/fighting')
        getPokemonByType('https://pokeapi.co/api/v2/type/fighting')
    }

    if(e.target.matches('.checkbox-flying')){
        console.log('https://pokeapi.co/api/v2/type/flying')
        getPokemonByType('https://pokeapi.co/api/v2/type/flying')
    }

    if(e.target.matches('.checkbox-grass')){
        console.log('https://pokeapi.co/api/v2/type/grass')
        getPokemonByType('https://pokeapi.co/api/v2/type/grass')
    }

    if(e.target.matches('.checkbox-ice')){
        console.log('https://pokeapi.co/api/v2/type/ice')
        getPokemonByType('https://pokeapi.co/api/v2/type/ice')
    }

    if(e.target.matches('.checkbox-poison')){
        console.log('https://pokeapi.co/api/v2/type/poison')
        getPokemonByType('https://pokeapi.co/api/v2/type/poison')
    }

    if(e.target.matches('.checkbox-rock')){
        console.log('https://pokeapi.co/api/v2/type/rock')
        getPokemonByType('https://pokeapi.co/api/v2/type/rock')
    }

    if(e.target.matches('.checkbox-water')){
        console.log('https://pokeapi.co/api/v2/type/water')
        getPokemonByType('https://pokeapi.co/api/v2/type/water')
    }
})

const getPokemonByColor = async(url)=>{
    try{
        const response = await fetch(url);
        const results = await response.json();
        console.log(results.pokemon_species);
        DataPokemonByColor(results.pokemon_species);
    }catch(error){
        console.log(error)
    }
}

const DataPokemonByColor= async(data)=>{
    pokemonList.innerHTML='';
    try{
        for(let index of data){
            let speciesUrl = index.url;
            let pokemonNumber = speciesUrl.split("/").slice(-2, -1)[0];
            let newUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemonNumber + "/";
            const resp = await fetch(newUrl);
            const result = await resp.json();
            console.log(result.pokemon);
            if(result.id <= 1025){
                if(result.sprites.other["official-artwork"].front_default == null){
                    templateHtml=`
                    <div class="item" id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">
                    <div class="glass">
                    <img src=${result.sprites.other.home.front_default} alt=${result.name} id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'"/>
                    <span class="pokemonName" id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">${result.name}</span>
                    </div>
                    </div>
                    `
                    pokemonList.innerHTML+=templateHtml
                }else{
                    templateHtml=`
                    <div class="item" id="${result.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">
                    <div class="glass">
                    <img src=${result.sprites.other["official-artwork"].front_default} alt=${result.name} id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'"/>
                    <span class="pokemonName" id="${result.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${result.name}'">${result.name}</span>
                    </div>
                    </div>
                    `
                    pokemonList.innerHTML+=templateHtml
                }
            }
        }
        //seleccionarElementos();
    }catch(error){
        console.log(error)
    }
}

pokedexFilterColor.addEventListener('click',(e)=>{
    if(e.target.matches('.checkbox-black')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/1/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/1/')
    }

    if(e.target.matches('.checkbox-blue')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/2/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/2/')
    }

    if(e.target.matches('.checkbox-brown')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/3/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/3/')
    }

    if(e.target.matches('.checkbox-gray')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/4/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/4/')
    }

    if(e.target.matches('.checkbox-green')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/5/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/5/')
    }
    

    if(e.target.matches('.checkbox-pink')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/6/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/6/')
    }

    if(e.target.matches('.checkbox-purple')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/7/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/7/')
    }

    if(e.target.matches('.checkbox-red')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/8/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/8/')
    }
    
    if(e.target.matches('.checkbox-white')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/9/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/9/')
    }

    if(e.target.matches('.checkbox-yellow')){
        console.log('https://pokeapi.co/api/v2/pokemon-color/10/')
        getPokemonByColor('https://pokeapi.co/api/v2/pokemon-color/10/')
    }
})
