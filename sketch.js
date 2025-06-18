// Essse é um jogo onde você tem que conectar o campo e a cidade, por um jogo da memória com imagens do campo e da cidade. como jogar: Apenas usando o mause e clicando nas imagens até encontrar os pares iguais.

let pairs = ['🌄','🌆','🐎','🚓','🌱','🚦']; // variedade cartas de pares de imagens
let cards = []; // variavel carta que armazenará as cartas embaralhadas
let flipped = []; // variavel que armazenará os índices das cartas viradas
let matched = []; // variavel que armazenará os índices das cartas que foram combinadas
let cols = 4, rows = 3; // Definindo o número de colunas e linhas do tabuleiro
let cardW, cardH; // Variáveis para armazenar a largura e altura das cartas

function setup() {
  createCanvas(600, 450); // Cria um canvas de 600x450 pixels
  cardW = width / cols; // Calcula a largura de cada carta
  cardH = height / rows; // Calcula a altura de cada carta
  cards = shuffle([...pairs, ...pairs]); // Embaralha as cartas, duplicando os pares
}

function draw() {
  background(33, 10, 800); // Define a cor de fundo
  textSize(cardW * 0.6); // Define o tamanho do texto baseado na largura da carta
  textAlign(CENTER, CENTER); // Alinha o texto ao centro
  for (let i = 0; i < cards.length; i++) { // Loop através de todas as cartas
    let x = (i % cols) * cardW; // Calcula a posição x da carta
    let y = floor(i / cols) * cardH; // Calcula a posição y da carta
    stroke(0); // Define a cor da borda
    strokeWeight(2); // Define a espessura da borda
    if (flipped.includes(i) || matched.includes(i)) { // Verifica se a carta está virada ou combinada
      fill(33, 60, 0); // Define a cor de fundo da carta virada
      rect(x + 10, y + 10, cardW - 20, cardH - 20, 10); // Desenha o retângulo da carta
      fill(30, 0, 50); // Define a cor do texto
      text(cards[i], x + cardW / 2, y + cardH / 2); // Exibe a imagem da carta
    } else {
      fill(20, 0, 0); // Define a cor de fundo da carta não virada
      rect(x + 10, y + 10, cardW - 20, cardH - 20, 10); // Desenha o retângulo da carta
    }
  }
  if (matched.length === cards.length) { // Verifica se todas as cartas foram combinadas
    noStroke(); // Remove a borda
    fill(400); // Define a cor do texto final
    textSize(32); // Define o tamanho do texto final
    text("Você conectou o campo e a cidade!", width / 2, height / 2); // Exibe a mensagem final
  }
}

function mousePressed() { // Função chamada quando o mouse é pressionado
  for (let i = 0; i < cards.length; i++) { // Loop através de todas as cartas
    let x = (i % cols) * cardW; // Calcula a posição x da carta
    let y = floor(i / cols) * cardH; // Calcula a posição y da carta
    if (mouseX > x + 10 && mouseX < x + cardW - 10 && mouseY > y + 10 && mouseY < y + cardH - 10) { // Verifica se o mouse está sobre a carta
      if (flipped.length < 2 && !flipped.includes(i) && !matched.includes(i)) { // Verifica se menos de 2 cartas estão viradas e se a carta não foi combinada
        flipped.push(i); // Adiciona o índice da carta virada ao 
        if (flipped.length === 2) { // Se duas cartas estão viradas
          setTimeout(checkMatch, 800); // Chama a função checkMatch após 800ms
        }
      }
    }
  }
}

function checkMatch() { // Função para verificar se as cartas viradas são iguais
  if (cards[flipped[0]] === cards[flipped[1]]) { // Se as cartas viradas são iguais
    matched.push(...flipped); // Adiciona os índices das cartas combinadas
  }
  flipped = []; // Reseta a variedade carta virada para permitir novas viradas
}
