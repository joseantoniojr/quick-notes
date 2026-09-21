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

noteModal.addEventListener("click", (e) => {
	if (e.target === noteModal) {
		noteModal.close();
	}
});

btnSaveNote.addEventListener("click", (e) => {
	e.preventDefault();

	if (editingNoteId) {
		editaNota(editingNoteId, title.value, content.value);
		renderizaNaTela(listaNotas());
		noteModal.close();
		title.value = "";
		content.value = "";
	} else {
		editingNoteId = null;
		const addNote = adicionaNota(title.value, content.value);

		if (addNote.sucesso) {
			renderizaNaTela(listaNotas());
			noteModal.close();
			title.value = "";
			content.value = "";
		}
	}
});

// Events Note
notesContainer.addEventListener("click", (e) => {
	const btn = e.target.closest("button");
	const id = Number(btn.dataset.noteId);

	console.log(btn);

	if (btn.id === "btn-empty-add-note") {
		noteModal.showModal();
	}

	if (btn.classList.contains("btn--favorite")) {
		alteraStatusFavorita(id);
		btn.classList.toggle("is-active");
	}

	if (btn.classList.contains("btn--edit")) {
		const listNotes = listaNotas();
		const note = listNotes.find((n) => n.id === id);

		noteModal.showModal();
		titleModal.textContent = "Editar nota";

		title.value = note.titulo;
		content.value = note.conteudo;
		editingNoteId = id;
	}

	if (btn.classList.contains("btn--delete")) {
		deletingNoteId = id;
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
	renderizaNaTela(listaNotas());
	confirmationModal.close();
});

// Filter Notes
btnFavorite.addEventListener("click", () => {
	btnFavorite.classList.toggle("is-active");

	if (btnFavorite.classList.contains("is-active")) {
		renderizaNaTela(filtraNotasFavoritas());
	} else {
		renderizaNaTela(listaNotas());
	}
});

carregaTema();
renderizaNaTela(listaNotas());
