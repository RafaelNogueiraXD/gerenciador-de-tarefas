let responseData = [];
// function formatarData(dataString) {
//     const moment = require('moment-timezone'); // Importe a biblioteca moment-timezone

//     // Crie um objeto moment a partir da string com o fuso horário correto
//     const data = moment.tz(dataString, 'YYYY-MM-DD HH:mm:ss', 'America/Sao_Paulo'); // Substitua 'America/Sao_Paulo' pelo fuso horário desejado

//     // Verifique se o objeto moment é válido
//     if (!data.isValid()) {
//         return 'Data inválida';
//     }

//     // Formate a data conforme o padrão desejado
//     return data.format('YYYY-MM-DD HH:mm:ss');
// }
function carregaData(){
    $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/loadData', 
            success: function (response) {
                console.log(response)
                $('#carregaDados').empty();
                responseData = response; 
                response.forEach(function(item) {
                    var checkBox = item.realizado ? `<input type="checkbox" onclick="realizaTarefa(${item.id})" checked>` : `<input type="checkbox" onclick="realizaTarefa(${item.id})">`;
                    $('#carregaDados').append(`
                        <tr id="${item.id}">
                            <td id="Col${item.nome}">${item.nome}</td>
                            <td>${item.descricao == null ? 'nao preenchido' : item.descricao}</td>
                            <td>${item.data_inicial == null ? 'nao preenchido' : item.data_inicial}</td>
                            <td>${item.data_final == null ? 'nao preenchido' : item.data_final}</td>
                            <td>${checkBox} ${item.realizado}</td>
                            <td>
                            <button type="button" onclick='removeData(${item.id})' class="btn btn-outline-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                </svg>
                            </button>
                            <button type="button" onclick='editDinamic(${item.id})' class="btn btn-outline-warning">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                </svg>
                            </button>
                


                        </tr>
                `);
            });
                
            },
            error: function () {
                $('#carregaDados').html(`
                    <center>
                        <p>Erro ao carregar dados</p>
                    </center>
                `);
            }
        });
}

function editaNome(id){
    var nomeCamp = $(`#${id}nome`).val();
    var descCamp = $(`#${id}descricao`).val();
    var dataInit = $(`#${id}dataInicial`).val();
    var dataFinal = $(`#${id}dataFinal`).val();
    console.log("data inicial:",dataInit)
    // var nomeCamp = $(this).val();
    console.log("procurando para editar o item",id)
    console.log("Valor do campo",nomeCamp)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/editarNome',
        contentType: 'application/json',
        data: JSON.stringify({ id: id, nome: nomeCamp, desc: descCamp, dataInit:dataInit, dataFinal: dataFinal}),
        success: function(response) {
                carregaData()
        },
        error: function(){
            alert("nao pode alterar")
        }
    });
}

function removeData(id){
    console.log(id)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/deletar',
        contentType: 'application/json',
        data: JSON.stringify({ id: id }),
        success: function(response){
            carregaData();
            console.log('removido com sucesso')
        },
        error: function (){
            alert('error ao remover');
        }
        
    });
}

function editDinamic(id){
    var nomeCell = $(`#${id} td:eq(0)`); 
    var nomeAtual = nomeCell.text(); 
    var inputNome = $(`<input type="text" name="nome" id="${id}nome"  >`).val(nomeAtual); 
    var descCell = $(`#${id} td:eq(1)`);
    var descAtual = descCell.text(); 
    var inputDesc = $(`<textarea name="descricao" id="${id}descricao"  >`).val(descAtual); 
    var dataCell = $(`#${id} td:eq(2)`);
    var dataAtual = dataCell.text()
    var dataFCell = $(`#${id} td:eq(3)`);
    var dataFAtual = dataFCell.text()
    // console.log(formatarData(dataAtual))
    // var valoresAtuais = {
    //     nome : nomeAtual,
    //     desc : descAtual,
    //     dataAtual: dataAtual
    // }
    var inputdataInit = $(`<input type="text" class="form-control" id="${id}dataInicial" name="dataInicial" required>`).val(dataAtual)
    var inputdataFinal = $(`<input type="text" class="form-control" id="${id}dataFinal" name="dataFinal" required>`).val(dataFAtual)
    nomeCell.empty().append(inputNome);
    descCell.empty().append(inputDesc);
    dataCell.empty().append(inputdataInit);
    dataFCell.empty().append(inputdataFinal)




    var actions = $(`#${id} td:eq(5)`);
    var btn1 = $(`<button type="button" onclick="carregaData()" class="btn btn-outline-danger">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
    </button>`); 
    var btn2 = $(`<button type="button" class="btn btn-outline-success" onclick="editaNome(${id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    </button>`);
    actions.empty().append(btn1);
    actions.append(btn2);
}

function editData(id) {
    var elemento = responseData.find(item => item.id === id);

    
    var form = $('<form>');
    var coluna = $('<td>dsa</td>');
    $(`#${id}`).append(form);

    var nomeCell = $(`#${id} td:eq(0)`); 
    var nomeAtual = nomeCell.text(); 
    var inputNome = $('<input type="text" name="nome">').val(nomeAtual); 
    form.append(inputNome);

    var descCell = $(`#${id} td:eq(1)`); 
    var descAtual = descCell.text(); 
    var inputdesc = $('<textarea name="descricao"></textarea>').val(descAtual); 
    form.append(inputdesc);

    var dataInitCell = $(`#${id} td:eq(2)`); 
    var dataInitAtual = dataInitCell.text(); 
    var inputdataInit = $('<input type="datetime" name="data_inicial">').val(dataInitAtual); 
    form.append(inputdataInit);

    var dateFinalCell = $(`#${id} td:eq(3)`); 
    var dateFinalAtual = dateFinalCell.text(); 
    var inputdateFinal = $('<input type="datetime" name="data_final">').val(dateFinalAtual); 
    form.append(inputdateFinal);

    var inputId = $('<input type="hidden" name="id">').val(id);
    form.append(inputId);

    var actions = $(`#${id} td:eq(5)`);
    var btn1 = $(`<button type="button" onclick="carregaData()" class="btn btn-outline-danger">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
    </button>`); 
    var btn2 = $(`<button type="button" class="btn btn-outline-success">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    </button>`);
    actions.empty().append(btn1);
    actions.append(btn2);

    // btn2.click(function() {
    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://localhost:5000/editar', // Coloque a URL correta para o seu backend
    //         data: form.serialize(),
    //         success: function(response) {
    //             carregaData()
    //             // Faça algo com a resposta do servidor, se necessário
    //             console.log('Dados enviados com sucesso!');
    //         },
    //         error: function() {
    //             alert('Erro ao enviar os dados.');
    //         }
    //     });
    // });
}


function realizaTarefa(id){
    var elemento = responseData.find(item => item.id === id);
    var realizado;
    if (elemento.realizado == 0){
        realizado = 1
    }else realizado = 0
    $.ajax({
        type: 'POST',
        url: 'http://localhost:5000/realizaTarefa',
        contentType: 'application/json',
        data: JSON.stringify({ id: id, realizado: realizado }),
        success: function(response){
            carregaData();
            console.log('alterado com sucesso')
        },
        error: function (){
            alert('error ao alterar ');
        },
        
    });
}
function formatarData(dataString) {
    // Substitua 'T' por um espaço
    const formattedDate = dataString.replace('T', ' ');
    return formattedDate;
}

$(document).ready(function () {
    carregaData();
    $(".formulario").hide(); 
    $('#abrirForm').click(function (){
        $(".formulario").fadeToggle();
    });
    $('#meuFormulario').submit(function (event) {
        event.preventDefault(); 
        var formData = $(this).serialize(); 

        console.log(formData)
        // console.log(formData['dataInicial'])
        // console.log(formData['dataFinal'])
        
        // formData['dataInicial'] = formatarData(formData['dataInicial'].toString())
        // formData['dataFinal'] = formatarData(formData['dataFinal'].toString())
        
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/processar_formulario',
            data: formData,
            success: function (response) {
                carregaData();
               
            },
            error: function () {
                alert('Ocorreu um erro ao enviar o formulário.');
            }
        });
    });
});