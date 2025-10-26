// Guardas de autenticação e logout
import { auth } from "./firebaseClient.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

let _redirected = false;

// Em páginas protegidas (ex.: teste.html)
export function requireAuth(loginPath = "login.html", onReady) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      if (!_redirected) {
        _redirected = true;
        location.replace(loginPath);
      }
      return;
    }
    if (typeof onReady === "function") onReady(user);
  });
}

// Na tela de login (se já logado, pula para a app)
export function redirectIfLoggedIn(targetPath = "teste.html") {
  onAuthStateChanged(auth, (user) => {
    if (user && !_redirected) {
      _redirected = true;
      location.replace(targetPath);
    }
  });
}

export async function doLogout(loginPath = "login.html") {
  await signOut(auth);
  location.replace(loginPath);
}
