import { normalizaTexto, resposta } from "./helpers.js";
import { salvaDados, buscaDados } from "./storage.js";

function listaNotas() {
	const notas = buscaDados("notas");

	const notasAtualizadas = notas.map((nota) => {
		nota.criadoEm = new Date(nota.criadoEm);

		if (nota.atualizadoEm) {
			nota.atualizadoEm = new Date(nota.atualizadoEm);
		}

		return nota;
	});

	return notasAtualizadas;
}

function adicionaNota(titulo, conteudo) {
	const notas = listaNotas();

	titulo = normalizaTexto(titulo);
	conteudo = normalizaTexto(conteudo);

	if (titulo === "") return resposta(false, "O título da nota é obrigátorio");
	if (conteudo === "") return resposta(false, "O conteudo da nota é obrigátorio");

	const nota = {
		id: Date.now(),
		titulo,
		conteudo,
		favorita: false,
		criadoEm: new Date(),
		atualizadoEm: null,
	};

	notas.push(nota);

	salvaDados("notas", notas);

	return resposta(true, "Nota adicionada com sucesso", nota);
}

function editaNota(idNota, titulo, conteudo) {
	const notas = listaNotas();

	const nota = notas.find((n) => n.id === idNota);
	if (!nota) return resposta(false, "Esta nota não existe");

	titulo = normalizaTexto(titulo);
	conteudo = normalizaTexto(conteudo);

	if (titulo === "") return resposta(false, "O título da nota é obrigátorio");
	if (conteudo === "") return resposta(false, "O conteudo da nota é obrigátorio");

	nota.titulo = titulo;
	nota.conteudo = conteudo;
	nota.atualizadoEm = new Date();

	salvaDados("notas", notas);

	return resposta(true, "Editada com sucesso", nota);
}

function excluiNota(id) {
	const notas = listaNotas();

	const notasAtualizadas = notas.filter((nota) => nota.id !== id);
	if (notasAtualizadas.length === notas.length)
		return resposta(false, "Não foi possível excluir nota, pois essa nota não existe");

	salvaDados("notas", notasAtualizadas);

	return resposta(true, "Nota excluída com sucesso", notasAtualizadas);
}

function alteraStatusFavorita(id) {
	const notas = listaNotas();

	const nota = notas.find((n) => n.id === id);
	if (!nota) return resposta(false, "Esta nota não existe");

	nota.favorita = !nota.favorita;

	salvaDados("notas", notas);

	return resposta(true, "O status de favorita foi alterado", nota);
}

function filtraNotasFavoritas() {
	const notas = listaNotas();
	const notasFavoritas = notas.filter((nota) => nota.favorita);
	return notasFavoritas;
}

export { listaNotas, adicionaNota, editaNota, excluiNota, alteraStatusFavorita, filtraNotasFavoritas };
