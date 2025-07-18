// src/App.tsx
import Routers from "./Routers/Routers";

function App() {
  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('✅ ServiceWorker registered:', registration);
      })
      .catch((err) => {
        console.error('❌ ServiceWorker registration failed:', err);
      });
  });
}

  return <Routers />;
}

export default App;
