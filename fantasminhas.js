let fantasminhas = [];
let tamanho = 40; //VARIAVÉL COM INTENÇÃO DE MODIFICAR O TAMANHO DOS FANTASMINHAS
let fantasmaimg; // VARIAVÉL RELATIVA A FUNÇÃO QUE EU CRIEI

function QueFantasma(){
  let qual = (Math.random() * 3) + 1; //CRIA NUMERO VARIAVEL DE 1 A 3
  qual = Math.floor(qual); //ARREDONDA O NUMERO
    if(qual === 1){ //SELECIONA QUE IMAGEM VAI SER UTILIZADA
     fantasmaimg = 'imgs/boo1.gif';
  } else if(qual === 2){
    fantasmaimg = 'imgs/boo2.gif';
  } else if(qual === 3){
    fantasmaimg = 'imgs/boo3.gif';
  }
} // CRIEI UMA FUNÇÃO TABAJARA PARA NÃO GERA SÓ UM TIPO DE FANTASMA

function Fantasminha(tempoAtrasoParaIniciar) {
  this.el = document.createElement('img');
  QueFantasma(); //CHAMA A FUNÇÃO QUE EU CRIEI
  this.el.src = fantasmaimg; //UTILIZA A IMAGEM QUE A FUNÇÃO DEFINE
  this.el.style.width = tamanho + 'px';
  this.el.style.position = 'absolute';

  this.el = document.body.appendChild(this.el);

  this.posiciona(tempoAtrasoParaIniciar);
}

Fantasminha.prototype.remove = function() {
  document.body.removeChild(this.el);
};

Fantasminha.prototype.posiciona = function(tempoAtrasoParaIniciar) {
  this.porcentagemTrajeto = 0;
  this.xInicial = Math.random() < 2 ? -tamanho : window.innerWidth + tamanho;
  this.yInicial = Math.random() * document.body.clientHeight;
  this.xFinal = this.xInicial < 0 ? window.innerWidth + tamanho : -tamanho;
  this.yFinal = Math.random() * document.body.clientHeight;
  this.el.style.left = `${this.xInicial}px`;
  this.el.style.bottom = `${this.yInicial}px`;
  this.tempoTrajeto = 3000 + Math.random() * 3000;
  this.tempoAtrasoParaIniciar = tempoAtrasoParaIniciar || Math.random() * 7000;
};

Fantasminha.prototype.atualiza = function(delta) {
  if (this.tempoAtrasoParaIniciar >= 0) {
    this.tempoAtrasoParaIniciar -= delta;
    return;
  }
  this.porcentagemTrajeto += delta / this.tempoTrajeto;
  this.x = this.xInicial + this.porcentagemTrajeto * (this.xFinal - this.xInicial);
  this.y = this.yInicial + this.porcentagemTrajeto * (this.yFinal - this.yInicial) + Math.sin(this.porcentagemTrajeto* 4 * 3.14159) * 40;
  this.y = Math.max(this.y, 0);
  this.el.style.left = `${this.x}px`;
  this.el.style.bottom = `${this.y}px`;

  if (this.porcentagemTrajeto >= 1) {
    this.posiciona();
  }
};

let inicio = null;

function atualizaFantasminhas(agora) {
  if (!inicio) inicio = agora;
  let delta = agora - inicio;
  for (fantasminha of fantasminhas) {
    fantasminha.atualiza(delta);
  }
  inicio = agora;
  window.requestAnimationFrame(atualizaFantasminhas);
}
atualizaFantasminhas(0);


document.addEventListener('keyup', function(e) {
  if (e.key === '+' || e.key === '=') {
    let novoFantasminha = new Fantasminha(1);
    fantasminhas.push(novoFantasminha);
  } else if (e.key === '-' || e.key === '_') {
    fantasminha = fantasminhas.pop();
    if (fantasminha) {
      fantasminha.remove();
    }
  }
});

QueFantasma();
document.body.style.overflowX = 'hidden';
fantasminhas.push(new Fantasminha());
fantasminhas.push(new Fantasminha());
fantasminhas.push(new Fantasminha());
