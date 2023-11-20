-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 16/11/2023 às 19:49
-- Versão do servidor: 8.0.30
-- Versão do PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `previ`
--
CREATE DATABASE IF NOT EXISTS `previ` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `previ`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `jogador`
--

CREATE TABLE `jogador` (
  `id` int NOT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `empresa` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) DEFAULT NULL,
  `respostasDoUsuario` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dataCadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pontos` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `jogador`
--

INSERT INTO `jogador` (`id`, `nome`, `email`, `empresa`, `telefone`, `respostasDoUsuario`, `dataCadastro`, `pontos`) VALUES
(1, 'davi', 'davi@lide', NULL, NULL, NULL, '2023-11-16 16:11:15', 0),
(2, 'teste', 'teste@tete', '3333', '11111', '[\"4-B\",\"19-B\",\"23-C\",\"3-B\",\"D\"]', '2023-11-16 16:12:02', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `jogador`
--
ALTER TABLE `jogador`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `jogador`
--
ALTER TABLE `jogador`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
