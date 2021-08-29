let cadastro;

listaCriada = false;

//instalar o nodemon
function validaUpdate(data) {
    alert(data[5].checked);
    for (i = 0; i < 6; i++) {
        if (data[i].value == "" || data[i].value == null) {
            alert("Preencha todos os campos")
            return false;
        }
    }

    if (data[1].value.indexOf("@") == -1 ||
        data[1].value.indexOf(".") == -1) {
        alert("E-mail inválido");
        data[1].focus();
        return false;
    }

    if (!Number.isInteger(Number(data[3].value))) {
        alert("Preencha sua idade somente com os seus anos de vida");
        return false;
    }

    return true;

}

function addValidation(data) {
    isAdd = true;

    if (data._name.value == "" || data._email == "" || data._address.value == "" || data._age.value == "" || data._height.value == "") {
        alert("Preencha todos os campos");
        isAdd = false;
    } else {
        if (data._name.value.search(/\d/) != -1) {
            alert("No campo nome é permitido apenas letras");
            data._name.focus();
            isAdd = false;
        }
        if (data._email.value.indexOf("@") == -1 ||
            data._email.value.indexOf(".") == -1) {
            alert("Esse E-mail é inválido, verifique o campo E-mail e tente novamente.");
            data._email.focus();
            isAdd = false;
        }
        if (!Number.isInteger(Number(data._age.value))) {
            alert("Idade invalida, preencha apenas com os seus anos de vida completo");
            data._age.focus();
            isAdd = false;
        }
        if (Number(data._age.value) < 0 || Number(data._age.value) >= 100) {
            alert("Esta idade não se enquadra em nosso público, aceitamos apenas pessoas entre 1 e 100 anos");
            data._age.focus();
            isAdd = false;
        }
        if (Number(data._height.value) < 1.0 || Number(data._height.value) > 2.4) {
            alert("Valor inválido para idade, verifique o campo Idade e tente novamente.");
            data._height.focus();
            isAdd = false;
        }
    
    }

    //validações / testes internos
    for(a = 0; a < 6; a++){
        console.log("addValidation "+data[a].value);
    }

    /*if(isAdd){
        add(data);
    }else{
        console.log("entrou no else que chama add na função de validar cadastro")
    }*/
    return isAdd;
}

function update(index, link) {
    //seleciona todas as tags que sejam td 
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);

    let lenTds = tds.length - 1; //numero de tds de uma linha da tabela
    let linkUpdate = tds[lenTds - 1]; //retorna o conteudo da penultima td, no caso, o link de update
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length; //pega numero de inputs

    let button = inputs[lenInputs - 1]; //cria uma conexao com o input que é do tipo button


    linkUpdate.className = 'hidden';
    linkRemove.className = 'hidden';
    tds[lenTds - 2].className = 'show'; //mostra butao de envio

    //esconde todos os campos de exibição de dados do cadastro
    for (let cont = 0; cont < spans.length; cont++) {
        if (spans[cont].className == "show") {
            spans[cont].className = "hidden";
        } else {
            spans[cont].className = "show";
        }
    }
    //mostra os campos de preenchimento para o cadastro
    for (let cont = 0; cont < inputs.length; cont++) {
        if (inputs[cont].className == "hidden") {
            inputs[cont].className = "show";
        }
    }

    //escuta se o botao foi clicado
    button.addEventListener('click', () => {
        if (validaUpdate(inputs)) {

            const http = new XMLHttpRequest(); //XHR - cria um objeto para requisição ao servidor
            const url = link; //"/cadastro/update";
            let data = { id: "", name: "", email: "", address: "", age: "", heigth: "", vote: "" };
            let dataToSend;

            http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST
            //Se no servidor nao houver um elemento esperando por uma mensagem POST (ex. router.post()) para a rota /cadastro/update ocorrerar um erro: 404 - File Not Found

            //Dados HTML teria no cabecalho HEADER (da mensagem HTTP) - Content-Type= text/html
            //Dados estruturados como querystring (ex: http//www.meu.com.br:3030/?campo=meu&campo2=10) -  Content-Type=x-www-form-urlencoded
            //Dados no formato de Objeto Javascript para troca de informacoes (JSON) Content-Type=application/json : Ex.: {key1:value1,key2:value2}
            http.setRequestHeader('Content-Type', 'application/json'); //constroi um cabecalho http para envio dos dados

            for (let cont = 0; cont < inputs.length; cont++) { //desabilita todos os inputs para escrita ou acesso (no caso do button)
                if (inputs[cont].disabled == true) {
                    inputs[cont].disabled = false;
                } else inputs[cont].disabled = true;
            }
            //    // essa suncao esta sendo colocada aqui só para dar uma parada e você poder ver os inputs desabilitados
            //    //funcao que espera um tempo N, dado em milissegundos, e então chama uma função (callback). No caso, vamos usar 2000 ms = 2s
            //    //essa funcao foi construida somente para que voce possa ver os inputs ficando desabilitados. Nao precisa usar.
            //    function sleep(milliseconds) {
            //         const date = Date.now();
            //         let currentDate = null;
            //         do {
            //             currentDate = Date.now();
            //         } while (currentDate - date < milliseconds);
            //     }
            //     console.log("Mostra essa mensagem no console, primeiro!");
            //     sleep(2000)
            //     console.log("Pronto, você consegue ver seus inputs desabilitados!");
            //    //fim do codigo usado para ver os inputs desabiulitados

            //preenche um objeto com o indice da linha da tabela e os valores dos campos input do tipo text
            data.id = index; //esse dado nao existe no vetor Users do lado do servidor (backend), mas preciso dele para apontar o indice do vetor que quero modificar
            data.name = inputs[0].value;
            data.email = inputs[1].value;
            data.address = inputs[2].value;
            data.age = inputs[3].value;
            data.heigth = inputs[4].value;
            data.vote = inputs[5].checked;

            dataToSend = JSON.stringify(data); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON. Se quisesse o objeto no formato binario, usaria: JSON.parse(data)

            http.send(dataToSend);//envia dados para o servidor na forma de JSON

            /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */
            http.onload = () => {

                /*
                readyState:
                0: request not initialized
                1: server connection established
                2: request received
                3: processing request
                4: request finished and response is ready
    
                status:
                200: "OK"
                403: "Forbidden"
                404: "Page not found"
                */
                // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

                if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                    for (let cont = 0; cont < spans.length; cont++) {
                        if (spans[cont].className == "hidden") {
                            if (cont == 5) {
                                spans[cont].innerHTML = inputs[cont].checked;
                                spans[cont].className = "show";
                            }
                            else {
                                spans[cont].innerHTML = inputs[cont].value;
                                spans[cont].className = "show";
                            }
                        } else {
                            spans[cont].className = "hidden";
                        }
                    }

                    //esconde os campos de preenchimento para o cadastro
                    for (let cont = 0; cont < inputs.length; cont++) {
                        if (inputs[cont].className == "show") {
                            inputs[cont].className = "hidden";
                            if (inputs[cont].disabled == false) {//habilita novamente os inputs para escrita
                                inputs[cont].disabled = true;
                            }
                        }
                    }

                    linkUpdate.className = 'show';
                    linkRemove.className = 'show';
                    tds[lenTds - 2].className = 'hidden';
                } else {
                    console.log("Ocorreu erro no processamento dos dados no servidor: ", http.responseText);
                }
            }
            /*
            readyState:
            0: request not initialized
            1: server connection established
            2: request received
            3: processing request
            4: request finished and response is ready
        
            status:
            200: "OK"
            403: "Forbidden"
            404: "Page not found"
            */
            // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

            // http.onreadystatechange = (e)=>{
            //     if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
            //         console.log(http.responseText);

            //     }
            // }

        }
    });

}

function remove(index, _name, link) { //(index,link)

    //escuta se o botao foi clicado

    const http = new XMLHttpRequest(); //cria um objeto para requisição ao servidor
    const url = link;

    http.open("POST", link, true); //abre uma comunicação com o servidor através de uma requisição POST
    http.setRequestHeader('Content-Type', 'application/json'); //constroi um cabecalho http para envio dos dados

    //dataToSend = JSON.stringify({id:index}); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON
    dataToSend = JSON.stringify({ name: _name }); //transforma o objeto literal em uma string JSON que é a representação em string de um objeto JSON

    http.send(dataToSend);//envia dados para o servidor na forma de JSON

    /* este codigo abaixo foi colocado para que a interface de cadastro so seja modificada quando se receber um aviso do servidor que a modificacao foi feita com sucesso. No caso o aviso vem na forma do codigo 200 de HTTP: OK */

    /*
    readyState:
    0: request not initialized
    1: server connection established
    2: request received
    3: processing request
    4: request finished and response is ready

    status:
    200: "OK"
    403: "Forbidden"
    404: "Page not found"
    */

    // baseado nos valores acima apresentados, o codigo abaixo mostra o que foi enviado pelo servidor como resposta ao envio de dados. No caso, se o request foi finalizado e o response foi recebido, a mensagem recebida do servidor eh mostrada no console do navegador. esse codigo foi feito apenas para verificar se tudo ocorreu bem no envio

    http.onload = () => {

        //seleciona todas as tags que sejam td 
        let tr = document.querySelector(`table#list > tbody > tr[data-index-row='${index}']`);

        if (http.readyState === 4 && http.status === 200) {
            tr.remove();
            console.log(`Item ${index} removido com sucesso!`);

        } else {
            console.log(`Erro durante a tentativa de remoção do usuário: ${_name}! Código do Erro: ${http.status}`);
        }


    }
}

/*
* Descobri que a função de add (bem como as demais de crud deste script) são do frontend. Um pequeno passo para humanidade
* mas um grande passo para o homem.
*/
function add(form, link) {
    validacao = addValidation(form);
        
    if (validacao) { //se a validação do form de cadastro retornar positivo, ou seja, tudo preenchidinho
        const http = new XMLHttpRequest(); //XHR - cria um objeto para requisição ao servidor
        const url = link; //"/cadastro/add"; //chama a rota de url amém
        
        let data = { id: "", name: "", email: "", address: "", age: "", heigth: "", vote: "" };
        let dataToSend;
    
        http.open("POST", link, true);
        http.setRequestHeader('Content-Type','application/json'); //constroi um cabecalho http para envio dos dados
       
        data.id = 1000; 
        data.name = form._name.value;
        data.email = form._email.value;
        data.address = form._address.value;
        data.age = form._age.value;
        data.heigth = form._height.value;
        data.vote = form._vote.checked;

        dataToSend = JSON.stringify(data);
        http.send(dataToSend);
    
        /*
        * No http.onload é rodado assincrono
        */
        http.onload = () => {
            if (http.readyState === 4 && http.status === 200) { //testa se o envio foi bem sucedido
                alert(data.name + " foi cadastrado com sucesso");

            } else {
                console.log("Ocorreu erro no processamento dos dados no servidor: ", http.responseText);
            }
        };
    }
}

function updateList(link){
    const http = new XMLHttpRequest(); 
    const urls= link;

    http.open("GET", urls, true); 
    http.setRequestHeader('Content-Type','application/json'); 

    http.send();

    http.onload = ()=>{                
        if (http.readyState === 4 && http.status === 200) {
            var resp = JSON.parse(http.response);
            console.log(resp);
            if(listaCriada == false){
                listaCriada = true;
                createList(resp);
            }else{
               var qtdRows = document.getElementById("lista").rows.length;
               console.log("qtdRows: "+qtdRows);

               /*
               * CONSEGUI, MEU BRASILLLLLLL - by Vaneska SOUSAAAAAAA as 00:33 do dia 28/08/2021
               */
               for(contador = qtdRows-1; contador > 0; contador--){
                   document.getElementById('lista').deleteRow(contador);
               }

               createList(resp);
            }
            
        } else {
            console.log(`Erro ao adicionar usuario na lista: ${http.status}`); 
        } 
    }
    http.onreadystatechange = (e)=>{
        if (http.readyState === 4 && http.status === 200) { 
            console.log(http.responseText);
        }
    }
}

function createList(resp){
    var tbody = document.querySelector('.Listagem');
    resp.forEach(function (r) {
        var tr = document.createElement('tr');
        for (var campo in r) {
            var td = document.createElement('td');
            td.innerHTML = r[campo];
            tr.appendChild(td);
        };
        tbody.appendChild(tr);
    });
}

function removeList(){
    //Não sei o que fazer ainda, mas a ideia é aqui apagar a lista ja criada e dai criar uma nova listagem
    //document.getElementById('Listagem').deleteRow(i)

    const http = new XMLHttpRequest(); 
    const urls= '/list/remove';

    http.open("GET", urls, true); 
    http.setRequestHeader('Content-Type','application/json'); 

    http.send();

    //Não to conseguindo pegar o tamanho do vetor de usuario
    http.onload = ()=>{                
        if (http.status === 200) {
            var resp = JSON.parse(http.response);
            console.log(resp);
        } else {
            console.log(`Erro no remove list. nao ta  voltando 200: ${http.status}`); 
        } 
    }   
}