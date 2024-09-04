module.exports = {
	globDirectory: 'public/',
	globPatterns: [
	  //'**/*.{ico,html,png,jpg,json,txt,css,woff,js}',
	  //'**/[^/]*', // Esto incluye archivos sin extensión
	  '**/*' // Captura archivos sin extensión en cualquier directorio
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
	  /^utm_/,
	  /^fbclid$/
	],
	runtimeCaching: [
	  {
		// Maneja archivos sin extensión, asumiendo que son HTML
		urlPattern: /\/[^\/]+$/, 
		handler: 'StaleWhileRevalidate', // Estrategia offline-first
		options: {
		  cacheName: 'html-cache',
		  expiration: {
			maxEntries: 50, // Limitar el número de archivos en la caché
		  },
		  // Asegúrate de tratar estos archivos como documentos HTML
		  matchOptions: {
			ignoreSearch: true,
		  },
		},
	  },
	  {
		urlPattern: /\.(?:js|css|png|jpg|jpeg|svg|woff)$/,
		handler: 'CacheFirst',
		options: {
		  cacheName: 'static-resources',
		  expiration: {
			maxEntries: 60,
			maxAgeSeconds: 30 * 24 * 60 * 60,
		  },
		},
	  },
	],
	additionalManifestEntries: [
	  //{ url: '/x/TwrsDY99', revision: null }, // Agrega los archivos manualmente
	  //{ url: '/x/another-file', revision: null }
	],
  };