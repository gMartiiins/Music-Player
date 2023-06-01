const botaoPlay = document.querySelector('.bPlay');
const botaoRetornar = document.querySelector('.blocoRetornar');
const botaoAvancar = document.querySelector('.blocoAvancar');
const bRetornar = document.querySelector('.bRetornar');
const bAvancar = document.querySelector('.bAvancar');
const musica = document.querySelector('.musica');
const barraMusica = document.querySelector('.barraMusica');
const trilhaMusica = document.querySelector('.trilhaMusica');
const trilhaBola = document.querySelector('.trilhaBola');
const botaoPause = document.querySelector('.bPause')
const tempoMusica = document.querySelector('.tempoMusica');
const tempoMusicaTotal = document.querySelector('.tempoMusicaTotal');
const nomeMusica = document.querySelector('.nomeMusica');
const albumImagem = document.querySelector('.albumImagem');
const volumeRange = document.querySelector('.volumeRange');
const botaoVolume = document.querySelector('.bVolume');
const volumeTrilha = document.querySelector('.volumeTrilha');
const bolaVolume = document.querySelector('.bolaVolume');
const bVolumeOn = document.querySelector('.blocoVolumeOn');
const bVolumeOff = document.querySelector('.blocoVolumeOff');
const bVolume = document.querySelector('.bVolume');



var musicas = [
  './musicas/The Kid LAROI - WITHOUT YOU (Lyrics).mp3',
  './musicas//Basshunter & Alien Cut - End The Lies (Official Lyric Video).mp3',
  './musicas//Halsey - Without Me (Lyrics).mp3'
];

var nomesMusicas = [
  { cantor: 'The Kid LAROI', 
    sing: 'WITHOUT YOU', 
    imagem:'./imgs/laroi.jpg'},
  
  { cantor: 'Basshunter & Alien Cut', 
    sing: 'End The Lies',
    imagem:'./imgs/bass.jpg'},
  
  { cantor: 'Halsey', 
    sing: 'Without Me' ,
    imagem:'./imgs/hasley.jpg'}
];

var posicaoAtual = 0;

carregarMusica();
//tocar musica
botaoPlay.addEventListener('click', function(){
   
    botaoPlay.style.display = "none"
    botaoPause.style.display = "block"
    barraMusica.classList.add('playing');
    musica.play();
    animateProgressBar();
});
botaoPause.addEventListener('click', function(){
   
    botaoPause.style.display = "none"
    botaoPlay.style.display = "block"
    musica.pause();
    cancelAnimationFrame(animationFrameId);
});

botaoAvancar.addEventListener('click', function(){
   
  if( botaoPause.style.display === "block"){
    musica.play();
  }else{
    musica.pause();
  }   
});
botaoRetornar.addEventListener('click', function(){
   
  if( botaoPause.style.display === "block"){
    musica.play();}
    else{
      musica.pause();
    }   
  
});

bVolumeOn.addEventListener('click', function(){

  bVolumeOff.style.display = 'block'
  bVolumeOn.style.display = 'none'
  musica.volume = 0;
  bVolume.style.display = 'none'

})
bVolumeOff.addEventListener('click', function(){
 
  bVolumeOff.style.display = 'none'
  bVolumeOn.style.display = 'block'
  musica.volume = 1 ;
  bVolume.style.display = 'block'
})

musica.addEventListener('timeupdate', () => {
    const progresso = (musica.currentTime / musica.duration) * 100;
    barraMusica.value = progresso;
  });
  
  barraMusica.addEventListener('input', () => {
    const seekTime = (barraMusica.value * musica.duration) / 100;
    musica.currentTime = seekTime;
  });
  
  function animateProgressBar() {
    const progresso = (musica.currentTime / musica.duration) * 100;
    barraMusica.value = progresso;
    animationFrameId = requestAnimationFrame(animateProgressBar);
  }

  musica.addEventListener('timeupdate', function() {
    var minutos = Math.floor(musica.currentTime / 60);
    var segundos = Math.floor(musica.currentTime % 60);
    var tempoFormatado = minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
    tempoMusica.innerHTML = tempoFormatado;
  })

  musica.addEventListener('loadedmetadata', function() {
    var minutosTotal = Math.floor(musica.duration / 60);
    var segundosTotal = Math.floor(musica.duration % 60);
    var tempoTotalFormatado = minutosTotal.toString().padStart(2, '0') + ':' + segundosTotal.toString().padStart(2, '0');
    tempoMusicaTotal.innerHTML = tempoTotalFormatado;
  });
  
  musica.addEventListener('timeupdate', function() {
    var minutosAtual = Math.floor(musica.currentTime / 60);
    var segundosAtual = Math.floor(musica.currentTime % 60);
    var tempoAtualFormatado = minutosAtual.toString().padStart(2, '0') + ':' + segundosAtual.toString().padStart(2, '0');
    tempoMusica.innerHTML = tempoAtualFormatado;
  
    var progresso = (musica.currentTime / musica.duration) * 100;
    trilhaMusica.style.width = progresso + '%';
    trilhaBola.style.left = progresso + '%';
  });
  
  barraMusica.addEventListener('click', function(event) {
    var progressoClicado = (event.offsetX / barraMusica.offsetWidth);
    musica.currentTime = musica.duration * progressoClicado;
  });

  musica.addEventListener('ended', function() {
    avancarMusica();
  });

  function carregarMusica() {
    musica.src = musicas[posicaoAtual];
    musica.load();
    var nomedoCantor = nomesMusicas[posicaoAtual].cantor;
    var nomedaMusica = nomesMusicas[posicaoAtual].sing;
    var caminhoImagem = nomesMusicas[posicaoAtual].imagem;
    nomeMusica.innerHTML = '<strong>' + nomedoCantor + '</strong><br>' + nomedaMusica;
    albumImagem.src = caminhoImagem;
  }
  
  function avancarMusica() {
    posicaoAtual++;
    if (posicaoAtual >= musicas.length) {
      posicaoAtual = 0;
    }
    carregarMusica();
    musica.play();
  }
  
  function voltarMusica() {
    posicaoAtual--;
    if (posicaoAtual < 0) {
      posicaoAtual = musicas.length - 1;
    }
    carregarMusica();
    musica.play();
  }

  var volumeInicial = 0.5;
  var volumeTrailWidth = volumeInicial * 100;
  volumeTrilha.style.width = volumeTrailWidth + '%';
  bolaVolume.style.left = volumeTrailWidth + '%';
  musica.volume = volumeInicial;

  function alterarVolume(event) {
    var volumeButtonRect = botaoVolume.getBoundingClientRect();
    var offsetX = event.clientX - volumeButtonRect.left;
    var volumePercent = offsetX / volumeButtonRect.width;
    var volume = volumePercent.toFixed(2);
  
    volume = Math.max(0, Math.min(1, volume));
  
    bolaVolume.style.left = offsetX + 'px';
    volumeTrilha.style.width = offsetX + 'px';

    musica.volume = volume;
}



