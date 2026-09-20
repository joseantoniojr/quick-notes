function renderizaNaTela(notas) {
	if (notas.length === 0) return renderizaEstadoVazio();

	return renderizaNotas(notas);
}

function renderizaNotas(notas) {
	const container = document.getElementById("notes-container");
	container.classList.add("note-list");
	container.innerHTML = "";

	notas.forEach((nota) => {
		const card = document.createElement("article");
		card.classList.add("note");
		card.dataset.noteId = nota.id;

		const header = document.createElement("header");
		header.classList.add("note__header");

		const title = document.createElement("h2");
		title.classList.add("note__title");
		title.textContent = nota.titulo;

		const btnFavorite = document.createElement("button");
		btnFavorite.classList.add("btn", "btn--favorite", "btn--note");
		btnFavorite.classList.toggle("is-active", nota.favorita);
		btnFavorite.type = "button";
		btnFavorite.setAttribute("title", nota.favorita ? "Remover das favoritas" : "Favoritar");
		btnFavorite.setAttribute("aria-label", nota.favorita ? "Desfavoritar nota" : "Favoritar");
		btnFavorite.dataset.noteId = nota.id;
		btnFavorite.innerHTML = `
        <svg height="32" width="32" viewBox="0 0 24 24" fill="gold">
            <path d="M12 2.6a1 1 0 0 1 .9.6l2.4 4.8 5.3.8a1 1 0 0 1 .6 1.7l-3.8 3.8 1 5.3a1 1 0 0 1-1.4 1.1L12 18.2l-4.8 2.5a1 1 0 0 1-1.4-1.1l1-5.3-3.8-3.8a1 1 0 0 1 .6-1.7l5.3-.8 2.4-4.8a1 1 0 0 1 .9-.6z" stroke="gold" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" />
        </svg>`;

		const content = document.createElement("div");
		content.classList.add("note__content");

		const text = document.createElement("p");
		text.classList.add("note__text");
		text.textContent = nota.conteudo;

		const footer = document.createElement("footer");
		footer.classList.add("note__footer");

		const dateCreated = document.createElement("time");
		dateCreated.classList.add("note__date");

		const date = nota.criadoEm;
		dateCreated.textContent = date.toLocaleDateString("pt-BR", { year: "numeric", month: "short", day: "numeric" });

		const actions = document.createElement("div");
		actions.classList.add("note__actions");

		const edit = document.createElement("button");
		edit.classList.add("btn", "btn--edit", "btn--note");
		edit.type = "button";
		edit.setAttribute("title", "Editar Nota");
		edit.setAttribute("aria-label", "Editar Nota");
		edit.dataset.noteId = nota.id;
		edit.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
        </svg>`;

		const del = document.createElement("button");
		del.classList.add("btn", "btn--delete", "btn--note");
		del.type = "button";
		del.setAttribute("title", "Excluir nota");
		del.setAttribute("aria-label", "Excluir nota");
		del.dataset.noteId = nota.id;
		del.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.88c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
        </svg>`;

		header.append(title, btnFavorite);
		content.append(text);
		actions.append(edit, del);
		footer.append(dateCreated, actions);
		card.append(header, content, footer);

		container.appendChild(card);
	});

	return notas;
}

function renderizaEstadoVazio() {
	const container = document.getElementById("notes-container");
	container.classList.add("notes-list--empty");
	container.innerHTML = `
        <section id="empty-state" class="empty-state">
            <div class="empty-state__icon">
                📝
            </div>

            <h2 class="empty-state__title">Nenhuma nota encontrada</h2>

            <p class="empty-state__text">Você ainda não criou nenhuma nota</p>

            <button id="btn-empty-add-note" class="btn btn--primary" type="button" aria-label="Adicionar nota">
                <i data-lucide="plus"></i>
                <span>Adicionar Nota</span>
            </button>
        </section>
    `;

	return container;
}

export { renderizaNaTela };
