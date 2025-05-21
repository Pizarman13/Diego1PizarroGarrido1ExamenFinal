# Diego1PizarroGarrido1ExamenFinal

## Explicación CSS
He usado CSS Grid para .posts-grid para facilitar el diseño de tarjetas flexible, ya que permite definir filas y columnas ajustándose automáticamente a distintos anchos. Para el formulario he utilizado Flexbox y tambien implemente media que lo que hace es disminuir el tamaño de los titulos y paddings para ajustarse mejor al formato movil.

## Explicación JS
Se escucha el envío del formulario para que la página se no se recargue y en su lugar se envian los datos al endpoint POST usando fetch.
Para actualizar el DOM uso la funcion addPostToDOM, que crea elementos y los inserta sin recargar la pagina.
Cada tarjeta tiene una X para eliminar con un listener que llama al endpoint DELETE.

## Explicación Node
Use Express para los estáticos (la carpeta public/) y para procesar las solicitudes JSON.
Los endpoints GET y POST leen y escriben en entries.json con fs.promises y manejan errores con try/catch.
Añadí un DELETE /entries/:id para completar la funcionalidad de borrado.
