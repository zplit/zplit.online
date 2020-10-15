//index.js
'use strict';

//Importar lit-html
import {
  html,
  render
} from 'https://unpkg.com/lit-html@1.2.1/lit-html.js?module';


//Contantes
const remoteSource = 'https://zplit.online/latest.json';


//Objecto de Información
window.zplitData = {};


//Inicializacion
window.onload = () => {
  //Declarar objetos HTML.
  window.htmlDisplay = document.querySelector('#htmlDisplay');
  window.btnNet = document.querySelector('#btnNet');
  window.btnLog = document.querySelector('#btnLog');
  window.btnBio = document.querySelector('#btnBio');

  loadData(remoteSource)
    .then(() => {
      menuTab('creations');
    })
    .catch(() => {
      alert('Error al cargar');
    })
}

// Menu Switch
window.menuTab = async (tab) => {

  switch (tab) {
    case 'creations':
      render(logTemplate(zplitData), htmlDisplay);
      btnLog.classList = 'primary';
      btnNet.classList = '';
      btnBio.classList = '';
      break;
    case 'networks':
      render(netTemplate(zplitData), htmlDisplay);
      btnLog.classList = '';
      btnNet.classList = 'primary';
      btnBio.classList = '';
      break;
    case 'about':
        render(bioTemplate(zplitData), htmlDisplay);
        btnLog.classList = '';
        btnNet.classList = '';
        btnBio.classList = 'primary';
        break;

    default:
      render(logTemplate(zplitData), htmlDisplay)
      btnLog.classList = 'primary';
      btnNet.classList = '';
      btnBio.classList = '';
  }
};

// Fetch de JSON
async function loadData(url) {
  if (!url) {
    url = localSource
  }
  await fetch(url, {cache: "no-store"})
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Data loaded');
      zplitData = data;
    })
    .catch((data) => {
      console.log('Data could not be loadad.');
        })
};


// Plantilla de item de creaciones
const logTemplate = (data) => html `
    ${data.log.map((i) => html`
      <div class="item">
        <div class="fronttext">
          <small>${i.tag}</small><br>
          <p>
            <b>${i.title}</b>
            <br> <small>${i.desc} </small> <br>
          </p>
          <!-- <img alt="" class="artwork" src="${i.img}"> -->
          <br>
          <div style="text-align: left">
            <a href="${i.file}"  class="boton fullbtn">🔊 Stream</a>
            <a href="${i.action}" class="boton fullbtn">💎 Collect</a>
          </div>
          <br>
        </div>
      <div class="backdark" style="background-image: url('${i.img}')">

      </div>
      </div>`)}
`;

// Plantilla de item de redes
const netTemplate = (data) => html `
    ${data.net.map((i) => html`
      <a href=${i.action} class="item network">
        <img alt=""  class="icon" src="${i.img}">
        <div style="padding-top: 0.5rem">
          <b>${i.title}</b><br>
          <small>${i.desc}</small>
        </div>
      </a>`)}
`;

// Plantilla de bio
const bioTemplate = (data) => html `
    <pre>
      ${data.bio}
    </pre>
`;
