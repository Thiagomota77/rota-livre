// Lógica da tela de login
import { auth } from "./firebaseClient.js";
import { redirectIfLoggedIn } from "./aut.js";
import {
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

// Se já logado, vai direto para a aplicação
redirectIfLoggedIn("teste.html");

// Elementos
const btnLogin = document.getElementById('btnLogin');
const lnkReset = document.getElementById('lnkReset');
const lnkAccess = document.getElementById('lnkAccess');
const errEl = document.getElementById('err');
const modal = document.getElementById('accessModal');
const btnCancelAccess = document.getElementById('btnCancelAccess');
const btnSendAccess = document.getElementById('btnSendAccess');

// Eventos
btnLogin?.addEventListener('click', doLogin);
lnkReset?.addEventListener('click', resetPass);
lnkAccess?.addEventListener('click', () => {
  modal.style.display='grid';
  document.getElementById('msgSend').textContent="";
});
btnCancelAccess?.addEventListener('click', () => { modal.style.display='none'; });
btnSendAccess?.addEventListener('click', sendAccess);

async function doLogin(){
  const email = document.getElementById('user').value.trim();
  const pass  = document.getElementById('pass').value.trim();

  errEl.style.color = "#b91c1c";
  errEl.textContent = "";
  if(!email || !pass){ errEl.textContent = "Preencha e-mail e senha."; return; }

  try {
    await setPersistence(auth, browserLocalPersistence);
    await signInWithEmailAndPassword(auth, email, pass);
    location.replace("teste.html"); // fallback
  } catch(e){
    const map = {
      "auth/invalid-email": "E-mail inválido.",
      "auth/user-disabled": "Usuário desabilitado.",
      "auth/user-not-found": "Usuário não encontrado. Clique em 'Pedir acesso'.",
      "auth/wrong-password": "Senha incorreta.",
      "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde."
    };
    errEl.textContent = map[e.code] || ("Erro: " + e.message);
  }
}

async function resetPass(){
  const email = document.getElementById('user').value.trim();
  errEl.style.color = "#b91c1c";
  errEl.textContent = "";
  if(!email){ errEl.textContent = "Digite seu e-mail para recuperar."; return; }
  try {
    await sendPasswordResetEmail(auth, email);
    errEl.style.color = "#065f46";
    errEl.textContent = "E-mail de recuperação enviado.";
  } catch(e){
    errEl.style.color = "#b91c1c";
    errEl.textContent = "Erro ao enviar recuperação: " + e.message;
  }
}

function sendAccess(){
  const nome   = document.getElementById('nomeNovo').value.trim();
  const email  = document.getElementById('emailNovo').value.trim();
  const motivo = document.getElementById('motivoNovo').value.trim();
  const msgEl  = document.getElementById('msgSend');
  msgEl.style.color="#b91c1c"; msgEl.textContent="";

  if(!nome || !email || !motivo){ msgEl.textContent="Preencha todos os campos."; return; }

  // Aqui você pode plugar EmailJS depois
  msgEl.style.color="#065f46";
  msgEl.textContent="Solicitação enviada com sucesso!";
  setTimeout(()=>{ modal.style.display='none'; }, 1500);
}
