document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts');
    const form = document.getElementById('postForm');

    // Carga inical de entradas desde el servidor
    fetch('/entries')
        .then(res => res.json())
        .then(data => {
            data.forEach(addPostToDOM);
        })
        .catch(err => console.error('Error al cargar entradas:', err));

    // Manejo del envío del formulario
    form.addEventListener('submit', e => {
        e.preventDefault();
        const title = form.title.value.trim();
        const content = form.content.value.trim();
        if (!title || !content) return;

        // POST al servidor
        fetch('/entries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
            .then(res => res.json())
            .then(newPost => {
                addPostToDOM(newPost);
                form.reset();
            })
            .catch(err => console.error('Error al crear entrada:', err));
    });

    // Función para añadir una tarjeta al DOM
    function addPostToDOM(post) {
        const { id, titulo, contenido, title, content } = post;
        const cardTitle   = title   || titulo   || 'Sin título';
        const cardContent = content || contenido || 'Sin contenido';

        const card = document.createElement('article');
        card.className = 'post-card';
        card.innerHTML = `
    <h3>${cardTitle}</h3>
    <p>${cardContent}</p>
    <button class="delete-btn" aria-label="Eliminar">&times;</button>
  `;
        const btnDelete = card.querySelector('.delete-btn');
        btnDelete.addEventListener('click', () => {
            // Eliminar en el servidor
            fetch(`/entries/${id}`, { method: 'DELETE' })
                .then(res => {
                    if (res.ok) card.remove();
                    else console.error('Error al eliminar');
                });
        });
        postsContainer.prepend(card);
    }
});
