from flask import Flask, request, jsonify
from flask_cors import CORS 
from bd import *
app = Flask(__name__)
CORS(app) 
@app.route('/loadData',methods=['GET'])
def loadData():
    bdResponse = selectWithDicionary()
    return jsonify(bdResponse)

@app.route('/processar_formulario', methods=['POST'])
def processar_formulario():
    nome = request.form['nome']
    desc = request.form['desc']
    dataInicial = request.form['dataInicial']
    dataFinal = request.form['dataFinal']
    # aceitar = request.form.get('aceitar')
    aceitar = 0
    print(aceitar)
    insertAll(nome=nome, 
              descricao=desc, 
              data_inicial=dataInicial, 
              data_final=dataFinal,
              realizado=aceitar)
    # resposta = {'mensagem': 'Formulário recebido com sucesso!', 'nome': nome, 'data': data, 'aceitar': aceitar}
    return jsonify(1)

@app.route('/deletar', methods=['POST'])
def deletar():
    print("Dados do formulário:", request.form)
    print("Dados JSON:", request.json)
    dados = request.form.to_dict() 
    id2 = request.json['id']  
    id = dados.get('id') 
    # print(id2)
    # print(type(id2))
    delete("lista", f"where idlista={id2}")
    response = jsonify({'success': True})
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5000/')
    return response

@app.route('/editarNome', methods=['POST'])
def editarInfo():
    print("Dados do formulário:", request.json)
    update("lista",f"nome ='{request.json['nome']}'", f"where idlista={request.json['id']}")

    return jsonify({'success': True})

@app.route('/realizaTarefa', methods=['POST'])
def realizaTarefa():
    id = request.json['id']
    realiza = request.json['realizado']
    # print(id, realiza)
    update("lista",f"realizado ='{realiza}'", f"where idlista={id}")
    return jsonify({'success': True})

# 

    



if __name__ == '__main__':
    app.run(debug=True)
