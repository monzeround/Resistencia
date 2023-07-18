const { createApp } = Vue;

createApp({
  data() {
    return {
      usuarios: [], 
      url: "https://gditore.pythonanywhere.com/usuarios", 
      error: false,
      cargando: true,
      id: 0,
      usuario: "",
      nombre: "",
      apellido: "",
      contrasena: "",
      email:"",
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          this.usuarios = data;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(usuarios) {
      const url = this.url + "/" + usuarios;
      var options = {
        method: "DELETE",
      };
      fetch(url, options)
        .then((res) => res.text())
        .then((res) => {
          location.reload();
        });
    },
    grabar() {
      let usuarios = {
        usuario: this.usuario,
        nombre: this.nombre,
        apellido: this.apellido,
        contrasena: this.contrasena,
        email: this.email
      };

      var options = {
        body: JSON.stringify(usuarios),
        method: "POST",
        headers: { "Content-Type": "application/json" },
        redirect: "follow",
      };

      fetch(this.url, options)
        .then(function () {
          alert("Registro grabado!");
          window.location.href = "./usuarios.html";
        })
        .catch((err) => {
          console.error(err);
          alert("Error al Grabar.");
        });
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
