const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 10000;

// Render'da açtığın 5 işçi servisinin adreslerini buraya yazıyorsun:
const workerServisleri = [
    'https://worker-1.onrender.com', // Buraya 1. işçinin adresi
    'https://worker-2.onrender.com', // Buraya 2. işçinin adresi
    'https://worker-3.onrender.com', // Buraya 3. işçinin adresi
    'https://worker-4.onrender.com', // Buraya 4. işçinin adresi
    'https://worker-5.onrender.com'  // Buraya 5. işçinin adresi
];

app.use('/', (req, res, next) => {
    // 5 işçiden rastgele birini seçer
    const secilenWorker = workerServisleri[Math.floor(Math.random() * workerServisleri.length)];
    
    console.log(`[Master] Trafik şu işçiye yönlendiriliyor: ${secilenWorker}`);

    const proxy = createProxyMiddleware({
        target: secilenWorker,
        changeOrigin: true,
        secure: false,
        ws: true // Minecraft bağlantıları için zorunlu
    });

    return proxy(req, res, next);
});

app.listen(PORT, () => {
    console.log(`Ana Sinyal Verici (Master) ${PORT} portunda aktif!`);
});
