function InfoArrowRotation(){
    try{
        const titleInformation =  [...document.querySelectorAll('.information__ability-name')];
        console.log(titleInformation)

        titleInformation.forEach(information =>{
            information.addEventListener('click', ()=>{
                let height = 0;
                let results = information.nextElementSibling;
                let addPadding = information.parentElement.parentElement;
    
                addPadding.classList.toggle('information__abilities-padding--add');
                information.children[0].classList.toggle('information__arrow--rotate');
    
                if(results.clientHeight === 0){
                    height = results.scrollHeight;//nos da el alto para que un elemento se muestre
                }
    
                results.style.height = `${height}px`;
            });
        });
    }catch(error){
        console.log(error)
    }
}