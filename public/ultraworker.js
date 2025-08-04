importScripts(
  "https://unpkg.com/@titaniumnetwork-dev/ultraviolet@3.2.10/dist/uv.bundle.js",
)
importScripts("uv.config.js")
importScripts(__uv$config.sw)
importScripts("/workerware/workerware.js")
importScripts("/alu-adblocker.js")
importScripts("/scram/scramjet.all.js");



if (navigator.userAgent.includes("Firefox")) {
  Object.defineProperty(globalThis, "crossOriginIsolated", {
    value: true,
    writable: true,
  })
}

const uv = new UVServiceWorker()
const { ScramjetServiceWorker } = $scramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();
(async function () {
        await scramjet.loadConfig();
})();
const ww = new WorkerWare({});



if (navigator.userAgent.includes("Firefox")) {
    Object.defineProperty(globalThis, "crossOriginIsolated", {
        value: true,
        writable: true
    });
}


ww.use({
  function: self.adblockExt.filterRequest,
  events: ["fetch"],
  name: "Adblock",
});


self.addEventListener("install", () => {
  self.skipWaiting()
})

async function handleRequest(event) {
  let mwResponse = await ww.run(event)();
  if (mwResponse.includes(null)) {
    return;
  }
  
  if (scramjet.route(event)) {
    return scramjet.fetch(event)
  }


  if (uv.route(event)) return await uv.fetch(event);
    
  return await fetch(event.request)
}

self.addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event))
})


