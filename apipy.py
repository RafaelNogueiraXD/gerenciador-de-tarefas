from flask import Flask, request, jsonify
from flask_cors import CORS 
from bd import *
app = Flask(__name__)
CORS(app) 
# @app.route('/loadData2',methods=['GET'])
# def loadData2():
#     bdResponse = selectWithDicionary()
#     return jsonify(bdResponse)
@app.route('/loadData',methods=['GET'])
def loadData():
    bdResponse = selectWithDicionary()
    return jsonify(bdResponse)
@app.route('/loadDataByDataFinal',methods=['GET'])
def loadDataByDataFinal():
    bdResponse = orderByDataFinal()
    return jsonify(bdResponse)

@app.route('/loadDataByPrioridade',methods=['GET'])
def loadDataByPrioridade():
    bdResponse = orderByPrioridade()
    return jsonify(bdResponse)

@app.route('/loadDataByCategoria',methods=['GET'])
def loadDataByCategoria():
    bdResponse = orderByCategoria()
    return jsonify(bdResponse)


@app.route('/processar_formulario', methods=['POST'])
def processar_formulario():
    nome = request.form['nome']
    desc = request.form['desc']
    dataInicial = request.form['dataInicial']
    dataFinal = request.form['dataFinal']
    categorias = request.form['categoria']
    prioridade = request.form['prioridade']
    print(request.form)
    print(dataInicial)
    print(type(dataInicial))
    dataInicial = dataInicial.replace("T"," ")
    print(dataInicial)
    dataFinal = dataFinal.replace("T",' ')
    realizados = 0
    print(realizados)
    insertAll(nome=nome, 
              descricao=desc, 
              data_inicial=dataInicial, 
              data_final=dataFinal,
              realizado=realizados,
              categorias=categorias,
              prioridade=prioridade)
    return jsonify(1)

@app.route('/deletar', methods=['POST'])
def deletar():
    print("Dados do formulário:", request.form)
    print("Dados JSON:", request.json)
    dados = request.form.to_dict() 
    id2 = request.json['id']  
    id = dados.get('id') 
    delete("lista", f"where idlista={id2}")
    response = jsonify({'success': True})
    return response

@app.route('/editarNome', methods=['POST'])
def editarInfo():
    print("Dados do formulário:", request.json)
        
    update("lista",f"nome ='{request.json['nome']}',descricao='{request.json['desc']}',data_inicio='{request.json['dataInit']}',data_final='{request.json['dataFinal']}', prioridade='{request.json['prioridade']}' ", f"where idlista={request.json['id']}")

    return jsonify({'success': True})

@app.route('/realizaTarefa', methods=['POST'])
def realizaTarefa():
    id = request.json['id']
    realiza = request.json['realizado']
    update("lista",f"realizado ='{realiza}'", f"where idlista={id}")
    return jsonify({'success': True})

@app.route('/mostraCategorias')
def pegaCategorias():
    dicionario = selectWithDicionaryCategory()
    return jsonify(dicionario)
@app.route('/cadastraCategoria', methods=['POST'])
def cadastraCategoria():
    print("Dados do formulário:", request.form)
    insert('categoria',f"default, '{request.form['nome']}'")

    return jsonify({'success': True})
# 

    



if __name__ == '__main__':
    app.run(debug=True)
