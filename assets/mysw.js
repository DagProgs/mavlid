'use strict';
const CACHE_STATIC = 'static-cache-v20';

function hndlEventInstall(evt) {
    /**
     * @returns {Promise<void>}
     */
    async function cacheStaticFiles() {
        const files = [
            './',
            './my.pwa.json',
            './index.html',
			'./offline.html',
			'./assets/mavlid/1.html',
			'./assets/mavlid/2.html',
			'./assets/mavlid/3.html',
			'./assets/mavlid/4.html',
			'./assets/mavlid/5.html',
			'./assets/mavlid/6.html',
			'./assets/mavlid/7.html',
			'./assets/mavlid/8.html',
			'./assets/mavlid/9.html',
			'./assets/mavlid/10.html',
			'./assets/mavlid/11.html',
			'./assets/mavlid/12.html',
			'./assets/mavlid/13.html',
			'./assets/mavlid/14.html',
			'./assets/mavlid/15.html',
			'./assets/mavlid/16.html',
			'./assets/mavlid/17.html',
			'./assets/mavlid/18.html',
			'./assets/mavlid/19.html',
			'./assets/mavlid/20.html',
			'./assets/mavlid/21.html',
			'./assets/mavlid/22.html',
			'./assets/mavlid/23.html',
			'./assets/mavlid/24.html',
			'./assets/mavlid/25.html',
			'./assets/mavlid/26.html',
            './mysw.js',
        ];
        const cacheStat = await caches.open(CACHE_STATIC);
        await Promise.all(
            files.map(function (url) {
                return cacheStat.add(url).catch(function (reason) {
                    console.log(`'${url}' failed: ${String(reason)}`);
                });
            })
        );
    }

    //  wait until all static files will be cached
    evt.waitUntil(cacheStaticFiles());
}

function hndlEventFetch(evt) {
    async function getFromCache() {
        const cache = await self.caches.open(CACHE_STATIC);
        const cachedResponse = await cache.match(evt.request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // wait until resource will be fetched from server and stored in cache
        const resp = await fetch(evt.request);
        await cache.put(evt.request, resp.clone());
        return resp;
    }

    evt.respondWith(getFromCache());
}

self.addEventListener('install', hndlEventInstall);
self.addEventListener('fetch', hndlEventFetch);