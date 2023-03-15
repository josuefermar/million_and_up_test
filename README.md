# Explicación Proyecto

Este es un proyecto con el backend en Ruby on Rails y el frontend en Angular.
Ruby on Rails fue seleccionado debido a que es el reto principal de la prueba.
Angular fue seleccionado ya que es con el cual tengo mayor familiaridad de las 3 opciones dadas en la prueba técnica.

Para Rails se implementó sqlite3 por la facilidad que nos da para la gestión de los datos, ya que en caso de escoger otro servicio como base de datos se tendría que subir un servicio adicional para la prueba.

El mayor bloqueante que tuve fue poder comunicar los ítems del carrito entre componentes hijos, padres, hermanos e independientes (esto porque desconocía que en Angular se podían implementar los providers) lo solucione implementando providers, algo que no había utilizado hasta el momento, debido a que no suelo trabajar mucho con Angular.

En cuanto a mejoras me gustaría darle un repaso a lo visual, para que sea un poco más bonito visualmente, y añadir la gestión de sesión con un jwt ya que actualmente la sesión se maneja de forma muy básica.

# Parte BackEnd

Esta parte está creada con el framework Ruby On Rails.

## Requisitos para su ejecución

- Rails v 7.0.4.2 o superior
- ruby v 2.7.0p0 o superior
- sqlite3 v 3.31.1 o superior

## Ejecución

```
#comando para la instalación de las dependencias de rails
bundle install


#comando para la ejecución de las migraciones
rails db:migrate


#comando para extraer los datos de las diferentes apis, se realizó de esta manera para tener un control completo de los productos y su stock
rails db:seed
```
## Servidor de desarrollo

Para ejecutar el servidor se utiliza el siguiente comando:

```
rails s
```

Por defecto el link de la aplicación es `http://localhost:3000/`

Este link no se utilizaria debido a que se utiliza principalmente el FrontEnd


# Parte FrontEnd

Esta parte fue generada con [Angular CLI](https://github.com/angular/angular-cli) versión 15.2.2.

## Requisitos para su ejecución

- npm v 9.6.1 o superior
- node v 18.15.0 o superior

Link de descarga para windows [aqui](https://nodejs.org/en/download/current/).

## Ejecución

Antes de poner en marcha el servidor debes instalar las dependencias. Estas se hace con el siguiente comando en consola:

```
npm install
```

## Servidor de desarrollo

Para ejecutar el servidor se utiliza el siguiente comando: 

```
npm run start:proxy
```

En este caso se ejecuta este comando para poder permitir la conexión entre el back y el front mediante un proxy

Por defecto el link de la aplicación es `http://localhost:4200/`
