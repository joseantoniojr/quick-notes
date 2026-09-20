function salvaDados(nome, dado) {
	return localStorage.setItem(nome, JSON.stringify(dado));
}

function buscaDados(nome) {
	const dados = localStorage.getItem(nome);

	return dados ? JSON.parse(dados) : [];
}

export { salvaDados, buscaDados };
