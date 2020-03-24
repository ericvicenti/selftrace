self.addEventListener('fetch', function(_event) {
	// do nothing
	// this allows the app to be installed as a PWA

	// offline capabilities can be added by responding
	// to requests with cached resources here

	// console.log(event.request.url);
	// event.respondWith(
	// 	caches.match(event.request).then(function(response) {
	// 	return response || fetch(event.request);
	// 	})
	// );
});
