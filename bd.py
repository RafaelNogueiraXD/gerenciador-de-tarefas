import mysql.connector
from globalVars import *
import datetime
try:
    conexao = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )
    cursor = conexao.cursor()
except mysql.connector.Error as err:
    print(f"Erro ao conectar ao banco de dados: {err}")
def select(campos, tabela, condicao=""):
    try:
        comando = f'SELECT {campos} FROM {tabela} {condicao}'
        cursor.execute(comando)
        resultado = cursor.fetchall()
        return resultado
    except mysql.connector.Error as err:
        print(f"Erro ao executar consulta SELECT: {err}")
        return []
def insert( tabela, valores):
    try:
        comando = f'INSERT INTO {tabela} VALUES ({valores})'
        execute(comando)
    except mysql.connector.Error as err:
        print(f"Erro ao executar consulta INSERT: {err}")

def update( tabela, edit, condicao=""):
    try:
        comando = f'UPDATE {tabela} SET {edit} {condicao}'
        execute(comando)
    except mysql.connector.Error as err:
        print(f"Erro ao executar consulta UPDATE: {err}")

def delete( tabela, condicao=""):
    try:
        comando = f'DELETE FROM {tabela} {condicao}'
        execute(comando)
    except mysql.connector.Error as err:
        print(f"Erro ao executar consulta DELETE: {err}")

def execute( comando):
    try:
        cursor.execute(comando)
        conexao.commit()
    except mysql.connector.Error as err:
        print(f"Erro ao executar comando SQL: {err}")

def close_connection():
    try:
        cursor.close()
        conexao.close()
        print("Conexão com o banco de dados fechada.")
    except mysql.connector.Error as err:
        print(f"Erro ao fechar conexão com o banco de dados: {err}")

def showData():
    resultado = select("*", "lista", "")
    for field in resultado: 
        if field[5] == 0:
            done = "Nao" 
        else:
            done = "Sim"
        msg = f"id: {field[0]} Nome: {field[1]}, desc:{field[2]}, data inicial:{field[3]}, data final:{field[4]}, realizado: {done}"
        print(msg)

def selectWithDicionary():
    resultado = select("*", "lista", "")
    dicionary = []
    for field in resultado: 
        partDicionary = { 
            'id' : field[0],
            'nome' : field[1],
            'descricao' : field[2],
            'data_inicial' : field[3],
            'data_final' : field[4],
            'realizado' : field[5],
        }
        # print(dicionary)
        dicionary.append(partDicionary)
    # print(dicionary)
    return dicionary

def insertAll(nome, descricao, data_inicial, data_final,realizado):
    if data_inicial == " ":
        data_inicial = datetime.datetime.now()
    insert("lista", f"default, '{nome}', '{descricao}', '{data_inicial}', '{data_final}', '{realizado}'")

def insertCategoria(nome):
    pass
def selectWithDicionaryCategory():
    pass


# Exemplo de uso da classe
# if __name__ == "_main_":


# resultado = select("*", "lista", "")
# print(resultado)
# insertAll("lista final", "teste", " ","2024-04-22 15:30:00",0)
# showData()
# close_connection()

    # Fechando a conexão com o banco de dados
    # Criando uma instância do banco de dados
    # db = Database(host="localhost", user="root", password="", database="whatsdb")

    # Realizando operações de CRUD
    # db.insert("tabela", "valores")
    # db.update("tabela", "edicao", "condicao")
    # db.delete("tabela", "condicao")
