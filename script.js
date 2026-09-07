const POKEDEX_DATA = [
  { id: 1, name: "Bulbasaur", type: "Grass / Poison", icon: "🌱", height: "0.7 m", weight: "6.9 kg", desc: "A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon." },
  { id: 4, name: "Charmander", type: "Fire", icon: "🔥", height: "0.6 m", weight: "8.5 kg", desc: "The flame that burns at the tip of its tail is an indication of its emotions and life force." },
  { id: 7, name: "Squirtle", type: "Water", icon: "💧", height: "0.5 m", weight: "9.0 kg", desc: "When it retracts its long neck into its shell, it squirts out water with vigorous force." },
  { id: 25, name: "Pikachu", type: "Electric", icon: "⚡", height: "0.4 m", weight: "6.0 kg", desc: "It keeps its tail raised to monitor its surroundings. If you yank its tail, it will try to bite you." },
  { id: 94, name: "Gengar", type: "Ghost / Poison", icon: "👻", height: "1.5 m", weight: "40.5 kg", desc: "Should a strange chill go through your room, it is evidence of Gengar's appearance." },
  { id: 133, name: "Eevee", type: "Normal", icon: "🦊", height: "0.3 m", weight: "6.5 kg", desc: "An extremely rare Pokémon that may evolve in a number of different ways depending on stimuli." },
  { id: 143, name: "Snorlax", type: "Normal", icon: "💤", height: "2.1 m", weight: "460.0 kg", desc: "Very lazy. Just eats and sleeps. As its enormous bulk builds, it becomes steadily more inactive." },
  { id: 150, name: "Mewtwo", type: "Psychic", icon: "🧬", height: "2.0 m", weight: "122.0 kg", desc: "It was created by a scientist after years of horrific gene-splicing and DNA engineering experiments." }
];

let highestZ = 100;
let enemyHp = 100;
let playerHp = 100;

function openWindow(id)
{
  const win = document.getElementById(id);
  win.style.display = 'flex';
  bringToFront(win);

  if (!win.style.top) {
    const offset = Math.floor(Math.random() * 30);
    win.style.top = `${70 + offset}px`;
    win.style.left = `${100 + offset}px`;
  }
}

function closeWindow(id) 
{
  document.getElementById(id).style.display = 'none';
}

function bringToFront(element) 
{
  highestZ += 1;
  element.style.zIndex = highestZ;
}

document.querySelectorAll('.window').forEach((win) => {
  const header = win.querySelector('.window-header');

  win.addEventListener('mousedown', () => bringToFront(win));

  header.addEventListener('mousedown', (e) => {
    let startX = e.clientX - win.offsetLeft;
    let startY = e.clientY - win.offsetTop;

    function onMouseMove(event) {
      win.style.left = `${event.clientX - startX}px`;
      win.style.top = `${event.clientY - startY}px`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
});


function setupPokedex() 
{
  const select = document.getElementById('dex-select');
  select.innerHTML = POKEDEX_DATA.map(p => `<option value="${p.id}">#${p.id} ${p.name}</option>`).join('');
  renderPokemonDetails();
}

function renderPokemonDetails() 
{
  const selectedId = parseInt(document.getElementById('dex-select').value);
  const pokemon = POKEDEX_DATA.find(p => p.id === selectedId);
  const display = document.getElementById('dex-result');

  display.innerHTML = `
    <div class="dex-emoji-avatar">${pokemon.icon}</div>
    <h3>#${pokemon.id} ${pokemon.name.toUpperCase()}</h3>
    <span class="type-pill">${pokemon.type}</span>
    <p style="font-size: 12px; margin: 4px 0 0 0;"><strong>Height:</strong> ${pokemon.height} | <strong>Weight:</strong> ${pokemon.weight}</p>
    <p style="font-size: 11px; color: #555; font-style: italic; line-height: 1.4;">"${pokemon.desc}"</p>
  `;
}

function battleAction(moveName, damage) 
{
  if (enemyHp <= 0 || playerHp <= 0) return;

  const dialogue = document.getElementById('battle-dialogue');

  enemyHp = Math.max(0, enemyHp - damage);
  updateHpBars();
  dialogue.innerText = `Pikachu used ${moveName}! Dealt ${damage} damage.`;

  if (enemyHp === 0) 
    {
    dialogue.innerText = 'Gengar fainted! You won the battle!';
    return;
  }

  setTimeout(() => {
    const enemyDmg = Math.floor(Math.random() * 20) + 10;
    playerHp = Math.max(0, playerHp - enemyDmg);
    updateHpBars();
    dialogue.innerText = `Gengar used Shadow Ball! Dealt ${enemyDmg} damage.`;

    if (playerHp === 0) 
      {
      dialogue.innerText = 'Pikachu fainted! Better luck next time.';
    }
  }, 700);
}

function updateHpBars() 
{
  document.getElementById('enemy-hp').style.width = `${enemyHp}%`;
  document.getElementById('player-hp').style.width = `${playerHp}%`;
}

function resetBattle() 
{
  enemyHp = 100;
  playerHp = 100;
  updateHpBars();
  document.getElementById('battle-dialogue').innerText = 'A wild Gengar appeared! Choose an action:';
}

function setupPC() 
{
  const pcGrid = document.getElementById('pc-grid');
  pcGrid.innerHTML = POKEDEX_DATA.map(p => `
    <div class="pc-slot">
      <div class="slot-icon">${p.icon}</div>
      <span>${p.name}</span>
    </div>
  `).join('');
}

function updateClock() 
{
  const now = new Date();
  document.getElementById('clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

window.addEventListener('DOMContentLoaded', () => {
  setupPokedex();
  setupPC();
  updateClock();
  setInterval(updateClock, 1000);
  openWindow('pokedex-win');
});