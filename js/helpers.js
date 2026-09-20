function normalizaTexto(texto) {
	return texto ? texto.trim().replace(/\s+g/, " ") : "";
}

function resposta(ok, dados = null) {
	return { sucesso: ok, mensagem: message, dados };
}

export { normalizaTexto, resposta };
