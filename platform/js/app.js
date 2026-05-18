/**
 * Constellation25 Platform Application Logic
 */

import { SECTIONS } from './data.js';

let activeTab = 'modules';

/**
 * Render the statistics panel
 */
function renderStats() {
  const statsContainer = document.getElementById('meta');
  const totalAssets = SECTIONS.assets.data.length;

  statsContainer.innerHTML = `
    <div class="stat"><strong>27</strong><span>Modules</span></div>
    <div class="stat"><strong>25</strong><span>Agents</span></div>
    <div class="stat"><strong>${totalAssets}</strong><span>Assets</span></div>
    <div class="stat"><strong>8</strong><span>Repos Synced</span></div>
  `;
}

/**
 * Render the tab navigation
 */
function renderTabs() {
  const tabsContainer = document.getElementById('tabs');
  tabsContainer.innerHTML = Object.keys(SECTIONS).map(key =>
    `<button class="tab ${key === activeTab ? 'active' : ''}" onclick="window.switchTab('${key}')">${SECTIONS[key].label}</button>`
  ).join('');
}

/**
 * Render the content grid
 */
function renderContent() {
  const contentContainer = document.getElementById('content');
  const data = SECTIONS[activeTab].data;

  contentContainer.innerHTML = data.slice(0, 50).map(item => {
    let tag, subtitle;

    if (activeTab === 'modules') {
      tag = 'MODULE';
      subtitle = 'Core infrastructure';
    } else if (activeTab === 'agents') {
      tag = 'AGENT';
      subtitle = 'Autonomous node';
    } else {
      tag = item.type.toUpperCase();
      subtitle = item.path || '';
    }

    return `
      <div class="card">
        <span class="tag">${tag}</span>
        <h3>${item.name}</h3>
        <p>${subtitle}</p>
      </div>
    `;
  }).join('');
}

/**
 * Main render function
 */
function render() {
  renderStats();
  renderTabs();
  renderContent();
}

/**
 * Switch to a different tab
 * @param {string} tab - The tab key to switch to
 */
function switchTab(tab) {
  activeTab = tab;
  render();
}

// Expose switchTab globally for inline onclick handlers
window.switchTab = switchTab;

// Initialize the application
document.addEventListener('DOMContentLoaded', render);

export { render, switchTab };
