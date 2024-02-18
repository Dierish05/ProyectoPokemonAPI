let templateHtmlInfo;
let urlParams = new URLSearchParams(window.location.search);
let idPokemon = urlParams.get('idPokemon');
let urlPokemonInfo ='https://pokeapi.co/api/v2/pokemon/' + idPokemon;
let urlPokemonInfoPrevious;
let urlPokemonInfoNext;

const pokemonPrevious = document.getElementById('pokemonPrevious')
const pokemonNext = document.getElementById('pokemonNext')
const pokedexPokemonTitle = document.getElementById('pokedex-pokemon__title')
const pokemonInfo = document.getElementById('pokemon__info')
const pokemonType = document.getElementById('pokemon__type')
const pokemonData = document.getElementById('pokemon__data')
const abilitiesContainer = document.getElementById('information__abilities-container')
const pokemonStats = document.getElementById('pokemon__stats')

let clickPrevio;
let clickProximo;

document.title = idPokemon.to + " | Pokédex";

//obtener los datos de los pokemon
const getUrl= async(data)=>{
    try{
            const resp = await fetch(data);
            const result = await resp.json();
            console.log(result);

                if(result.id == 1){
                    urlPokemonInfoPrevious = 'https://pokeapi.co/api/v2/pokemon/' + 1025;
                }else{
                    urlPokemonInfoPrevious = 'https://pokeapi.co/api/v2/pokemon/' + (parseInt(result.id)-1);
                }
                if(result.id == 1025){
                    urlPokemonInfoNext = 'https://pokeapi.co/api/v2/pokemon/' + 1;
                }else{
                    urlPokemonInfoNext = 'https://pokeapi.co/api/v2/pokemon/' + (parseInt(result.id)+1);
                }

            await DataPokemonPreviousNext(urlPokemonInfoPrevious, urlPokemonInfoNext);

            await DataPokemoninfo(urlPokemonInfo);
    }catch(error){
        console.log(error)
    }
}

getUrl(urlPokemonInfo);

//muestra los datos del pokemon previo y el siguiente
const DataPokemonPreviousNext= async(dataPrevious, dataNext)=>{
    pokemonPrevious.innerHTML='';
    pokemonNext.innerHTML='';
    try{
            const respPrevious = await fetch(dataPrevious);
            const resultPrevious = await respPrevious.json();
            const respNext = await fetch(dataNext);
            const resultNext = await respNext.json();

            if(resultPrevious.sprites.other["official-artwork"].front_default == null){
                templateHtmlInfo=`
                <div class="Pokemon-ImgPrevious" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultPrevious.name}'">
                <span class="information__arrow">
                    <img src="./img/arrow_left.svg" alt="arrow_left" class="information__img">
                </span>
                <img class="PokemonImg" src=${resultPrevious.sprites.other.home.front_default} alt=${resultPrevious.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultPrevious.name}'"/>
                </div>
                <span class="pokemonName" id="${resultPrevious.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultPrevious.name}'">#${resultPrevious.id} ${resultPrevious.name}</span>
                `
                pokemonPrevious.innerHTML = templateHtmlInfo
                clickPrevio = resultPrevious.name;
            }else{
                templateHtmlInfo=`
                <div class="Pokemon-ImgPrevious" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultPrevious.name}'">
                <span class="information__arrow">
                    <img src="./img/arrow_left.svg" alt="arrow_left" class="information__img">
                </span>
                <img class="PokemonImg" src=${resultPrevious.sprites.other["official-artwork"].front_default} alt=${resultPrevious.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultPrevious.name}'"/>
                </div>
                <span class="pokemonName" id="${resultPrevious.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultPrevious.name}'">#${resultPrevious.id} ${resultPrevious.name}</span>
                `
                pokemonPrevious.innerHTML = templateHtmlInfo
                clickPrevio = resultPrevious.name;
            }

            if(resultNext.sprites.other["official-artwork"].front_default == null){
                templateHtmlInfo=`
                <span class="pokemonName" id="${resultNext.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultNext.name}'">${resultNext.name} #{resultNext.id}</span>
                <div class="Pokemon-ImgNext" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultNext.name}'">
                <span class="information__arrow">
                    <img src="./img/arrow_Right.svg" alt="arrow_Right" class="information__img">
                </span>
                <img class="PokemonImg" src=${resultNext.sprites.other.home.front_default} alt=${resultNext.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultNext.name}'"/>
                </div>
                `
                pokemonNext.innerHTML = templateHtmlInfo
                clickProximo = resultNext.name;
            }else{
                templateHtmlInfo=`
                <span class="pokemonName" id="${resultNext.name}" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultNext.name}'">${resultNext.name} #${resultNext.id}</span>
                <div class="Pokemon-ImgNext" onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultNext.name}'">
                <span class="information__arrow">
                    <img src="./img/arrow_Right.svg" alt="arrow_Right" class="information__img">
                </span>
                <img class="PokemonImg" src=${resultNext.sprites.other["official-artwork"].front_default} alt=${resultNext.name} onclick="window.location.href='datos-Pokemon.html?idPokemon=${resultNext.name}'"/>
                </div>
                `
                pokemonNext.innerHTML = templateHtmlInfo
                clickProximo = resultNext.name;
            }  
    }catch(error){
        console.log(error)
    }
}

//evento al dar click al pokemon previo o al siguiente
pokemonPrevious.addEventListener('click',(e)=>{
    if(e.target.matches('.pokemonPrevious')){
        window.location.href= `datos-Pokemon.html?idPokemon=${clickPrevio}`;
    }
})

pokemonNext.addEventListener('click',(e)=>{
    if(e.target.matches('.pokemonNext')){
        window.location.href= `datos-Pokemon.html?idPokemon=${clickProximo}`;
    }
})

//mostrar la informacion del pokemon
const DataPokemoninfo= async(data)=>{
    pokemonInfo.innerHTML='';
    pokemonType.innerHTML='';
    pokemonData.innerHTML='';
    abilitiesContainer.innerHTML='';
    pokemonStats.innerHTML='';
    try{
            const resp = await fetch(data);
            const result = await resp.json();
            console.log(result);

            //a;ade titulo
            templateHtmlInfo=`
            <span class="pokemonName" id="${result.name}">${result.name}</span>
            <p>N.° ${result.id}</p>
            `

            pokedexPokemonTitle.innerHTML = templateHtmlInfo

            //a;ade la img
            if(result.sprites.other["official-artwork"].front_default == null){
                templateHtmlInfo=`
                <div class="Pokemon-Img">
                <img src=${result.sprites.other.home.front_default} alt=${result.name}/>
                </div>
                `
                pokemonInfo.innerHTML = templateHtmlInfo
            }else{
                templateHtmlInfo=`
                <div class="Pokemon-Img">
                <img src=${result.sprites.other["official-artwork"].front_default} alt=${result.name}/>
                </div>
                `
                pokemonInfo.innerHTML = templateHtmlInfo
            }

            //a;ade los tipos del pokemon
            templateHtmlInfo=`
            <h3>Type</h3>
            <div class="type-container">
            `
            for (var i = 0; i < result.types.length; i++) {
                var typeName = result.types[i].type.name;
              
                templateHtmlInfo+=`
                <button class="btn-${typeName}" id="${typeName}">${typeName}</button>
                `
                console.log("Nombre del tipo:", typeName);
              }
              templateHtmlInfo+=`
                </div>
                <h3>About</h3>
                `

              pokemonType.innerHTML = templateHtmlInfo

              //a;ade el peso y la altura
              templateHtmlInfo=`
                <div class="pokemon-Heigth">
                <h3>Heigth</h3>
                <p alt="?">${result.height / 10}m</p>
                </div>
                <div class="pokemon-Weight">
                <h3>Weight</h3>
                <p alt="?">${result.weight / 10}kg</p>
                </div>
                `
            
                pokemonData.innerHTML = templateHtmlInfo

                //a;ade las habilidades del pokemon
                templateHtmlInfo=`
                <h3>Abilities</h3>
                `

                for (var i = 0; i < result.abilities.length; i++) {
                    var abilityName = result.abilities[i].ability.name;
                    const resp = await fetch(result.abilities[i].ability.url);
                    const resultAbility = await resp.json();
                    const flavorText = resultAbility.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
                  
                    templateHtmlInfo+=`
                    <article class="information__abilities-padding" id="information__abilities-padding">
                    <div class="information__abilities-results" id="information__abilities-results">
                    <h3 alt="?" class="information__ability-name">${abilityName}
                        <span class="information__arrow">
                            <img src="./img/arrow.svg" alt="arrow" class="information__img">
                        </span>
                    </h3>

                    <p class="information__ability-description">${flavorText}</p>
                    </div>
                    </article>
                    `

                    console.log("Nombre de la habilidad:", abilityName);
                  }

                abilitiesContainer.innerHTML = templateHtmlInfo

                //a;ade las estadisticas del pokemon
                templateHtmlInfo=`
                <h3>Base Stats</h3>
                `
                for (var i = 0; i < result.stats.length; i++) {
                    var statsName = result.stats[i].stat.name;
                    var statsDigit = result.stats[i].base_stat;
                  
                    templateHtmlInfo+=`
                    <div class="stats-info" id="stats-info">
                    <p class="stats-fonts stats" alt="?">${statsName}</p>
                    <p class="stats-fonts" alt="?">${statsDigit}</p>
                    <progress class="progress-bar" value="${statsDigit}" max="255"></progress>
                    </div>
                    `
                    console.log("Nombre del estado:", statsName);
                    console.log("stats del estado:", statsDigit);
                  }

                pokemonStats.innerHTML = templateHtmlInfo
                
                InfoArrowRotation();
    }catch(error){
        console.log(error)
    }
}



            