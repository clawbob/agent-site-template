// Hero section block template
// (config, i18nData) → HTML string

function heroBlock(config, i18nData) {
    const agent = config.agent || {};
    const hero = (config.content && config.content.hero) || {};
    const langs = (config.i18n && config.i18n.languages) || ['en'];
    const defaultLang = (config.i18n && config.i18n.default) || 'en';

    // CTA buttons
    const ctaButtons = (hero.ctaButtons || []).map(btn => {
        const label = typeof btn.label === 'object'
            ? (btn.label[defaultLang] || btn.label.en || Object.values(btn.label)[0])
            : btn.label;
        const i18nAttr = btn.i18nKey ? ` data-i18n="${btn.i18nKey}"` : '';
        const icon = btn.icon ? `<span>${btn.icon}</span> ` : '';
        const cls = btn.style === 'primary' ? 'btn btn-primary' : 'btn btn-secondary';
        return `                <a href="${btn.target || '#'}" class="${cls}">
                    ${icon}<span${i18nAttr}>${escapeHtml(label)}</span>
                </a>`;
    }).join('\n');

    // Social links
    const socialLinks = (agent.socialLinks || []).map(link => {
        const label = typeof link.label === 'object'
            ? (link.label[defaultLang] || link.label.en || Object.values(link.label)[0])
            : link.label;
        const i18nAttr = link.i18nKey ? ` data-i18n="${link.i18nKey}"` : '';
        const icon = link.icon ? `<span>${link.icon}</span> ` : '';
        return `                <a href="${link.url}" target="_blank" class="social-link">
                    ${icon}<span${i18nAttr}>${escapeHtml(label)}</span>
                </a>`;
    }).join('\n');

    // Status badge
    const statusHtml = hero.statusEndpoint ? `
            <!-- Online/Offline Status Badge -->
            <div id="clawdbob-status" class="status-badge offline">
                <span class="status-dot"></span>
                <span class="status-text" data-i18n="status_offline">...</span>
            </div>` : '';

    // Avatar
    const avatarHtml = agent.avatar
        ? `            <div class="crab-mascot">
                <img src="${agent.avatar}" alt="${escapeHtml(agent.name || '')}" class="crab-body-img">
                <div class="sparkles">✨</div>
            </div>`
        : '';

    const subtitleText = typeof agent.subtitle === 'object'
        ? (agent.subtitle[defaultLang] || agent.subtitle.en || '')
        : (agent.subtitle || '');
    const taglineText = typeof agent.tagline === 'object'
        ? (agent.tagline[defaultLang] || agent.tagline.en || '')
        : (agent.tagline || '');

    return `    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-container">
${avatarHtml}
            <h1 class="site-title">
                <span class="title-main">${escapeHtml(agent.name || 'Agent')}</span>
                <span class="title-sub" data-i18n="subtitle">${escapeHtml(subtitleText)}</span>
            </h1>
            <p class="hero-tagline" data-i18n="tagline">${escapeHtml(taglineText)}</p>
${statusHtml}
            <div class="hero-buttons">
${ctaButtons}
            </div>

            <div class="hero-social">
${socialLinks}
            </div>
        </div>
    </section>`;
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

module.exports = heroBlock;
