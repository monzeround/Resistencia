console.log(location.search); 
var id = location.search.substr(4); 
console.log(id);
const { createApp } = Vue;
createApp({
  data() {
    return {
      id: 0,
      nombre: "",
      imagen: "",
      stock: 0,
      precio: 0,
      url: "https://gditore.pythonanywhere.com/usuarios/" + id,
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.usuario = data.usuario;
          this.nombre = data.nombre;
          this.apellido = data.apellido;
          this.contrasena = data.contrasena;
          this.email = data.email;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      let usuarios = {
        usuario: this.usuario,
        nombre: this.nombre,
        apellido: this.apellido,
        contrasena: this.contrasena,
        email: this.email,
      };
      var options = {
        body: JSON.stringify(usuarios),
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };
      fetch(this.url, options)
        .then(function () {
          alert("Registro actualizado!");
          window.location.href = "./usuarios.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al actualizar.");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
  
}).mount("#app");
