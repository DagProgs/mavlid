const staticCacheName = 'static-cache-v9';
const dynamicCacheName = 'dynamic-cache-v9';

const staticAssets = [
  './',
  './index.html',
  './assets/style/style.css',
  './assets/js/my.js',
  './assets/js/jquery.min.js',
  './assets/svg/mavlid.svg',
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
  './assets/mavlid/26.html'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(staticAssets);
    console.log('Service worker has been installed');
});

self.addEventListener('activate', async event => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
    console.log('Service worker has been activated');
});

self.addEventListener('fetch', event => {
    console.log(`Trying to fetch ${event.request.url}`);
    event.respondWith(checkCache(event.request));
});

async function checkCache(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) {
            return cachedRes;
        } else if (req.url.indexOf('.html') !== -1) {
            return caches.match('offline.html');
        } else {
            return caches.match('images/no-image.jpg');
        }
    }
}




addEventListener('message', ev => {  
  if (ev.data === 'skipWaiting') return skipWaiting();
  
  // вызов модального окна
const askUserToUpdate = reg => {
  return Modal.confirm({
    onOk: async () => {
      // вешаем обработчик изменения состояния
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

      // пропускаем ожидание 
      if (reg && reg.waiting) {
        reg.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    },

    onCancel: () => {
      Modal.destroyAll();
    },
    icon: null,
    title: 'Хорошие новости! ? ',
    content:
      'Мы только что обновили версию приложения! Чтобы получить обновления, нажмите на кнопку ниже (страница перезагрузится)',
    cancelText: 'Не обновлять',
    okText: 'Обновить'
  });
};

// проверка регистрации
const registerValidSW = (swUrl, config) => {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      if (registration.waiting) {
        // оброботчик SW в ожидании
        askUserToUpdate(registration);
      }
});

