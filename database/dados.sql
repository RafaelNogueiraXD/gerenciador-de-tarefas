CREATE DATABASE testedb;
USE testedb;
CREATE TABLE `testedb`.`lista` (
  `idlista` INT NOT NULL,
  `nome` VARCHAR(255) NOT NULL,
  `descricao` TEXT,
  `data_inicio` varchar(45) NOT NULL,
  `data_final` varchar(45) NOT NULL,
  `realizado` TINYINT NOT NULL,
  `prioridade` INT NOT NULL,
  PRIMARY KEY (`idlista`)
);
UPDATE `testedb`.`lista` SET `prioridade` = '1' WHERE (`idlista` = '1');
UPDATE `testedb`.`lista` SET `prioridade` = '2' WHERE (`idlista` = '7');
UPDATE `testedb`.`lista` SET `prioridade` = '3' WHERE (`idlista` = '14');
UPDATE `testedb`.`lista` SET `prioridade` = '2' WHERE (`idlista` = '10');
UPDATE `testedb`.`lista` SET `prioridade` = '1' WHERE (`idlista` = '16');

ALTER TABLE `testedb`.`lista` 
ADD COLUMN `categoriaID` INT NULL AFTER `realizado`;
ALTER TABLE `testedb`.`lista` 
CHANGE COLUMN `idlista` `idlista` INT(11) NOT NULL AUTO_INCREMENT ;
CREATE TABLE `testedb`.`categoria` (
  `idcategoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`idcategoria`));

INSERT INTO `testedb`.`categoria` (`idcategoria`, `nome`) VALUES ('1', 'escola');
INSERT INTO `testedb`.`categoria` (`idcategoria`, `nome`) VALUES ('2', 'medico');
INSERT INTO `testedb`.`categoria` (`idcategoria`, `nome`) VALUES ('3', 'lazer');



INSERT INTO `testedb`.`lista` (`idlista`, `nome`, `descricao`, `data_inicio`, `data_final`, `realizado`)
VALUES ('5', 'Tarefa importante', 'Concluir relatório mensal', '2024-04-21 10:00:00', '2024-04-21 17:00:00', '0');

-- Dados 2
INSERT INTO `testedb`.`lista` (`idlista`, `nome`, `descricao`, `data_inicio`, `data_final`, `realizado`)
VALUES ('6', 'Reunião', 'Apresentação de resultados', '2024-04-22 14:30:00', '2024-04-22 15:30:00', '0');

-- Dados 3
INSERT INTO `testedb`.`lista` (`idlista`, `nome`, `descricao`, `data_inicio`, `data_final`, `realizado`)
VALUES ('7', 'Compras', 'Comprar mantimentos para a semana', '2024-04-23 09:00:00', '2024-04-23 10:00:00', '0');
-- Dados 4
INSERT INTO `testedb`.`lista` (`idlista`, `nome`, `descricao`, `data_inicio`, `data_final`, `realizado`)
VALUES ('8', 'Projeto XYZ', 'Desenvolvimento de aplicativo móvel', '2024-04-24 08:00:00', '2024-04-25 18:00:00', '0');

-- Dados 5
INSERT INTO `testedb`.`lista` (`idlista`, `nome`, `descricao`, `data_inicio`, `data_final`, `realizado`)
VALUES ('9', 'Estudo', 'Preparação para exame de certificação', '2024-04-26 19:00:00', '2024-04-26 22:00:00', '0');

-- Dados 6
INSERT INTO `testedb`.`lista` (`idlista`, `nome`, `descricao`, `data_inicio`, `data_final`, `realizado`)
VALUES ('10', 'Aniversário', 'Comprar presente para amigo', '2024-04-27 12:00:00', '2024-04-27 13:30:00', '0');

SELECT idlista,lista.nome,descricao,data_inicio,data_final,realizado,c.nome as categoria_nome,prioridade from 
lista inner join categoria as c on c.idcategoria=lista.categoriaID order by prioridade asc; 

SELECT idlista,lista.nome,descricao,data_inicio,data_final,realizado,c.nome as categoria_nome,prioridade from 
lista inner join categoria as c on c.idcategoria=lista.categoriaID order by data_final asc; 