async function getDados(){
    let response = await fetch('http://localhost:3000/resultado?_sort=id&_order=desc&_limit=1');
    
    let resposta = await response.json();

    return resposta;
}

async function montaTela(){
    let dadosSite = await getDados();

    const dados = document.getElementById('dados-loja');
    
    dados.innerHTML = dadosSite[0].dominio;
    
}
montaTela();
