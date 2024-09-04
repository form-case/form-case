// Esta función se utiliza para registrar el service worker
export function register(config) {
  if ('serviceWorker' in navigator) {
    // El proceso de registro del service worker
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost()) {
        // Esto se ejecuta en localhost
        checkValidServiceWorker(swUrl, config);
      } else {
        // Esto se ejecuta en producción
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      // Escucha cuando hay una nueva actualización del service worker
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }

        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // Nuevo contenido disponible, muestra un mensaje de actualización
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              } else {
                alert("Hay una nueva versión disponible. Por favor, recarga la página.");
              }
            } else {
              // Contenido precacheado, listo para usarse offline
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              } else {
                console.log('Contenido cacheado y listo para usarse offline.');
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error durante el registro del Service Worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Si el service worker no existe o no es un archivo JS, recarga la página
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Registra el Service Worker en producción
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log('No se pudo encontrar una conexión a Internet. La aplicación está en modo offline.');
    });
}

function isLocalhost() {
  return Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
