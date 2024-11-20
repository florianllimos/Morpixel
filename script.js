// Sélectionne toutes les cellules du jeu avec l'attribut data-cell

const cells = document.querySelectorAll('[data-cell]');

// Sélectionne l'élément du message (pour afficher les messages de jeu)

const message = document.getElementById('message');

// Sélectionne le bouton de réinitialisation du jeu

const resetButton = document.getElementById('reset-button');

// Initialise le joueur actuel à 'X'

let currentPlayer = 'X';

// Initialise le tableau de jeu vide

let gameBoard = ['', '', '', '', '', '', '', '', ''];

// Initialise l'état du jeu à actif

let gameActive = true;

// Fonction pour vérifier s'il y a un gagnant ou un match nul

function checkWin() {

  // Tableau de toutes les combinaisons gagnantes possibles

  const winningCombos = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],

  ];

  // Parcours toutes les combinaisons gagnantes

  for (let combo of winningCombos) {

    const [a, b, c] = combo;

    // Si les cellules a, b et c contiennent le même symbole (X ou O), il y a un gagnant

    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {

      gameActive = false;
      return gameBoard[a];

    }

  }

  // Si toutes les cellules sont remplies et qu'aucun gagnant n'a été trouvé, c'est un match nul

  if (!gameBoard.includes('')) {

    gameActive = false;
    return 'T'; // 'T' pour match nul

  }

  return null; // Aucun gagnant ou match nul

}

// Fonction pour gérer le clic sur une cellule

function handleClick(e) {

  const cell = e.target;

  // Obtenir l'index de la cellule cliquée parmi les cellules

  const cellIndex = Array.from(cells).indexOf(cell);

  // Vérifie si la cellule est vide et que le jeu est actif

  if (gameBoard[cellIndex] === '' && gameActive) {

    // Remplit la cellule avec le symbole du joueur actuel (X ou O)

    gameBoard[cellIndex] = currentPlayer;

    cell.textContent = currentPlayer;
    cell.classList.add('filled');

    // Vérifie s'il y a un gagnant ou un match nul

    const winner = checkWin();

    if (winner) {

      if (winner === 'T') {

        message.textContent = "Match nul !";

      } else {

        message.textContent = `Le joueur ${winner} a gagné !`;

      }

    } else {

      // Change de joueur pour le prochain tour

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `C'est le tour du joueur ${currentPlayer}`;

    }

  }

}

// Fonction pour réinitialiser le jeu

function resetGame() {

  // Réinitialise le tableau de jeu, le joueur actuel et l'état du jeu

  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  // Efface le contenu des cellules et les classes 'filled'

  cells.forEach(cell => {

    cell.textContent = '';
    cell.classList.remove('filled');

  });

  message.textContent = `C'est le tour du joueur X`;

}

// Ajoute un écouteur d'événement de clic à chaque cellule

cells.forEach(cell => {

  cell.addEventListener('click', handleClick);

});

// Ajoute un écouteur d'événement de clic au bouton de réinitialisation

resetButton.addEventListener('click', resetGame);

document.getElementById("shareBtn").addEventListener("click", function(event) {

  event.preventDefault(); 

  var siteLink = "https://florianllimos.fr/morpixel/";
  var tempInput = document.createElement("input");

  tempInput.value = siteLink;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  var btn = document.getElementById("shareBtn");
  btn.textContent = "Le lien est copié !";

  setTimeout(function() {

    btn.textContent = "Partager";

  }, 3000);

});