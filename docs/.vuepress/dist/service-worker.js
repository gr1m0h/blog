/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "810cb7ddf5880031bedf198e1a98af02"
  },
  {
    "url": "assets/css/0.styles.1176bd6f.css",
    "revision": "e983ee5219c0d45e1861f569cd1b86b9"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.fda1f326.js",
    "revision": "9086da4aaed97b5de5bec69d3a7c37a0"
  },
  {
    "url": "assets/js/3.16e37df8.js",
    "revision": "a978963a8f9fb250406d44138ec87b41"
  },
  {
    "url": "assets/js/4.ec11fa26.js",
    "revision": "2728f351a4473708797b60b493f863cd"
  },
  {
    "url": "assets/js/5.9810f954.js",
    "revision": "869b202cc4da13482f2edea82ee487e1"
  },
  {
    "url": "assets/js/6.11079de4.js",
    "revision": "a941204385b5e3b6fde54745c2897fba"
  },
  {
    "url": "assets/js/app.f1f8201b.js",
    "revision": "c2e1b00de0b7538d2d810ee6c63c1df0"
  },
  {
    "url": "blog/20190202.html",
    "revision": "37400a92f3bd40519d9f8df76bd13269"
  },
  {
    "url": "index.html",
    "revision": "34cbbb83b8bfa5f0635ca4c29e41514c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
