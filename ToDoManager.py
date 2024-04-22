from tkinter import Scrollbar
from click import edit
import flet as ft
from bd import *
# from functions import *

def main(page: ft.Page):
        page.scroll=True
        lv = ft.DataTable(column_spacing=page.width/7,columns=[ft.DataColumn(ft.Text("Tarefa"))
                                ,ft.DataColumn(ft.Text("Descrição")),
                                ft.DataColumn(ft.Text("Data Limite"))
                                ,ft.DataColumn(ft.Text("Realizada")),
                                ft.DataColumn(ft.Text("Deletar")),
                                ft.DataColumn(ft.Text("Editar"))
                                ])

        def delete_row_index(i):
            print(f"quero apagar {i}") 
            lv.rows.remove(lv.rows[i])
            page.update()

        def edit_row_index(e):
            e.control.content.value = input()
            page.update()

        def page_resized(e):
            lv.column_spacing= page.width/7
            page.update()
        def addWarn(e):
            page.snack_bar = ft.SnackBar(ft.Text(f"cadastrado com sucesso!"))
            page.snack_bar.open = True
            # d.counter += 1
            page.update()
 
        def buttonClicked(e):
            task_name = new_task.value
            task_description = task_desc.value
            task_date = task_due_date.value
            addWarn(e)
            
            # Adiciona a tarefa à página e armazena a referência à checkbox
            checkbox = ft.Checkbox()
            print(checkbox)
            v=len(lv.rows)
            button = ft.FloatingActionButton(icon=ft.icons.DELETE_FOREVER, on_click=lambda e: delete_row_index(v) ,width=30, height=30)
            button2 = ft.FloatingActionButton(icon=ft.icons.EDIT, on_click=lambda e: edit_row_index(v) ,width=30, height=30)
            # checkbox.value = 0
            task_info = ft.DataRow(cells=[
                ft.DataCell(ft.Text(task_name),show_edit_icon=True, on_tap=edit_row_index),
                ft.DataCell(ft.Text(task_description)),
                ft.DataCell(ft.Text(task_date)), 
                ft.DataCell(checkbox),
                ft.DataCell(button),
                ft.DataCell(button2)
                ])

            lv.rows.append(task_info)
            
            # Limpa os campos de entrada
            clearFields()
            
            # Atualiza a página
            page.update()

        def clearFields():
            new_task.value = ""
            task_desc.value = ""
            task_due_date.value = ""

        def removeLastCheckbox(e):
            if lv.rows:
                lv.rows.pop()
                page.update()
        def preLoad():
            resultado = select("*", "lista", "")
            # print(resultado)

            for task in resultado:
                if task[5] == 0: 
                    checkbox = ft.Checkbox(value=False)
                else: 
                    checkbox = ft.Checkbox(value=True)
                v=len(lv.rows)
                print(f"total de rows {v}")
                button = ft.FloatingActionButton(icon=ft.icons.DELETE_FOREVER, on_click=lambda e: delete_row_index(v), width=30, height=30)
                button2 = ft.FloatingActionButton(icon=ft.icons.EDIT, on_click=lambda e: edit_row_index(v), width=30, height=30)
                task_info = ft.DataRow(cells=[
                    ft.DataCell(ft.Text(task[1]),show_edit_icon=True, on_tap=edit_row_index),
                    ft.DataCell(ft.Text(task[2])),
                    ft.DataCell(ft.Text(task[3])),
                    ft.DataCell(checkbox),
                    ft.DataCell(button),
                    ft.DataCell(button2)
                ])
                lv.rows.append(task_info)
        preLoad()
        new_task = ft.TextField(hint_text="Nome da Tarefa")
        task_desc = ft.TextField(hint_text="Descrição da Tarefa")
        task_due_date = ft.TextField(hint_text="Data Limite (AAAA-MM-DD)")

        add_button = ft.FloatingActionButton(icon=ft.icons.ADD, on_click=buttonClicked)
        remove_button = ft.FloatingActionButton(icon=ft.icons.DELETE, on_click=removeLastCheckbox)
        row = ft.Row([add_button, remove_button])
        page.add(new_task, task_desc, task_due_date)
        page.add(row)
        page.add(lv)
        page.on_resize=page_resized

# ft.app(target=main,view=ft.WEB_BROWSER)
ft.app(target=main)
close_connection()
