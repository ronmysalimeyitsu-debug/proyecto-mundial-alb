const data = [
  { id: 1, name: 'Lionel Chapo', rarity: 'epica', collected: false, count: 0 },
  { id: 2, name: 'María Golazo', rarity: 'rara', collected: false, count: 0 },
  { id: 3, name: 'El Muro', rarity: 'comun', collected: false, count: 0 },
  { id: 4, name: 'Sofía Finta', rarity: 'comun', collected: false, count: 0 },
  { id: 5, name: 'Tiro Libre', rarity: 'rara', collected: false, count: 0 },
  { id: 6, name: 'Capitán Mística', rarity: 'epica', collected: false, count: 0 },
  { id: 7, name: 'Rayo Central', rarity: 'comun', collected: false, count: 0 },
  { id: 8, name: 'Diana Drible', rarity: 'rara', collected: false, count: 0 },
  { id: 9, name: 'Fantasía', rarity: 'comun', collected: false, count: 0 },
  { id: 10, name: 'Pulga Atómica', rarity: 'epica', collected: false, count: 0 },
  { id: 11, name: 'Relámpago', rarity: 'comun', collected: false, count: 0 },
  { id: 12, name: 'Muralla Dorada', rarity: 'rara', collected: false, count: 0 },
  { id: 13, name: 'Estrella del Viento', rarity: 'epica', collected: false, count: 0 },
  { id: 14, name: 'Centinela', rarity: 'comun', collected: false, count: 0 },
  { id: 15, name: 'Cachetón', rarity: 'rara', collected: false, count: 0 },
  { id: 16, name: 'Arco de Oro', rarity: 'epica', collected: false, count: 0 }
];

const elements = {
  grid: document.getElementById('grid'),
  collectedCount: document.getElementById('collected-count'),
  totalCount: document.getElementById('total-count'),
  progressFill: document.getElementById('progress-fill'),
  progressLabel: document.getElementById('progress-label'),
  rarityFilter: document.getElementById('rarity-filter'),
  missingOnly: document.getElementById('missing-only'),
  openPack: document.getElementById('open-pack'),
  packResult: document.getElementById('pack-result'),
  resetButton: document.getElementById('reset-button')
};

const state = {
  rarity: 'all',
  missingOnly: false,
  packMessageTimeout: null
};

function formatRarityLabel(rarity) {
  return rarity === 'comun' ? 'Común' : rarity === 'rara' ? 'Rara' : 'Épica';
}

function countCollected() {
  return data.filter(item => item.collected).length;
}

function filteredItems() {
  return data.filter(item => {
    const matchesRarity = state.rarity === 'all' || item.rarity === state.rarity;
    const matchesMissing = !state.missingOnly || !item.collected;
    return matchesRarity && matchesMissing;
  });
}

function updateStats() {
  const total = data.length;
  const collected = countCollected();
  const percent = total === 0 ? 0 : Math.round((collected / total) * 100);

  elements.collectedCount.textContent = collected;
  elements.totalCount.textContent = `de ${total}`;
  elements.progressFill.style.width = `${percent}%`;
  elements.progressLabel.textContent = `${percent}%`;
}

function renderItem(item) {
  const card = document.createElement('article');
  card.className = 'cromo-card';
  card.dataset.id = item.id;

  const rarityText = formatRarityLabel(item.rarity);
  const isCollected = item.collected;

  card.innerHTML = `
    <div class="card-header">
      <span class="badge ${item.rarity}">${rarityText}</span>
      <span class="card-meta">#${String(item.id).padStart(2, '0')}</span>
    </div>
    <div class="portrait" style="background: ${placeholderColor(item.rarity)};">
      ${item.name.split(' ').map(word => word[0]).join('')}
    </div>
    <div class="card-body">
      <h2 class="card-title">${item.name}</h2>
      <div class="card-meta">${isCollected ? 'Coleccionado' : 'Faltante'}</div>
      <button class="toggle-button ${isCollected ? 'collected' : ''}" data-action="toggle">
        ${isCollected ? 'Tengo' : 'Me falta'}
      </button>
      <div class="count-controls">
        <button data-action="decrease">−</button>
        <strong>${item.count}</strong>
        <button data-action="increase">+</button>
      </div>
    </div>
  `;

  const toggleButton = card.querySelector('[data-action="toggle"]');
  const decreaseButton = card.querySelector('[data-action="decrease"]');
  const increaseButton = card.querySelector('[data-action="increase"]');
  const countDisplay = card.querySelector('strong');

  toggleButton.addEventListener('click', () => {
    item.collected = !item.collected;
    if (!item.collected) {
      item.count = 0;
    } else if (item.count === 0) {
      item.count = 1;
    }
    renderApp();
  });

  decreaseButton.addEventListener('click', () => {
    if (item.count > 0) {
      item.count -= 1;
      if (item.count === 0 && !item.collected) {
        item.count = 0;
      }
      countDisplay.textContent = item.count;
    }
  });

  increaseButton.addEventListener('click', () => {
    item.count += 1;
    if (!item.collected) {
      item.collected = true;
      toggleButton.classList.add('collected');
      toggleButton.textContent = 'Tengo';
    }
    countDisplay.textContent = item.count;
    updateStats();
  });

  return card;
}

function placeholderColor(rarity) {
  switch (rarity) {
    case 'rara': return '#274c71';
    case 'epica': return '#7d4b1a';
    default: return '#2c2c2c';
  }
}

function renderGrid() {
  elements.grid.innerHTML = '';
  const items = filteredItems();
  if (items.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No hay cromos con esa selección.';
    emptyMessage.style.color = 'var(--muted)';
    elements.grid.appendChild(emptyMessage);
    return;
  }

  items.forEach(item => elements.grid.appendChild(renderItem(item)));
}

function randomPackItems(count) {
  const remaining = data.filter(item => !item.collected);
  const shuffled = [...remaining].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function showPackResult(newItems) {
  if (!newItems.length) {
    elements.packResult.innerHTML = '<p>Ya tienes todos los cromos. ¡Completa la colección!</p>';
    elements.packResult.classList.remove('hidden');
    return;
  }

  elements.packResult.innerHTML = `
    <p>Has abierto un pack y conseguiste:</p>
    <div class="pack-item-list">
      ${newItems.map(item => `<span class="pack-item">${item.name} (${formatRarityLabel(item.rarity)})</span>`).join('')}
    </div>
  `;
  elements.packResult.classList.remove('hidden');
  clearTimeout(state.packMessageTimeout);
  state.packMessageTimeout = setTimeout(() => {
    elements.packResult.classList.add('hidden');
  }, 4500);
}

function openPack() {
  const selected = randomPackItems(3);
  selected.forEach(item => {
    item.collected = true;
    item.count = Math.max(1, item.count);
  });
  renderApp();
  showPackResult(selected);
}

function resetCollection() {
  data.forEach(item => {
    item.collected = false;
    item.count = 0;
  });
  renderApp();
  elements.packResult.classList.add('hidden');
}

function renderApp() {
  updateStats();
  renderGrid();
}

elements.rarityFilter.addEventListener('change', event => {
  state.rarity = event.target.value;
  renderGrid();
});

elements.missingOnly.addEventListener('change', event => {
  state.missingOnly = event.target.checked;
  renderGrid();
});

elements.openPack.addEventListener('click', openPack);

elements.resetButton.addEventListener('click', resetCollection);

document.addEventListener('DOMContentLoaded', () => {
  elements.totalCount.textContent = `de ${data.length}`;
  renderApp();
});
