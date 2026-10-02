const C='xiaole-v080-push1';
const A=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png','./favicon-64.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(C).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))});

self.addEventListener('push',e=>{
  let data={};
  try{
    data=e.data?e.data.json():{};
  }catch(_){
    data={title:'小樂',body:e.data?e.data.text():'',url:'./'};
  }
  const title=data.title||'小樂';
  const options={
    body:data.body||'',
    icon:'./icon-192.png',
    badge:'./favicon-64.png',
    data:{url:data.url||'./'}
  };
  e.waitUntil(self.registration.showNotification(title,options));
});

self.addEventListener('notificationclick',e=>{e.notification.close();const url=e.notification?.data?.url||'./';e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c)return c.focus()}return clients.openWindow?clients.openWindow(url):undefined}))});
