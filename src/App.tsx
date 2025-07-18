// src/App.tsx
import Routers from "./Routers/Routers";

function App() {
  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then((_registration) => {
        // ServiceWorker registration successful
        // console.log('✅ ServiceWorker registered:', registration);
        console.log('✅ ServiceWorker registered successfully. You can now use Firebase Cloud Messaging.');
        
      })
      .catch((err) => {
        console.error('❌ ServiceWorker registration failed:', err);
      });
  });
}

  return <Routers />;
}

export default App;
