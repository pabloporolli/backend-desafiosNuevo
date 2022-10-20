class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullname () {
        return (`El nombre completo es ${this.nombre} ${this.apellido}`);
    }

    addMascotas (nombreMascota) {
        this.mascotas.push(nombreMascota);
    }

    countMascotas () {
        return this.mascotas.length;
    }

    addBook (titulo, autor) {
        this.libros.push(titulo, autor)
    }

    getBookNames () {
        const listadoLibros = [];
        this.libros.forEach(element => {
            listadoLibros.push(element.titulo);
        });
        return listadoLibros;
    }

}

const usuario = new Usuario (
    nombre = "Julian",
    apellido = "Alvarez",
    libros = [
        {
            titulo: "La guerra y la paz",
            autor: "Leon Tolstoi"
        },
         {
            titulo: "Crimen y castigo",
            autor: "Fedor Dostoievski"
        }
    ],
    mascota = ["perro", "gato"]
    );

console.log(usuario);
console.log("Mascotas antes de agregar: ", usuario.mascotas);
console.log("Libros antes de agregar: ", usuario.libros);

usuario.addMascotas("hamster");
usuario.addMascotas("canario");
usuario.addBook(
    {
        titulo: "El aleph",
        autor: "Jorge Luis Borges"
    },
    {
        titulo: "Rayuela",
        autor: "Julio Cortazar"
    },
);

console.log("Full name: ", usuario.getFullname());
console.log("Mascotas con agregados: ", usuario.mascotas);
console.log("Cantidad de mascotas: ", usuario.countMascotas());
console.table(usuario.libros);
console.log(usuario.getBookNames());