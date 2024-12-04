document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const toggleLink = document.getElementById("toggle-link");

    // Cambiar entre los formularios
    toggleLink.addEventListener("click", (e) => {
        e.preventDefault();
        registerForm.classList.toggle("hidden");
        loginForm.classList.toggle("hidden");
        toggleLink.innerHTML = registerForm.classList.contains("hidden")
            ? "¿No tienes cuenta? <a href='#'>Regístrate</a>"
            : "¿Ya tienes cuenta? <a href='#'>Inicia Sesión</a>";
    });

    // Registro de usuario
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("register-name").value.trim();
        const email = document.getElementById("register-email").value.trim();
        const password = document.getElementById("register-password").value;

        if (localStorage.getItem("user")) {
            alert("Ya existe un usuario registrado. Por favor, inicia sesión.");
            return;
        }

        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        registerForm.reset();
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
    });

    // Inicio de sesión
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;

        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
            alert(`¡Bienvenido, ${user.name}!`);
            window.location.href = "productos.html"; // Cambiar a la página principal
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });
});
