async function getDados(){
    let response = await fetch('https://192.168.67.105:8080/resultado?_sort=id&_order=desc&_limit=1');
    
    let resposta = await response.json();

    return resposta;
}

async function montaTela(){
    let dadosSite = await getDados();

    const dados = document.getElementById('dados-site');

    const site = dadosSite[0];

    var situacao = 0;
    if(site.criacao_dominio == null ){
        situacao ++;
    }
    if(site.ultima_alteracao == null ){
        situacao ++;
    }
    if(site.vencimento == null ){
        situacao ++;
    }
    if(site.data_situacao == null ){
        situacao ++;
    }
    if(site.cnpj == null ){
        situacao ++;
    }
    if(site.cnpj_ativo == null ){
        situacao ++;
    }
    if(site.telefone == null ){
        situacao ++;
    }
    if(site.email == null ){
        situacao ++;
    }

    if(situacao >= 3){
        document.getElementById('dados-site').style.backgroundColor = '#FA8072';
    } else if(situacao >= 1){
        document.getElementById('dados-site').style.backgroundColor = '#F0E68C';
    } else {
        document.getElementById('dados-site').style.backgroundColor = '#ADFF2F';
    }

    
    dados.innerHTML += `<h3>informações relevantes sobre o site ${site.dominio}</h3>`;

    dados.innerHTML +=
     `<section class="tabela">
     <div class="blocos">
         <div class="titulo">Criação do domínio</div>
         <div class="info">${site.criacao_dominio}</div>
     </div>
     <div class="blocos">
         <div class="titulo">Última alteração de domínio</div>
         <div class="info">${site.ultima_alteracao}</div>
     </div>
     <div class="blocos">
         <div class="titulo">Vencimento</div>
         <div class="info">${site.vencimento}</div>
     </div>
     <div class="blocos">
         <div class="titulo">Data - Situação</div>
         <div class="info">${site.data_situacao}</div>
     </div>
     <div class="blocos">
         <div class="titulo">CNPJ</div>
         <div class="info">${site.cnpj}</div>
     </div>
     <div class="blocos">
         <div class="titulo">CNPJ ativo?</div>
         <div class="info">${site.cnpj_ativo? 'Sim' : 'Não'}</div>
     </div>
     <div class="blocos">
         <div class="titulo">Telefone</div>
         <div class="info">${site.telefone}</div>
     </div>
     <div class="blocos">
         <div class="titulo">Email</div>
         <div class="info">${site.email}</div>
     </div>
     <div class="blocos">
         <div class="titulo">Endereço</div>
         <div class="info">
             ${site.endereco.logradouro},
             ${site.endereco.numero},
             ${site.endereco.cep},
             ${site.endereco.municipio}, 
             ${site.endereco.uf}
         </div>
     </div>
 </section>`

 dados.innerHTML += `<h5>dados retirados da Receita Federal e do WhoIs.</h5>`;

 if(situacao >= 1){
    dados.innerHTML += `<h5>Alguns dados sobre o site ${site.dominio} não foram encontrados.</h5>`;
 }

    
}
montaTela();
