// Footer block template
// (config, i18nData) → HTML string

function footerBlock(config, i18nData) {
    const agent = config.agent || {};
    const defaultLang = (config.i18n && config.i18n.default) || 'en';
    const t = i18nData[defaultLang] || {};

    const footerQuote = localize(agent.footerQuote, defaultLang) || t.footer_quote || '';
    const year = new Date().getFullYear();

    const links = (agent.socialLinks || []).map(link => {
        const label = typeof link.label === 'object'
            ? (link.label[defaultLang] || link.label.en || Object.values(link.label)[0])
            : link.label;
        const icon = link.icon ? `<span>${link.icon}</span> ` : '';
        return `                    <a href="${link.url}" target="_blank" class="footer-link">
                        ${icon}${escapeHtml(label)}
                    </a>`;
    }).join('\n');

    const mascotEmoji = agent.mascotEmoji || '🦀';
    const footerCopy = agent.footerCopy || `${mascotEmoji} © ${year} ${escapeHtml(agent.name || 'Agent')}`;

    return `    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-mascot">${mascotEmoji}</div>

                <h3 class="footer-title">${escapeHtml(agent.name || 'Agent')}</h3>
                <p class="footer-quote" data-i18n="footer_quote">${escapeHtml(footerQuote)}</p>

                <div class="footer-links">
${links}
                </div>

                <p class="footer-copy">${footerCopy}</p>
            </div>
        </div>
    </footer>`;
}

function localize(val, lang) {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[lang] || val.en || Object.values(val)[0] || '';
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

module.exports = footerBlock;
