// Inicializa o Firebase uma única vez e exporta o auth/app
import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPxzehE70OnXuvfdEdquTyjjy3H2QiDFI",
  authDomain: "rota-livre-9b4b3.firebaseapp.com",
  projectId: "rota-livre-9b4b3",
  storageBucket: "rota-livre-9b4b3.firebasestorage.app",
  messagingSenderId: "385216702525",
  appId: "1:385216702525:web:c34f4973585f4112162254",
  measurementId: "G-QPCXF5YN9G"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
