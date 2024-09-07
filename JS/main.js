let btnSearch = document.getElementById("btn-buscar"); // Botão de busca
if(btnSearch != null) { btnSearch.addEventListener("click", search); }; // Adiciona um event listener ao botão de busca

let txtSearch = document.getElementById("busca-cantor"); // Campo de texto para a busca
txtSearch.addEventListener("keypress", (e) =>{          // caso tecla enter seja pressionada, pesquise
    if(e.keyCode == 13){
        search();
    }
});

function search(){
    let section = document.getElementById("resultados-pesquisa"); // Seção onde os resultados da busca serão exibidos
    let valorPesquisa = txtSearch.value; // Obtém o valor digitado no campo de pesquisa
    
    if(valorPesquisa == null || valorPesquisa.trim() == ""){ // Verifica se o campo está vazio
        txtSearch.focus(); // Se estiver vazio, retorna o foco para o campo
        section.innerHTML = "<p>O campo de pesquisa está vazio!</p>";
        section.style.color = "#FFF";
        return;
    }

    // formartação da pesquisa
    valorPesquisa = valorPesquisa.toLowerCase().replace(/\s/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    let resultados = ""; // String para armazenar os resultados da busca

    // opção 1 de formatação
    let listaPalavrasChave = "";

    // opção 2 de formatação
    let name = "";
    let desc = "";
    let tags= "";
    for(let dado of dados){ // Itera sobre os dados

        // formatação de dados para otimizar a busca 1
        // listaPalavrasChave = (dado.name + dado.desc).toLowerCase().replace(/\s/g, "");

        // formatação de dados para otimizar a busca 2
        name = dado.name.toLowerCase().replace(/\s/g, '');
        desc = dado.desc.toLowerCase().replace(/\s/g, '');
        tags = dado.tags.join('').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // #region opção 1
        // if(listaPalavrasChave.includes(valorPesquisa)){
        //     // cria uma div para cada resultado
        //     resultados += `
        //     <div class="item-resultado"> 
        //         <h2><a href="${dado.mainLink}">${dado.name}</a></h2>
        //         <p class="descricao-meta">${dado.desc}</p>
        //         <a href="${dados.link}">Saiba Mais</a>
        //     </div> `;
        // }
        // #endregion

        // #region opção 2
        if(name.includes(valorPesquisa) || desc.includes(valorPesquisa) || tags.includes(valorPesquisa)){
            // cria uma div para cada resultado
            resultados += `
            <div class="item-resultado"> 
                <h2><a href="${dado.mainLink}">${dado.name}</a></h2>
                <p class="descricao-meta">${dado.desc}</p>
                <a href="${dados.link}">Saiba Mais</a>
            </div> `;
        }
        // #endregion
    }
    
    if(!resultados){ 
        section.style.color = "#fff";
        resultados = "<p>Nada foi Encontrado!</p>";
    }

    section.innerHTML = resultados; // Atualiza a seção de resultados com os resultados da busca
}