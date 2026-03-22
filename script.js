const contenedor = document.getElementById('contenedor-peliculas');

const obtenerPeliculas = () => {
    fetch('https://ghibliapi.vercel.app/films')
        .then(respuesta => respuesta.json())
        .then(datos => {
            // Creamos una variable vacia para acumular el HTML
            let htmlTemporal = "";

            datos.forEach(pelicula => {
                // Vamos sumando el contenido a la variable, NO al DOM directamente
                htmlTemporal += `
                    <div class="col-md-4 col-lg-3">
                        <div class="card h-100 shadow-sm ghibli-card">
                            <img src="${pelicula.image}" class="card-img-top" alt="${pelicula.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${pelicula.title}</h5>
                                <p class="card-text text-muted mb-auto">Director: ${pelicula.director}</p>
                                <div class="mt-3 d-flex justify-content-between align-items-center">
                                    <span class="badge bg-info text-dark">${pelicula.release_date}</span>
                                    <span class="fw-bold text-warning">⭐ ${pelicula.rt_score}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Una unica insercion al final: mucho mas eficiente
            contenedor.innerHTML = htmlTemporal;
        })
        .catch(error => {
            console.error('Error:', error);
            contenedor.innerHTML = `<p class="text-danger text-center">Error al cargar las películas. Inténtalo de nuevo más tarde.</p>`;
        });
};

obtenerPeliculas();