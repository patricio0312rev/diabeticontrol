if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const o=e=>a(e,t),r={module:{uri:t},exports:c,require:o};s[t]=Promise.all(n.map((e=>r[e]||o(e)))).then((e=>(i(...e),c)))}}define(["./workbox-e9849328"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"1e76b1e24219ddb0558083eef8f1069f"},{url:"/_next/static/XSTox2hMfEyrcTXsyQoAL/_buildManifest.js",revision:"7cec3e37a2188e6e1ceb0dbbca8f7219"},{url:"/_next/static/XSTox2hMfEyrcTXsyQoAL/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/24-f211126d8763b3d6.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/app/_not-found/page-8aaf04eb491ce1c4.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/app/layout-86718c2320e38c40.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/app/page-00d5f33773359bfe.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/b59efc48-c24b09ee41f7f66a.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/framework-6e06c675866dc992.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/main-ae12c5da4b7edeb0.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/main-app-f670c717d9a263af.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/pages/_app-99e16c7823144867.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/pages/_error-5c1e00385ca7f6f2.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-cddff64f2abb4964.js",revision:"XSTox2hMfEyrcTXsyQoAL"},{url:"/_next/static/css/d1cb04a21ad8f547.css",revision:"d1cb04a21ad8f547"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/Inter-Bold.6a14bae6.otf",revision:"6a14bae6"},{url:"/_next/static/media/Inter-ExtraBold.d5dbd3cd.otf",revision:"d5dbd3cd"},{url:"/_next/static/media/Inter-Medium.61992a3a.otf",revision:"61992a3a"},{url:"/_next/static/media/Inter-Regular.abed8842.otf",revision:"abed8842"},{url:"/_next/static/media/Inter-SemiBold.5a7544ab.otf",revision:"5a7544ab"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/android-chrome-192x192.png",revision:"c7d1490c580efe41e7e183bff45bb48e"},{url:"/android-chrome-384x384.png",revision:"50d285eb5a37bbae9b400742c6d582d4"},{url:"/icons/apple-touch-icon.png",revision:"2da78e3ba1070728786afdb22e635bdc"},{url:"/icons/favicon-16x16.png",revision:"05310d30db2e2a6e3e04acdd95295c7d"},{url:"/icons/favicon-32x32.png",revision:"35e9902d5f40a6301be9f24e56d0e513"},{url:"/icons/safari-pinned-tab.svg",revision:"fc191cd9da34a35b740be49ff986fc89"},{url:"/manifest.json",revision:"6e13c7d8eb11e3ecbd408a275588d5be"},{url:"/mstile-150x150.png",revision:"24d0753e2d283a4a1a685b7a374431ca"},{url:"/mstile-310x150.png",revision:"b81759edc5e2fe9ca91035256ca8953f"},{url:"/mstile-310x310.png",revision:"8115a3cdce6f4fc312efc631a35645c3"},{url:"/mstile-70x70.png",revision:"1955eeaba2ef9939930fea2da05856b0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
