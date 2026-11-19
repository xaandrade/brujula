# Brújula Mobile

Aplicación móvil Expo + React Native del prototipo vocacional.

## Abrir en VS Code

1. Copia la carpeta `mobile` a tu equipo.
2. Abre esa carpeta en VS Code.
3. Abre una terminal integrada y ejecuta:

```bash
npm install
npx expo start
```

Si usas pnpm:

```bash
pnpm install
pnpm start
```

4. Instala **Expo Go** en tu teléfono y escanea el código QR. El teléfono y el equipo deben estar en
   la misma red.

También puedes usar:

```bash
npm run android
npm run ios
```

El comando de iOS requiere macOS. Para emuladores Android necesitas Android Studio.

## Organización DDD

```text
src/
├── domain/
│   ├── entities/       Tipos y reglas del perfil vocacional
│   └── repositories/   Contratos para obtener análisis
├── application/
│   └── use-cases/      Caso de uso para analizar un perfil
├── infrastructure/
│   └── repositories/   Implementación actual con datos simulados
└── presentation/
    ├── components/     Componentes visuales reutilizables
    ├── screens/        Pantallas de la aplicación
    └── theme/          Colores y constantes visuales
```

`MockProfileAnalyzerRepository` simula el análisis para reproducir el prototipo. Para conectarlo a
un servicio real, crea otro repositorio que implemente `ProfileAnalyzerRepository` y cámbialo en
`App.tsx`. Las credenciales privadas y el acceso a APIs no deben incluirse directamente en la app.
