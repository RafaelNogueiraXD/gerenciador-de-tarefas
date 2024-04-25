let responseData = [];
let categorias = [];

function DiferencaDatas(data1, data2){
    console.log("Data1="+data1 + " Data 2 = "+ data2);
    var dataInicialMs = new Date(data1).getTime();
    var dataFinalMs = new Date(data2).getTime();

    if (dataInicialMs > dataFinalMs) {
        return false;
    }

    var diferencaMs = dataFinalMs - dataInicialMs;
    console.log("Diferenca ms = " + diferencaMs);

    var dias = Math.floor(diferencaMs / (1000 * 60 * 60 * 24));
    var horas = Math.floor((diferencaMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return  dias + ' dias e ' + horas + ' horas.';
}
function verMais(id){
    var elemento = responseData.find(item => item.id === id);
    $(`#tituloModal`).empty().append("Visualizando ",elemento.nome);
    $(`#nomeCampo`).empty().append("<b>Nome: </b>",elemento.nome);
    $(`#descCampo`).empty().append("<b>Descricao: </b>",elemento.descricao);
    $(`#dataInicio`).empty().append("<b>Data Inicial: </b>",elemento.data_inicial);
    $(`#dataFinalx`).empty().append("<b>Data Final: </b>",elemento.data_final);
    $(`#realizado`).empty().append("<b>Realizado: </b>",elemento.realizado);
    $(`#prioridade`).empty().append("<b>Prioridade: </b>",elemento.prioridade);
    $(`#categoria`).empty().append("<b>Categoria: </b>", elemento.categoria);
    $(`#fechador`).hide();
  }
function editaModal(id){
    var elemento = responseData.find(item => item.id === id);
    $(`#tituloModal`).empty().append("Visualizando ",elemento.nome);
    
    var nomeCell = $(`#${id} td:eq(0)`); 
    var nomeAtual = nomeCell.text(); 
    var inputNome = $(`<input type="text" class="form-control" name="nome" id="${id}nome"  >`).val(nomeAtual); 
    $(`#nomeCampo`).empty().append("<b>Nome: </b>",inputNome);
    var descCell = $(`#${id} td:eq(1)`);
    var descAtual = descCell.text(); 
    var inputDesc = $(`<textarea name="descricao" class="form-control" id="${id}descricao"  >`).val(descAtual); 
    $(`#descCampo`).empty().append("<b>Descricao: </b>",inputDesc);
    var dataCell = $(`#${id} td:eq(2)`);
    var dataAtual = dataCell.text()
    var inputdataInit = $(`<input type="text" class="form-control" id="${id}dataInicial" name="dataInicial" required>`).val(dataAtual)
    $(`#dataInicio`).empty().append("<b>Data Inicial: </b>",inputdataInit);
    var dataFCell = $(`#${id} td:eq(3)`);
    var dataFAtual = dataFCell.text()
    var inputdataFinal = $(`<input type="text" class="form-control" id="${id}dataFinal" name="dataFinal" required>`).val(dataFAtual)
    $(`#dataFinalx`).empty().append("<b>Data Final: </b>",inputdataFinal);

    var dataPCell = $(`#${id} td:eq(5)`);
    var prioridade_atual = dataPCell.text()
    var inputPrioridade = $(`<input type="number" min=0 class="form-control" id="${id}categoria" name="prioridade" required>`).val(prioridade_atual)
    $(`#prioridades`).empty().append("<b>Prioridade: </b>",inputPrioridade);

    var dataPCell = $(`#${id} td:eq(4)`);
    var prioridade_atual = dataPCell.text()
    var inputPrioridade = $(`<input type="number" min=0 class="form-control" id="${id}categoria" name="prioridade" required>`).val(prioridade_atual)
    $(`#prioridades`).empty().append("<b>Prioridade: </b>",inputPrioridade);

    var btn2 = $(`<button type="button" class="btn btn-outline-success" onclick="editaNome(${id})">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
    </button>`);
    
    $(`#fechador`).show();

    $(`#fechador`).empty().append(btn2);
  
  }

function carregaCategoria(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:5000/mostraCategorias',
        success: function (response) {
            categorias = response;
            $(`#floatingSelect`).empty();
            categorias.forEach(function(item){
                const option = $(`<option value="${item.id}">${item.nome}</option>`)
                $(`#floatingSelect`).append(option)
            })
        },
        error: function (){
            alert('nao foi possivel carrega ')
        }
    })
}

function attTable(response){
    console.log(response)
    response.forEach(function(item) {
        var checkBox = item.realizado ? `<input  class="checkbox-label" type="checkbox" onclick="realizaTarefa(${item.id})" checked>` : `<input class="checkbox-label" type="checkbox" onclick="realizaTarefa(${item.id})">`;
        var elemento = categorias.find(data => data.id === item.categoria);
        console.log(elemento)
        $('#carregaDados').append(`
            <tr id="${item.id}">
                <td id="Col${item.nome}">${item.nome}</td>
                <td>${item.descricao == null ? 'nao preenchido' : item.descricao}</td>
                <td>${item.data_inicial == null ? 'nao preenchido' : item.data_inicial}</td>
                <td>${item.data_final == null ? 'nao preenchido' : item.data_final}</td>
                <td>${item.categoria}</td>
                <td>${item.prioridade}</td>
                <td>${checkBox}</td>
                <td>
                <button type="button" onclick='removeData(${item.id})' class="btn btn-outline-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
                <button type="button"  data-bs-toggle="modal"  data-bs-target="#modalParticular"  onclick='editaModal(${item.id})' class="btn btn-outline-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button>
                <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalParticular" id="abreMod" onclick="verMais(${item.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                    </svg>
                </button>
    


            </tr>
    `);
});
}

async function carregaData(){
    $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/loadData', 
            success: function (response) {
                console.log(response)
                $('#carregaDados').empty();
                
                responseData = response; 
                attTable(response)
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
async function carregaDataByDataFinal(){
    $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/loadDataByDataFinal', 
            success: function (response) {
                console.log(response)
                $('#carregaDados').empty();
                
                responseData = response; 
                attTable(response)
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

async function carregaDataByPrioridade(){
    $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/loadDataByPrioridade', 
            success: function (response) {
                console.log(response)
                $('#carregaDados').empty();
                
                responseData = response; 
                attTable(response)
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


async function carregaDataByCategoria(){
    $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/loadDataByCategoria', 
            success: function (response) {
                console.log(response)
                $('#carregaDados').empty();
                
                responseData = response; 
                attTable(response)
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

// function editDinamic(id){
//     var nomeCell = $(`#${id} td:eq(0)`); 
//     var nomeAtual = nomeCell.text(); 
//     var inputNome = $(`<input type="text" name="nome" id="${id}nome"  >`).val(nomeAtual); 
//     var descCell = $(`#${id} td:eq(1)`);
//     var descAtual = descCell.text(); 
//     var inputDesc = $(`<textarea name="descricao" id="${id}descricao"  >`).val(descAtual); 
//     var dataCell = $(`#${id} td:eq(2)`);
//     var dataAtual = dataCell.text()
//     var inputdataInit = $(`<input type="text" class="form-control" id="${id}dataInicial" name="dataInicial" required>`).val(dataAtual)
//     var dataFCell = $(`#${id} td:eq(3)`);
//     var dataFAtual = dataFCell.text()
//     var inputdataFinal = $(`<input type="text" class="form-control" id="${id}dataFinal" name="dataFinal" required>`).val(dataFAtual)
//     nomeCell.empty().append(inputNome);
//     descCell.empty().append(inputDesc);
//     dataCell.empty().append(inputdataInit);
//     dataFCell.empty().append(inputdataFinal);
//     var actions = $(`#${id} td:eq(5)`);
//     var btn1 = $(`<button type="button" onclick="carregaData()" class="btn btn-outline-danger">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
//         <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
//         </svg>
//     </button>`); 
//     var btn2 = $(`<button type="button" class="btn btn-outline-success" onclick="editaNome(${id})">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
//         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
//     </svg>
//     </button>`);
//     actions.empty().append(btn1);
//     actions.append(btn2);
// }

// function editData(id) {
//     var elemento = responseData.find(item => item.id === id);

    
//     var form = $('<form>');
//     var coluna = $('<td>dsa</td>');
//     $(`#${id}`).append(form);

//     var nomeCell = $(`#${id} td:eq(0)`); 
//     var nomeAtual = nomeCell.text(); 
//     var inputNome = $('<input type="text" name="nome">').val(nomeAtual); 
//     form.append(inputNome);

//     var descCell = $(`#${id} td:eq(1)`); 
//     var descAtual = descCell.text(); 
//     var inputdesc = $('<textarea name="descricao"></textarea>').val(descAtual); 
//     form.append(inputdesc);

//     var dataInitCell = $(`#${id} td:eq(2)`); 
//     var dataInitAtual = dataInitCell.text(); 
//     var inputdataInit = $('<input type="datetime" name="data_inicial">').val(dataInitAtual); 
//     form.append(inputdataInit);

//     var dateFinalCell = $(`#${id} td:eq(3)`); 
//     var dateFinalAtual = dateFinalCell.text(); 
//     var inputdateFinal = $('<input type="datetime" name="data_final">').val(dateFinalAtual); 
//     form.append(inputdateFinal);

//     var inputId = $('<input type="hidden" name="id">').val(id);
//     form.append(inputId);

//     var actions = $(`#${id} td:eq(5)`);
//     var btn1 = $(`<button type="button" onclick="carregaData()" class="btn btn-outline-danger">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
//         <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
//         </svg>
//     </button>`); 
//     var btn2 = $(`<button type="button" class="btn btn-outline-success">
//     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
//         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
//     </svg>
//     </button>`);
//     actions.empty().append(btn1);
//     actions.append(btn2);
// }


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
// function formatarData(dataString) {
//     // Substitua 'T' por um espaço
//     const formattedDate = dataString.replace('T', ' ');
//     return formattedDate;
// }

$(document).ready(function() {
    carregaData();
    $(".formulario").hide(); 
    $('#abrirForm').click(function (){
        $(".formulario").fadeToggle();
    });
    $('#formCategoria').submit(function (event){
        event.preventDefault(); 
        var formData = $(this).serialize(); 
        console.log(formData);
        $.ajax({
            type: 'POST',
            url: 'http://localhost:5000/cadastraCategoria',
            data: formData,
            success: function (response) {
                carregaCategoria();
            },
            error: function () {
                alert('Ocorreu um erro ao enviar o formulário.');
            }
        });
    });
    $('#meuFormulario').submit(function (event) {
        event.preventDefault(); 
        var formDataArray = $(this).serializeArray(); 
        var formData = {};

        // Converte o array para um objeto
        $.each(formDataArray, function(i, field){
            formData[field.name] = field.value;
        });

        console.log("Printando FormData", formData);

        var dataDiff = DiferencaDatas(formData['dataInicial'], formData['dataFinal']);
        if(dataDiff != false){
            console.log(dataDiff);
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
        }else if (dataDiff == false){
            alert("Deu errado");
        }
    })
});