import { buscaDados, salvaDados } from "./storage.js";

const html = document.documentElement;
const btnToggleTheme = document.querySelector("#btn-toggle-theme");

function atualizaIconeTema(tema) {
	if (tema === "dark") {
		btnToggleTheme.innerHTML = `
		<svg height="100" width="100" viewBox="0 0 24 24" fill="currentColor" style="color: #f1c40f;">
		<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a.5.5 0 0 0-.57-.44 7 7 0 1 1-7.11-7.11.5.5 0 0 0-.44-.57C12.92 3.04 12.46 3 12 3z" stroke="currentColor" stroke-width="0.5" stroke-linejoin="round"/>
		</svg>
		`;
	} else {
		btnToggleTheme.innerHTML = `
		<svg height="24" width="24" viewBox="0 0 24 24" fill="orangered">
		<circle cx="12" cy="12" r="5" fill="gold" />
		<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="gold" stroke-width="2" stroke-linecap="round" />
		</svg>
		`;
	}
}

function alteraTema() {
	const temaAtual = html.dataset.theme;

	const novoTema = temaAtual === "dark" ? "light" : "dark";

	html.dataset.theme = novoTema;
	atualizaIconeTema(novoTema);

	salvaDados("theme", novoTema);
}

function carregaTema() {
	const temaSalvo = buscaDados("theme");

	if (!temaSalvo) {
		html.dataset.theme = "light";
		atualizaIconeTema("light");
	}

	if (temaSalvo === "dark" || temaSalvo === "light") {
		html.dataset.theme = temaSalvo;
		atualizaIconeTema(temaSalvo);
	}
}

export { alteraTema, carregaTema };
