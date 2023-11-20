<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
	<title>Glide</title>
	<link rel=icon href="img/favicon.png" type="image/png">
	<link rel="stylesheet" href="css/index.css">
	<script src="js/index.js"></script>
	<script src="js/jquery.js"></script>
  	<script src="js/jquery-ui.js"></script>
</head>
<body onselectstart="return false">
	<div id="conteudoGeral" class="conteudo">
		<img class="btn-engrenagem" src="img/engrenagem.png" onclick="abrirSenha()">

		<div id="loginSenha" class="login-senha">
			<img id="imgCadeado" class="img-cadeado" src="img/cadeado.png">
			<label class="txt-senha">SENHA</label>
			<input id="txtSenha" class="input-senha" type="password" name="senha" maxlength="4">
			<div class="tabela-numeros">
				<div class="numeros" id="num01" onclick="adicionarNumero(1)"> 1 </div>
				<div class="numeros" id="num02" onclick="adicionarNumero(2)"> 2 </div>
				<div class="numeros" id="num03" onclick="adicionarNumero(3)"> 3 </div>
				<div class="numeros" id="num04" onclick="adicionarNumero(4)"> 4 </div>
				<div class="numeros" id="num05" onclick="adicionarNumero(5)"> 5 </div>
				<div class="numeros" id="num06" onclick="adicionarNumero(6)"> 6 </div>
				<div class="numeros" id="num07" onclick="adicionarNumero(7)"> 7 </div>
				<div class="numeros" id="num08" onclick="adicionarNumero(8)"> 8 </div>
				<div class="numeros" id="num09" onclick="adicionarNumero(9)"> 9 </div>
				<div class="numeros" id="limpar" onclick="limparSenha()"><img class="btn-nao" src="img/nao.png"></div>
				<div class="numeros" id="num00" onclick="adicionarNumero(0)"> 0 </div>
				<div class="numeros" id="validar" onclick="validar()"><img class="btn-sim" src="img/sim.png"></div>
				<div class="btn-fechar" id="fechar" onclick="fecharSenha()"> SAIR </div>
			</div>
			<h1 class="glide">Powered by Glide</h1>
		</div>

		<div id="tabelaOpcoes" class="opcoes">
			<h1 class="painel">Painel de Controle</h1>

			<h1 class="txt-fechar-app">Deseja fechar a aplicação?</h1>
			<div class="btn-fechar-app btn-fechar-sim" onclick="location.href='fechar-app.php'">SIM</div>
			<div class="btn-fechar-app btn-fechar-nao" onclick="fecharOpcoes()">NÃO</div>

			<h1 class="glide">Powered by Glide</h1>
		</div>
	</div>
</body>
</html>
<script type="text/javascript">
	// abrirSenha();
	function abrirSenha(){
		$( "#loginSenha" ).css("display", "block");
	}
	function fecharSenha(){
		$( "#loginSenha" ).css("display", "none");
		$( "#txtSenha" ).val("");
	}

	function fecharOpcoes(){
		$( "#tabelaOpcoes" ).css("display", "none");
		$( "#loginSenha" ).css("display", "block");
	}

	function limparSenha(){ $( "#txtSenha" ).val(""); }

	function validar(){
		var senha = $( "#txtSenha" ).val();
		if (senha != 67103){
			$( "#imgCadeado" ).attr("src", "img/cadeado-fechado.png");
			// $( "#imgCadeado" ).hide(10).show("shake", {distance:'2'}, 400);
			$( "#txtSenha" ).val("");
			setTimeout(function(){ $( "#imgCadeado" ).attr("src", "img/cadeado.png"); }, 410);
		}else{
			$( "#imgCadeado" ).attr("src", "img/cadeado-aberto.png");
			setTimeout(function(){ 
				$( "#loginSenha" ).css("display", "none");
				$( "#tabelaOpcoes" ).css("display", "block");
			}, 240);
			setTimeout(function(){ 
				$( "#imgCadeado" ).attr("src", "img/cadeado.png");
				$( "#txtSenha" ).val("");
			}, 250);
		}
	}

	function adicionarNumero(_num){
		var senha = $( "#txtSenha" ).val();
		if (senha.length < 5) {
			$( "#txtSenha" ).val($( "#txtSenha" ).val() + _num);
		}
	}
</script>