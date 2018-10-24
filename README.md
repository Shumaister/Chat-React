
# Ejercicio React Chat

Este se es un chat hecho en React que utiliza [socket.io](https://socket.io/) para manejar la comunicación real-time entre los usuarios.


### Instalación:

```
git clone 'git@github.com:andreskir/react-chat.git'
cd react-chat
npm install
```

### Ejecución:

```
npm start
```
Entrar a http://localhost:3000/ desde varias pestañas del navegador para simular la conexión de diferentes usuarios en simultáneo.


## Se pide:

1) En la versión actual, cuando el usuario envía un mensaje, se muestra su nombre para poder reconocer quién escribió cada mensaje. Por ejemplo, si el usuario se llama juan y escribe "hola, cómo están?", en el listado de mensajes se muestra lo siguiente:

  **juan:** hola, cómo estás?

  Se pide que solamente se muestre el nombre si se trata de mensajes de otros usuarios, para los mensajes propios que se muestre _yo_. Por ejemplo:

  **yo:** hola, cómo estás?
  
  **pedro:** bien, y vos?

2) A la izquierda de los mensajes que muestre un listado con todos los usuarios que están conectados a la sala y se actualice automáticamente cuando se conectan y desconectan usuarios.

3) Que cada usuario se mueste con un color diferente, tanto sus mensajes como su nombre en el listado de usuarios conectados. El color asignado a cada usuario dependerá del orden de ingreso. La secuencia de colores a asignar es la siguiente: **#1B4F72**, **#186A3B**, **#CA6F1E**, **#5B2C6F**, **#A93226**. Esta secuencia se repetirá luego de los 5 primeros usuarios.

4) En la pantalla de login (arriba del campo para ingresar el nombre) agregar un `<input/>` para pedirle al usuario que ingrese el nombre de la sala de chat a la que quiere ingresar. Los usuarios que estén conectados a una sala en particular solo veran los mensajes de esa sala.

5) Agregar en la pantalla de login un `<select/>` para que el usuario pueda seleccionar la sala a la que desea entrar. Este `<select/>` deberá mostrar todas las salas que fueron creadas por otros usuarios y además la opción "Crea tu propia sala". En caso de seleccionar esta última opción se mostrar el `<input/>` del punto 4) para que ingrese el nombre de la sala. En caso contrario ese `<input/>` no se mostrará.

### Comentarios:
- Hacer al menos un commit por punto
- Una vez terminado el ejercicio hacer un Pull Request y avisar por mail
