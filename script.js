
let seuVotoPara = document.querySelector('.d-1-1 span'); 
let cargo = document.querySelector('.d-1-2 span');
let descicao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.right');
let numeros =document.querySelector('.d-1-3')

let etapaAtual = 0 ; 
let numero = ''; 
let vtBranco = false;
let votos = []; 

function comecarEtapa(){

    numero = '' ;
    let etapa = etapas[etapaAtual];
    vtBranco = false ;
    let numeroHtml = '' ; 

    for( let i = 0; i < etapa.numeros - 1 ; i++){
        if(i === 0){ 
            numeroHtml += '<div class="numero pisca"></div>'; 
        }
        numeroHtml += '<div class="numero"></div>'; 
    }

    
    seuVotoPara.style.display = 'none'; 
    cargo.innerHTML = etapa.titulo; 
    descicao.innerHTML = '';
    aviso.style.display = 'none'; 
    lateral.innerHTML = ''; 
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface() { 

    let etapa = etapas[etapaAtual]; 
    let candidato = etapa.candidatos.filter((item)=>{

        if(item.numero === numero){ 
            return true ;
        }else{
            return false ;
        }
    }); 
    if(candidato.length > 0){ 
        candidato = candidato[0];
        seuVotoPara.style.display = 'block'; 
        descicao.innerHTML = `Nome: ${candidato.nome} <br>
        Partido: ${candidato.partido} <br>`

        aviso.style.display = 'block'

        let fotosHtml = ''; 
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small">
                        
                <img src="images/${candidato.fotos[i].url}" alt="">
                <figcaption>${candidato.fotos[i].legenda}</figcaption>
            
        </div>`
            }else {

                fotosHtml += `<div class="d-1-image">
                        
                <img src="images/${candidato.fotos[i].url}" alt="">
                <figcaption>${candidato.fotos[i].legenda}</figcaption>
            
        </div>`
            }
           
        }
        lateral.innerHTML = fotosHtml; 
    }else{ 
        seuVotoPara.style.display = 'block'; 
        aviso.style.display = 'block'
        descicao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    }
}



function clicou(n){
    let elNum = document.querySelector('.numero.pisca'); 

    if(elNum !== null){
        elNum.innerHTML = n ;
        numero = `${numero}${n}`;
        elNum.classList.remove('pisca'); 
        if(elNum.nextElementSibling !== null){
            elNum.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }
    }
}
function branco(){

    if(numero === ''){
        vtBranco = true; 
        seuVotoPara.style.display = 'block'; 
        aviso.style.display = 'block'; 
        numeros.innerHTML = ''; 
        descicao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
    }else{
        alert('para VOTAR EM BRANCO não pode ter digitado nenhum número !!!')
    }
}
function corrige(){
    comecarEtapa(); 
    numero = ''; 
}
function confirma(){

    let etapa = etapas[etapaAtual];

    let vtconfirm = false

    if(vtBranco === true){
        vtconfirm = true
        votos.push({
            etapa: etapas[etapaAtual].titulo, 
            voto:'Branco'

        });
    }
    else if(numero.length == etapa.numeros){
        vtconfirm = true

        votos.push({etapa: etapas[etapaAtual],
        voto: numero 
    })
    }

    if(vtconfirm){
        etapaAtual++; 
    
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca ">FIM</div>'
            console.log(votos)
        }
    }
}
comecarEtapa()