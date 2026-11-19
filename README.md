# Brújula 

Aplicación móvil de orientación vocacional desarrollada para la asignatura **Dispositivos Móviles** de
la Universidad Central del Ecuador.

Brújula toma como punto de partida un perfil público de TikTok. La propuesta es revisar sus
publicaciones recientes, identificar patrones de comunicación e intereses, estimar los cinco rasgos del
modelo Big Five y relacionar el resultado con posibles carreras.

El proyecto está construido con React Native, Expo y TypeScript. La organización interna sigue
Domain-Driven Design (DDD) y la interfaz toma como referencia Atomic Design.

## Integrantes

* Xavier Anadrade
* Sebastian Benalcazar
* Jonathan Caluguillin
* Abel Lopez

\---

## Problema

Elegir una carrera no siempre parte de información suficiente. Muchos estudiantes conocen la oferta
académica, pero tienen dificultades para relacionarla con sus intereses, su forma de trabajar y sus
rasgos personales. Los test vocacionales tradicionales pueden ser útiles, aunque a menudo se perciben
como largos o poco relacionados con el contexto cotidiano del estudiante.

Las publicaciones digitales contienen señales sobre temas de interés, estilo de comunicación,
creatividad y formas de interacción. Estas señales no definen por completo a una persona y tampoco
reemplazan una evaluación profesional, pero pueden servir para iniciar una exploración vocacional.

El problema que aborda Brújula es:

> Facilitar una primera orientación vocacional que conecte patrones de expresión digital con rasgos de
> personalidad y áreas de estudio.

## Solución

La aplicación plantea el siguiente recorrido:

1. El usuario ingresa un perfil público de TikTok.
2. La aplicación valida el nombre del perfil.
3. Un backend obtiene una cantidad limitada de publicaciones públicas recientes.
4. El contenido se normaliza para identificar temas, lenguaje, etiquetas y otros patrones permitidos.
5. Un servicio de análisis estima las dimensiones del modelo Big Five.
6. Un motor vocacional relaciona el perfil estimado con carreras.
7. La aplicación muestra los rasgos, una explicación y las carreras con mayor afinidad.

```text
React Native
     │
     │ usuario de TikTok
     ▼
API del backend
     │
     ▼
Scraper de contenido público
     │
     ▼
Normalización de publicaciones
     │
     ▼
Análisis Big Five
     │
     ▼
Recomendación de carreras
     │
     ▼
Resultados en la aplicación
```

El scraper pertenece al backend, no a la aplicación móvil. Esta separación permite aplicar límites,
controlar errores y evitar que credenciales o detalles internos queden expuestos en el dispositivo.
Solo se plantea trabajar con información pública y con autorización. Cuando exista una API oficial que
cubra el caso de uso, debe preferirse frente al scraping.

## Estado del proyecto

La aplicación móvil funciona como prototipo navegable. Actualmente permite:

* Ingresar y validar un usuario de TikTok.
* Mostrar un estado animado de procesamiento.
* Visualizar las cinco dimensiones del Big Five.
* Identificar un rasgo dominante.
* Mostrar carreras relacionadas y porcentajes de afinidad.
* Reiniciar el flujo para analizar otro perfil.

La versión actual utiliza `MockProfileAnalyzerRepository`. Esto significa que los resultados son
simulados y sirven para probar la navegación, el diseño y la arquitectura. Todavía no se ejecuta el
scraper ni un modelo de inteligencia artificial real.

No se debe presentar el resultado actual como diagnóstico psicológico ni como garantía de éxito en una
carrera.

\---

## Arquitectura DDD

DDD se utiliza para que el proyecto esté organizado alrededor del dominio de orientación vocacional, no
alrededor de React Native o de una API específica. La lógica central puede mantenerse aunque cambie la
interfaz, el proveedor de IA o la forma de obtener las publicaciones.

### Estructura

```text
src/
├── domain/
│   ├── entities/
│   │   └── VocationalProfile.ts
│   └── repositories/
│       └── ProfileAnalyzerRepository.ts
├── application/
│   └── use-cases/
│       └── AnalyzeTikTokProfile.ts
├── infrastructure/
│   └── repositories/
│       └── MockProfileAnalyzerRepository.ts
└── presentation/
    ├── components/
    │   ├── BrandHeader.tsx
    │   └── TraitBar.tsx
    ├── screens/
    │   ├── ProfileInputScreen.tsx
    │   ├── AnalysisLoadingScreen.tsx
    │   └── ResultsScreen.tsx
    └── theme/
        └── theme.ts
```

### Dominio

`src/domain` contiene los conceptos y contratos principales:

* `VocationalProfile`: resultado completo del análisis.
* `PersonalityTrait`: rasgo Big Five con puntuación y descripción.
* `CareerRecommendation`: carrera relacionada y su afinidad.
* `TraitKey`: identificador de cada dimensión de personalidad.
* `ProfileAnalyzerRepository`: contrato para solicitar un análisis.

Esta capa no importa componentes de React Native ni paquetes de Expo.

### Aplicación

`AnalyzeTikTokProfile` representa el caso de uso principal. Se encarga de:

* Limpiar el identificador ingresado.
* Eliminar el símbolo `@` cuando sea necesario.
* Verificar que el usuario tenga una longitud válida.
* Solicitar el resultado mediante `ProfileAnalyzerRepository`.
* Retornar un `VocationalProfile`.

El caso de uso conoce el contrato del repositorio, pero no conoce su implementación.

### Infraestructura

`MockProfileAnalyzerRepository` implementa el contrato definido en el dominio. Simula una espera y
devuelve un perfil vocacional de prueba.

Cuando se implemente el backend, podrá crearse `ApiProfileAnalyzerRepository` con el mismo contrato. Ese
repositorio llamará a la API que coordine:

1. El scraper.
2. La normalización de publicaciones.
3. El análisis Big Five.
4. La recomendación de carreras.

Las pantallas y el caso de uso no deberían necesitar cambios importantes al sustituir el repositorio.

### Presentación

`src/presentation` contiene todo lo relacionado con React Native:

* Pantallas.
* Componentes visuales.
* Estilos.
* Colores.
* Interacciones táctiles.
* Animaciones.

La presentación recibe datos del caso de uso y los representa. No contiene lógica para obtener
publicaciones ni calcular el Big Five.

### Dirección de dependencias

```text
Presentación → Aplicación → Dominio
                              ↑
                    Infraestructura
```

La infraestructura implementa contratos del dominio. `App.tsx` crea las implementaciones y las conecta
con el caso de uso.

### Contexto delimitado

El contexto principal del prototipo es **Orientación Vocacional**. Una versión más amplia podría
separar otros contextos:

* Adquisición de contenido.
* Análisis de personalidad.
* Catálogo académico.
* Identidad de usuarios.
* Seguimiento vocacional.
* Suscripciones.

### Lenguaje ubicuo

El equipo utiliza estos términos con el mismo significado en código, diseño y documentación:

|Término|Significado|
|-|-|
|Perfil analizado|Cuenta pública ingresada por el usuario|
|Publicación reciente|Contenido público incluido en la ventana de análisis|
|Señal de contenido|Tema, patrón lingüístico o metadato normalizado|
|Perfil vocacional|Resultado formado por rasgos y carreras relacionadas|
|Rasgo de personalidad|Una dimensión del modelo Big Five|
|Rasgo dominante|Dimensión con mayor puntuación estimada|
|Carrera relacionada|Opción académica asociada con el perfil|
|Afinidad|Relación estimada entre el perfil y una carrera|
|Repositorio de análisis|Contrato utilizado para obtener el resultado|
|Análisis simulado|Resultado de prueba sin procesamiento real|

Se utiliza “estimación” en lugar de “diagnóstico” y “carrera relacionada” en lugar de “carrera
correcta”.

\---

## Atomic Design

Atomic Design se aplica dentro de la capa de presentación. DDD organiza las responsabilidades del
sistema; Atomic Design organiza las piezas de la interfaz.

### Átomos

Elementos básicos que no se dividen en componentes visuales más pequeños:

* Textos y etiquetas.
* Iconos.
* Colores y espaciados.
* `TextInput`.
* `Pressable`.
* Indicadores y barras.

Los valores compartidos se encuentran en `src/presentation/theme/theme.ts`.

### Moléculas

Combinaciones pequeñas de átomos:

* Campo de usuario con símbolo `@` y validación.
* Encabezado de sección.
* Tarjeta de carrera.
* Indicador del perfil analizado.
* `TraitBar`, que combina nombre, porcentaje y barra de progreso.

### Organismos

Secciones completas de la interfaz:

* `BrandHeader`.
* Formulario de análisis.
* Panel Big Five.
* Panel de carreras relacionadas.

### Plantillas

Distribuyen los organismos sin depender del contenido final:

* Plantilla de ingreso.
* Plantilla de procesamiento.
* Plantilla de resultados.

### Páginas

Las páginas son las pantallas completas:

* `ProfileInputScreen`.
* `AnalysisLoadingScreen`.
* `ResultsScreen`.

No todos los átomos y moléculas se extrajeron a archivos independientes. Solo se crearon componentes
cuando existe una responsabilidad clara o posibilidad real de reutilización. Esto evita agregar
abstracciones que todavía no aportan valor.

\---

## React Native y Expo

React Native permite mantener una base de código para Android e iOS. Expo se utiliza para configurar,
ejecutar y probar la aplicación con menos dependencia de configuración nativa.

La interfaz utiliza:

* `View` para contenedores.
* `Text` para contenido.
* `TextInput` para ingresar el usuario.
* `Pressable` para acciones táctiles.
* `ScrollView` para pantallas pequeñas.
* `KeyboardAvoidingView` para manejar el teclado.
* `Animated` para el estado de procesamiento.
* `StyleSheet` para los estilos.
* `SafeAreaProvider` para respetar las áreas seguras.
* Ionicons para la iconografía.

`App.tsx` mantiene el estado del flujo:

```text
input → loading → results
```

El caso de uso se construye una sola vez y recibe el repositorio mediante inyección de dependencias.

\---

## Tecnologías

* React Native.
* Expo.
* React.
* TypeScript y TSX.
* `@expo/vector-icons`.
* `react-native-safe-area-context`.
* Node.js.
* npm.
* Visual Studio Code.
* Expo Go.
* Git.

La aplicación móvil no utiliza HTML ni CSS tradicional. Los estilos se definen con `StyleSheet`.

## Requisitos

* Git.
* Node.js LTS y npm.
* Visual Studio Code u otro editor de código.
* Expo Go en un dispositivo Android o iOS.
* Teléfono y computadora en la misma red para la conexión local.

Comprueba las instalaciones desde PowerShell o una terminal:

```powershell
git --version
node --version
npm --version
```

## Instalación y ejecución

### 1\. Clonar el repositorio

Abre PowerShell o la terminal de Visual Studio Code:

```powershell
git clone https://github.com/xaandrade/brujula.git
```

### 2\. Entrar en la carpeta

```powershell
cd brujula
```

### 3\. Abrir el proyecto en Visual Studio Code

```powershell
code .
```

Si el comando `code` no está disponible, abre Visual Studio Code, selecciona
**Archivo → Abrir carpeta** y elige la carpeta `brujula`.

### 4\. Instalar las dependencias

```powershell
npm install
```

La carpeta `node\_modules` se genera con este comando y no debe subirse al repositorio.

### 5\. Verificar el proyecto

```powershell
npx expo-doctor
npx tsc --noEmit
```

`expo-doctor` debe finalizar sin comprobaciones fallidas y TypeScript no debe mostrar errores.

### 6\. Iniciar la aplicación

```powershell
npx expo start --clear
```

Expo mostrará un código QR en la terminal o en el navegador.

### 7\. Abrir la aplicación en un teléfono

1. Instala Expo Go desde Google Play o App Store.
2. Conecta el teléfono y la computadora a la misma red Wi-Fi.
3. Abre Expo Go.
4. Escanea el código QR generado por Expo.

Si el teléfono no puede conectarse mediante la red local, detén Expo con `Ctrl + C` y utiliza:

```powershell
npx expo start --tunnel
```

### Android

Con un teléfono conectado o un emulador de Android Studio abierto:

```powershell
npm run android
```

### iOS

El simulador de iOS requiere macOS y Xcode:

```powershell
npm run ios
```

### Descargar actualizaciones

Si el repositorio ya está clonado:

```powershell
git pull
npm install
npx expo start --clear
```

## Comandos

|Comando|Uso|
|-|-|
|`npm install`|Instala las dependencias|
|`npx expo start`|Inicia el servidor de Expo|
|`npx expo start --clear`|Inicia Expo limpiando la caché|
|`npx expo start --tunnel`|Inicia Expo mediante túnel|
|`npm run android`|Abre la aplicación en Android|
|`npm run ios`|Abre la aplicación en iOS|
|`npx tsc --noEmit`|Comprueba los tipos|
|`npx expo-doctor`|Revisa la configuración de Expo|

Utiliza un solo gestor de paquetes. Si trabajas con npm, conserva `package-lock.json` y elimina
`pnpm-lock.yaml`.

\---

## Distribución del trabajo

### Xavier Anadrade

* Modelo de dominio.
* Entidades vocacionales.
* Lenguaje ubicuo.
* Revisión de la arquitectura DDD.

### Sebastian Benalcazar

* Caso de uso `AnalyzeTikTokProfile`.
* Contratos de repositorio.
* Infraestructura simulada.
* Diseño de integración con backend y scraper.

### Jonathan Caluguillin

* Pantallas React Native.
* Componentes de presentación.
* Tema visual.
* Aplicación de Atomic Design.

### Abel Lopez

* Pruebas con Expo.
* Configuración y dependencias.
* Modelo de negocio.
* Documentación del proyecto.

Las decisiones relevantes y las revisiones de código corresponden a todo el equipo.

\---

## Privacidad y límites

Una implementación real debe:

* Solicitar consentimiento.
* Procesar únicamente información pública y autorizada.
* No evadir perfiles privados, autenticación ni controles de seguridad.
* Preferir APIs oficiales cuando estén disponibles.
* Ejecutar el scraper y la IA en un backend.
* Proteger credenciales y comunicaciones.
* Reducir al mínimo la información almacenada.
* Permitir eliminar datos.
* Explicar que el resultado es orientativo.
* Revisar posibles sesgos del análisis.

El proyecto no debe utilizarse como diagnóstico clínico. Una versión productiva necesita validación de
profesionales de psicología y orientación vocacional.

## Próximos pasos

1. Validar el flujo con estudiantes y orientadores.
2. Crear una API segura.
3. Implementar el scraper de contenido público respetando las condiciones de la plataforma.
4. Normalizar textos, etiquetas y señales de las publicaciones.
5. Incorporar el servicio de análisis Big Five.
6. Construir una taxonomía de carreras validada.
7. Implementar el repositorio remoto en la aplicación.
8. Agregar pruebas automatizadas.
9. Evaluar privacidad, sesgos y calidad de recomendaciones.

## Documentación

La memoria completa del proyecto se encuentra en:

```text
docs/MEMORIA\_TECNICA\_BRUJULA.docx
docs/MEMORIA\_TECNICA\_BRUJULA.pdf
docs/MEMORIA\_TECNICA\_BRUJULA.md
```

