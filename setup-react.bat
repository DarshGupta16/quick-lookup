@echo off
echo Installing React dependencies...
npm install react react-dom
npm install -D @types/react @types/react-dom @vitejs/plugin-react

echo Creating React configuration files...

echo Creating renderer.tsx...
(
echo import React from 'react';
echo import ReactDOM from 'react-dom/client';
echo import './index.css';
echo.
echo const App = ^() ^=^> {
echo   return ^(
echo     ^<div^>
echo       ^<h1^>Hello World!^</h1^>
echo       ^<p^>Welcome to your Electron application.^</p^>
echo     ^</div^>
echo   ^);
echo };
echo.
echo ReactDOM.createRoot^(document.getElementById^('root'^)!^).render^(
echo   ^<React.StrictMode^>
echo     ^<App /^>
echo   ^</React.StrictMode^>
echo ^);
) > src\renderer.tsx

echo Updating index.html...
(
echo ^<!DOCTYPE html^>
echo ^<html^>
echo   ^<head^>
echo     ^<meta charset="UTF-8" /^>
echo     ^<title^>Electron App^</title^>
echo   ^</head^>
echo   ^<body^>
echo     ^<div id="root"^>^</div^>
echo     ^<script type="module" src="/src/renderer.tsx"^>^</script^>
echo   ^</body^>
echo ^</html^>
) > index.html

echo Updating vite.renderer.config.ts...
(
echo import { defineConfig } from 'vite';
echo import react from '@vitejs/plugin-react';
echo.
echo export default defineConfig({
echo   plugins: [react()]
echo });
) > vite.renderer.config.ts

echo Updating tsconfig.json...
(
echo {
echo   "compilerOptions": {
echo     "target": "ESNext",
echo     "module": "ESNext",
echo     "allowJs": true,
echo     "skipLibCheck": true,
echo     "esModuleInterop": true,
echo     "noImplicitAny": true,
echo     "sourceMap": true,
echo     "baseUrl": ".",
echo     "outDir": "dist",
echo     "moduleResolution": "node",
echo     "resolveJsonModule": true,
echo     "jsx": "react-jsx",
echo     "paths": {
echo       "@/*": ["./src/*"]
echo     }
echo   },
echo   "include": ["src/**/*"]
echo }
) > tsconfig.json

echo Creating basic CSS file...
(
echo body {
echo   margin: 0;
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
echo     'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
echo     sans-serif;
echo   -webkit-font-smoothing: antialiased;
echo   -moz-osx-font-smoothing: grayscale;
echo   padding: 20px;
echo }
) > src\index.css

echo Setup complete! You can now start your application with 'npm start'
