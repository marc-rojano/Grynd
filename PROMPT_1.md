# Explicación de los Cambios en el Diseño del Login

¡Hola! Soy Gemini Code Assist. He rediseñado la página de inicio de sesión y registro de **Grynd** siguiendo la visión que me describiste, aplicando prácticas de desarrollo profesionales para que el código sea más limpio, escalable y fácil de entender.

A continuación, te detallo todo lo que he hecho.

## Resumen de la Tarea

El objetivo era crear una página de login visualmente atractiva y profesional, con los siguientes elementos:
- Un banner superior de color naranja.
- Un fondo con una imagen de gimnasio.
- Un formulario centrado con una animación sutil.

Para lograr esto de una manera ordenada, he reestructurado ligeramente la parte del frontend.

## 1. Reestructuración del Frontend

Antes, el fichero `App.tsx` controlaba todo: la lógica de registro, el login, la visualización del perfil y los estilos. Esto funciona para un ejemplo pequeño, pero se vuelve difícil de mantener.

Mi propuesta separa las responsabilidades en diferentes componentes, una práctica estándar en React:

-   **`App.tsx`**: Ahora es el "cerebro" principal. Su única tarea es comprobar si el usuario ha iniciado sesión. Si es así, muestra el perfil; si no, muestra la nueva página de login.
-   **`frontend/src/pages/LoginPage.tsx`**: Un componente nuevo que contiene **toda la interfaz y la lógica** para el registro y el inicio de sesión. Aquí es donde vive el nuevo diseño.
-   **`frontend/src/pages/ProfilePage.tsx`**: Un nuevo componente que se encarga de mostrar la información del perfil del usuario una vez ha iniciado sesión.
-   **`frontend/src/styles/LoginPage.css`**: Una hoja de estilos dedicada exclusivamente a la `LoginPage`. Separar el CSS del código de la aplicación hace que ambos sean más fáciles de leer y modificar.

## 2. Ficheros Modificados y Creados

### `frontend/src/App.tsx` (Modificado)

He simplificado este fichero drásticamente. Ahora solo gestiona el token de sesión y decide qué componente principal mostrar.

```typescript
// ... (importaciones)
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginSuccess = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="App">
      {!token ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <ProfilePage token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}
// ...
```

### `frontend/src/pages/LoginPage.tsx` (Nuevo)

Este es el corazón del nuevo diseño. Contiene los formularios y la estructura visual que pediste.

-   Usa un estado `isLogin` para cambiar entre el formulario de "Login" y el de "Registro", haciendo la interfaz más limpia.
-   Maneja los envíos de los formularios y, si tienen éxito, avisa al componente `App` para que actualice el estado de la sesión.
-   Importa su propia hoja de estilos `LoginPage.css`.

### `frontend/src/styles/LoginPage.css` (Nuevo)

Aquí está la magia del diseño. He añadido comentarios en el código para que sepas qué hace cada parte.

-   **`.login-page`**: Define el contenedor principal, que ocupa toda la pantalla y tiene la **imagen de fondo grisácea**. La imagen es un placeholder de `unsplash.com`, ¡recuerda cambiarla por la tuya!
-   **`.header-banner`**: Crea la **franja naranja superior** con el título "GRYND".
-   **`.form-container`**: Es la caja que contiene los formularios. Está centrada, tiene un fondo semitransparente para que se vea la imagen de fondo y, lo más importante, tiene la **animación de entrada**.
-   **`@keyframes slide-fade-in`**: Define la animación sutil que hace que el formulario aparezca deslizándose desde abajo y pasando de transparente a opaco.

### `frontend/src/pages/ProfilePage.tsx` (Nuevo)

Este componente es básicamente la parte de "perfil" que antes estaba en `App.tsx`. Su única responsabilidad es obtener y mostrar los datos del usuario.

Espero que esta explicación detallada te sea de gran ayuda para entender la estructura y continuar desarrollando Grynd. ¡El nuevo diseño le da un toque mucho más profesional a tu aplicación!