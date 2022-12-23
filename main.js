async function getDados(){
    let response = await fetch('http://localhost:3000/resultado?_sort=id&_order=desc&_limit=1');
    
    let resposta = await response.json();

    return resposta;
}

async function montaTela(){
    let dadosSite = await getDados();

    const dados = document.getElementById('dados-site');

    const site = dadosSite[0];
    
    dados.innerHTML = `<h3>informações relevantes sobre o site ${site.dominio}</h3>`;

    dados.innerHTML +=
     `<table border="1">
             <tr>
                <th>Criação do domínio</th>
                <th>Última alteração de domínio</th>
                <th>Vencimento</th>
                <th>Data - Situação</th>
                <th>CNPJ</th>
                <th>CNPJ ativo?</th>
                <th>Telefone</th>
                <th>Email</th>
                <th>Endereço</th>
            </tr>
             <tr>
                <td>${site.criacao_dominio}</td>
                <td>${site.ultima_alteracao}</td>
                <td>${site.vencimento}</td>
                <td>${site.data_situacao}</td>
                <td>${site.cnpj}</td>
                <td>${site.cnpj_ativo? 'Sim' : 'Não'}</td>
                <td>${site.telefone}</td>
                <td>${site.email}</td>
                <td>
                    ${site.endereco.logradouro},
                    ${site.endereco.numero},
                    ${site.endereco.cep},
                    ${site.endereco.municipio}, 
                    ${site.endereco.uf}
                </td>
             </tr>
     </table>`


    
}
montaTela();
