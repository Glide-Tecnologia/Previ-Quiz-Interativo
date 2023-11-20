<?php 


function fecharAplicacao(){
	$arquivo = "app/ArqTeste.txt";
	$fp = fopen($arquivo, "w");
	fwrite($fp, "1");
	fclose($fp);
}

