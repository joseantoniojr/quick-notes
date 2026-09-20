import { buscaDados, salvaDados } from "./storage.js";

const html = document.documentElement;

function alteraTema() {
	const temaAtual = html.dataset.theme;

	const novoTema = temaAtual === "dark" ? "ligth" : "dark";

	html.dataset.theme = novoTema;

	salvaDados("theme", novoTema);
}

function carregaTema() {
	const temaSalvo = buscaDados("theme");

	if (temaSalvo === "dark" || temaSalvo === "ligth") {
		html.dataset.theme = temaSalvo;
	}
}

export { alteraTema, carregaTema };
