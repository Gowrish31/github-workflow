// Prompt: Initialize scores and round number
let playerScore = 0;
let computerScore = 0;
let round = 1;

// Prompt: Generate a random computer choice from Rock, Paper, or Scissors
function getComputerChoice() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

// Prompt: Play one round and return outcome: 'win', 'lose', or 'draw' based on rules
function playRound(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'draw';
  if (
    (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
    (playerChoice === 'Paper' && computerChoice === 'Rock') ||
    (playerChoice === 'Scissors' && computerChoice === 'Paper')
  ) {
    playerScore++;
    return 'win';
  } else {
    computerScore++;
    return 'lose';
  }
}

// Prompt: Convert a text choice to its corresponding emoji icon
function getIcon(choice) {
  if (choice === 'Rock') return '🪨';
  if (choice === 'Paper') return '📄';
  if (choice === 'Scissors') return '✂️';
  return '?';
}

// Prompt: Update the UI with current scores, choices, round number, and message
function updateUI(playerChoice, computerChoice, outcome) {
  document.getElementById('player-score').innerText = `You: ${playerScore}`;
  document.getElementById('computer-score').innerText = `Computer: ${computerScore}`;
  document.getElementById('round-number').innerText = `Round ${Math.min(round, 5)}`;

  // Show player and computer choices using emojis
  if (playerChoice && computerChoice) {
    document.getElementById('player-choice').innerText = `Your choice: ${getIcon(playerChoice)}`;
    document.getElementById('computer-choice').innerText = `Computer's choice: ${getIcon(computerChoice)}`;
  }

  // Set the message depending on outcome or final result
  let resultText = '';
  if (round > 5) {
    if (playerScore > computerScore) resultText = "🎉 You win the game!";
    else if (playerScore < computerScore) resultText = "💻 Computer wins the game!";
    else resultText = "🤝 It's a tie!";
  } else {
    if (outcome === 'win') resultText = `✅ You win! ${playerChoice} beats ${computerChoice}`;
    else if (outcome === 'lose') resultText = `❌ You lose! ${computerChoice} beats ${playerChoice}`;
    else resultText = `🔄 It's a draw!`;
  }

  // Display message in UI
  document.getElementById('message').innerText = resultText;
}

// Prompt: Handle user selecting a choice → play a round and update everything
function handleChoice(playerChoice) {
  if (round > 5) return; // Game over
  const computerChoice = getComputerChoice(); // Get computer's move
  const result = playRound(playerChoice, computerChoice); // Play round
  updateUI(playerChoice, computerChoice, result); // Update UI
  round++; // Move to next round
}

// Prompt: Wait until DOM is fully loaded, then attach button event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Hook up event listeners to rock, paper, scissors buttons
  document.getElementById('rock-btn').addEventListener('click', () => handleChoice('Rock'));
  document.getElementById('paper-btn').addEventListener('click', () => handleChoice('Paper'));
  document.getElementById('scissors-btn').addEventListener('click', () => handleChoice('Scissors'));

  // Reset button: set scores and UI to initial state
  document.getElementById('reset-button').addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    document.getElementById('player-choice').innerText = 'Your choice: ?';
    document.getElementById('computer-choice').innerText = "Computer's choice: ?";
    document.getElementById('message').innerText = 'Make your choice!';
    updateUI('', '', '');
  });
});
