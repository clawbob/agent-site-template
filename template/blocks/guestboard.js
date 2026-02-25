// Guestboard block template
// (config, i18nData) → HTML string (FAB + panel)

function guestboardBlock(config, i18nData) {
    const gb = (config.content && config.content.guestboard) || {};
    const defaultLang = (config.i18n && config.i18n.default) || 'en';
    const t = i18nData[defaultLang] || {};

    return `    <!-- Guestboard Floating Button -->
    <button id="guestboard-fab" class="guestboard-fab" aria-label="${escapeHtml(t.guestboard_fab || 'Guestboard')}">
        <span class="guestboard-fab-icon">💬</span>
        <span class="guestboard-fab-label" data-i18n="guestboard_fab">${escapeHtml(t.guestboard_fab || 'Guestboard')}</span>
    </button>

    <!-- Guestboard Side Panel -->
    <div id="guestboard-overlay" class="guestboard-overlay"></div>
    <aside id="guestboard-panel" class="guestboard-panel">
        <div class="guestboard-header">
            <div class="guestboard-title-row">
                <span class="guestboard-icon">📋</span>
                <h2 data-i18n="guestboard_title">${escapeHtml(t.guestboard_title || 'Guestboard')}</h2>
            </div>
            <p class="guestboard-desc" data-i18n="guestboard_desc">${escapeHtml(t.guestboard_desc || '')}</p>
            <button id="guestboard-close" class="guestboard-close" aria-label="Close">&times;</button>
        </div>

        <div id="guestboard-messages" class="guestboard-messages">
            <!-- Messages rendered by JS -->
        </div>

        <div class="guestboard-compose">
            <div id="guestboard-form-msg" class="guestboard-form-step active">
                <input type="text" id="guestboard-nickname" class="guestboard-input" data-i18n-placeholder="guestboard_nickname_ph" placeholder="${escapeHtml(t.guestboard_nickname_ph || 'Your nickname (optional)')}" maxlength="20">
                <textarea id="guestboard-text" class="guestboard-textarea" data-i18n-placeholder="guestboard_text_ph" placeholder="${escapeHtml(t.guestboard_text_ph || 'Leave a message...')}" maxlength="500" rows="2"></textarea>
                <button id="guestboard-submit" class="btn btn-primary guestboard-submit-btn" data-i18n="guestboard_send">${escapeHtml(t.guestboard_send || 'Send Message')}</button>
            </div>
            <div id="guestboard-form-email" class="guestboard-form-step">
                <p class="guestboard-email-prompt" data-i18n="guestboard_email_prompt">${escapeHtml(t.guestboard_email_prompt || 'Leave your email for reply notifications')}</p>
                <input type="email" id="guestboard-email" class="guestboard-input" placeholder="your@email.com">
                <button id="guestboard-confirm" class="btn btn-primary guestboard-submit-btn" data-i18n="guestboard_confirm">${escapeHtml(t.guestboard_confirm || 'Confirm & Send')}</button>
            </div>
            <div id="guestboard-form-done" class="guestboard-form-step">
                <p class="guestboard-done-msg" data-i18n="guestboard_done">${escapeHtml(t.guestboard_done || 'Got it! Will reply soon~')}</p>
            </div>
        </div>
    </aside>`;
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

module.exports = guestboardBlock;
