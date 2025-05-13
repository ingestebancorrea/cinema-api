class Movie {
    constructor(id, titulo, descripcion, duracion, categoriaId) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.duracion = duracion;
        this.categoriaId = categoriaId;
    }
}

module.exports = Movie;