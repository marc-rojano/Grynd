# 💪 Grynd

> El cuaderno de entrenamiento que no se te olvida en casa.

Grynd es una aplicación full-stack para registrar entrenamientos de gimnasio en tiempo real: series, repeticiones, peso, rutinas guardadas y una estimación de las calorías quemadas en cada sesión. Pensada para quien entrena en serio y quiere ver su progreso con datos, no con sensaciones.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 🏋️ ¿Qué hace?

- **Crea rutinas propias**, eligiendo ejercicios por grupo muscular y definiendo series/reps objetivo.
- **Registra cada sesión real**: series, repeticiones, peso usado, y lo compara con lo planeado.
- **Calcula calorías estimadas** de cada entrenamiento según la intensidad del ejercicio (MET) y el peso del usuario.
- **Muestra estadísticas**: volumen total levantado, repeticiones acumuladas, y qué grupos musculares entrenas más (o menos).
- **Login seguro** con contraseñas cifradas y sesión mediante JWT.

## 🛠️ Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Base de datos | PostgreSQL |
| Autenticación | JWT + bcrypt |

## 📐 Arquitectura

Cliente (React) → HTTP/JSON → API REST (Express) → SQL → PostgreSQL, con JWT protegiendo las rutas privadas de la API.

## 🚀 Cómo ejecutarlo en local

Backend:

    cd backend
    npm install
    cp .env.example .env
    npm run db:migrate
    npm run db:seed
    npm run dev

Frontend (en otra terminal):

    cd frontend
    npm install
    npm run dev

## 📸 Capturas

*(próximamente)*

## 🧠 Decisiones de diseño

- Las **rutinas** (lo que planeas) y las **sesiones** (lo que realmente haces) están separadas en la base de datos a propósito: permite comparar lo planeado contra lo ejecutado.
- El cálculo de calorías usa la fórmula estándar MET × peso × tiempo, la misma referencia que usan apps de fitness reales.
- Autenticación implementada directamente con JWT y bcrypt, sin librerías de "todo incluido", para entender bien cada paso del flujo de login.

## 👤 Autor

**Marc Rojano** — [LinkedIn](https://www.linkedin.com/in/marc-rojano) · [GitHub](https://github.com/marc-rojano)
