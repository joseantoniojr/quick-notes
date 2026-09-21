import {
	adicionaNota,
	alteraStatusFavorita,
	editaNota,
	excluiNota,
	filtraNotasFavoritas,
	listaNotas,
} from "./notes.js";
import { alteraTema, carregaTema } from "./theme.js";
import { renderizaNaTela } from "./render.js";

// buttons
const btnAddNote = document.querySelector("#btn-add-note");
const btnFavorite = document.querySelector("#btn-favorite");
const btnToggleTheme = document.querySelector("#btn-toggle-theme");

const btnCloseNote = document.querySelector("#btn-close-note");
const btnCancelNote = document.querySelector("#btn-cancel-note");
const btnSaveNote = document.querySelector("#btn-save-note");

const btnCloseConfirmation = document.querySelector("#btn-close-confirmation");
const btnCancelConfirmation = document.querySelector("#btn-cancel-confirmation");
const btnDeleteConfirmation = document.querySelector("#btn-save-confirmation");
// Inputs
const title = document.querySelector("#note-title");
const content = document.querySelector("#note-content");
// Modal
const noteModal = document.querySelector("#modal-note");
const confirmationModal = document.querySelector("#modal-confirmation");
// Elements
const notesContainer = document.querySelector("#notes-container");
const titleModal = document.querySelector("#modal-note-title");
// Auxiliary Variable
let editingNoteId = null;
let deletingNoteId = null;

// Toggle Tema
btnToggleTheme.addEventListener("click", alteraTema);

// Event Add Note
btnAddNote.addEventListener("click", () => {
	noteModal.showModal();
	titleModal.textContent = "Add Nova Nota";
});

btnCloseNote.addEventListener("click", () => noteModal.close());
btnCancelNote.addEventListener("click", () => noteModal.close());

noteModal.addEventListener("close", limpaEstado);
noteModal.addEventListener("click", (e) => {
	if (e.target === noteModal) {
		noteModal.close();
	}
});

btnSaveNote.addEventListener("click", (e) => {
	e.preventDefault();

	if (editingNoteId) {
		const editNote = editaNota(editingNoteId, title.value, content.value);
		if (editNote.sucesso) {
			atualizaLista();
			noteModal.close();
		}
	} else {
		const addNote = adicionaNota(title.value, content.value);

		if (addNote.sucesso) {
			atualizaLista();
			noteModal.close();
		}
	}
});

// Events Note
notesContainer.addEventListener("click", (e) => {
	const btn = e.target.closest("button");

	if (!btn) return;

	if (btn.id === "btn-empty-add-note") {
		noteModal.showModal();
		titleModal.textContent = "Add Nova Nota";
	}

	const idNote = Number(btn.dataset.noteId);
	const action = btn.dataset.action;

	if (action === "favorite") {
		alteraStatusFavorita(idNote);
		atualizaLista();
	}

	if (action === "edit") {
		const note = listaNotas().find((n) => n.id === idNote);

		noteModal.showModal();
		titleModal.textContent = "Editar nota";

		title.value = note.titulo;
		content.value = note.conteudo;
		editingNoteId = idNote;
	}

	if (action === "delete") {
		deletingNoteId = idNote;
		confirmationModal.showModal();
	}
});

// Events Confirmation
btnCloseConfirmation.addEventListener("click", () => confirmationModal.close());
btnCancelConfirmation.addEventListener("click", () => confirmationModal.close());
confirmationModal.addEventListener("click", (e) => {
	if (e.target === confirmationModal) {
		confirmationModal.close();
	}
});

btnDeleteConfirmation.addEventListener("click", () => {
	excluiNota(deletingNoteId);
	atualizaLista();
	confirmationModal.close();
});

// Filter Notes
btnFavorite.addEventListener("click", () => {
	btnFavorite.classList.toggle("is-active");

	atualizaLista();
});

function atualizaLista() {
	if (btnFavorite.classList.contains("is-active")) {
		renderizaNaTela(filtraNotasFavoritas());
	} else {
		renderizaNaTela(listaNotas());
	}
}

function limpaEstado() {
	editingNoteId = null;
	title.value = "";
	content.value = "";
}

carregaTema();
atualizaLista();
