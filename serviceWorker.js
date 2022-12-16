const staticDevCoffee = "dev-coffee-site-v1"
const assets = [
  "/",
  "/index.html",
  "/assets/style/style.css",
  "/assets/js/my.js",
  "/assets/js/jquery.min.js",
  "/assets/svg/mavlid.svg",
  "/assets/mavlid/1.html",
  "/assets/mavlid/2.html",
  "/assets/mavlid/3.html",
  "/assets/mavlid/4.html",
  "/assets/mavlid/5.html",
  "/assets/mavlid/6.html",
  "/assets/mavlid/7.html",
  "/assets/mavlid/8.html",
  "/assets/mavlid/9.html",
  "/assets/mavlid/10.html",
  "/assets/mavlid/11.html",
  "/assets/mavlid/12.html",
  "/assets/mavlid/13.html",
  "/assets/mavlid/14.html",
  "/assets/mavlid/15.html",
  "/assets/mavlid/16.html",
  "/assets/mavlid/17.html",
  "/assets/mavlid/18.html",
  "/assets/mavlid/19.html",
  "/assets/mavlid/20.html",
  "/assets/mavlid/21.html",
  "/assets/mavlid/22.html",
  "/assets/mavlid/23.html",
  "/assets/mavlid/24.html",
  "/assets/mavlid/25.html",
  "/assets/mavlid/26.html",
  
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
})