(function(){
    try{
        const pokedexFilterName =  [...document.querySelectorAll('.pokedex-filter-name')];
        console.log(pokedexFilterName)

        pokedexFilterName.forEach(pokedexFilter =>{
            pokedexFilter.addEventListener('click', ()=>{
                let height = 0;
                let results = pokedexFilter.nextElementSibling;
                let addPadding = pokedexFilter.parentElement.parentElement;
    
                addPadding.classList.toggle('pokedex-filter-padding--add');
                pokedexFilter.children[0].classList.toggle('pokedex-filter-arrow--rotate');
    
                if(results.clientHeight === 0){
                    height = results.scrollHeight;//nos da el alto para que un elemento se muestre
                }
    
                results.style.height = `${height}px`;
            });
        });
    }catch(error){
        console.log(error)
    }
})();