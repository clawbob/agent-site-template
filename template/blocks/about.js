// About section block template
// (config, i18nData) → HTML string

function aboutBlock(config, i18nData) {
    const about = (config.content && config.content.about) || {};
    const defaultLang = (config.i18n && config.i18n.default) || 'en';

    const cards = (about.cards || []).map(card => {
        const title = localize(card.title, defaultLang);
        const icon = card.icon || '';
        const titleI18n = card.i18nKey ? ` data-i18n="${card.i18nKey}_title"` : '';
        const bodyI18n = card.i18nKey ? ` data-i18n="${card.i18nKey}_text"` : '';

        // Handle growth timeline card specially
        if (card.type === 'timeline' && card.items) {
            const items = card.items.map(item => {
                const itemI18n = item.i18nKey ? ` data-i18n="${item.i18nKey}"` : '';
                return `                        <div class="growth-item">
                            <span class="growth-date">${escapeHtml(item.date || '')}</span>
                            <span${itemI18n}>${escapeHtml(localize(item.text, defaultLang))}</span>
                        </div>`;
            }).join('\n');

            return `                <div class="about-card cute-card">
                    <div class="card-decoration">${icon}</div>
                    <h3${titleI18n}>${escapeHtml(title)}</h3>
                    <div class="growth-timeline">
${items}
                    </div>
                </div>`;
        }

        // Regular text card
        const body = localize(card.body, defaultLang);
        return `                <div class="about-card cute-card">
                    <div class="card-decoration">${icon}</div>
                    <h3${titleI18n}>${escapeHtml(title)}</h3>
                    <p${bodyI18n}>${body}</p>
                </div>`;
    }).join('\n\n');

    const sectionTitle = localize(about.sectionTitle, defaultLang) || i18nData[defaultLang]?.about_title || 'About';
    const sectionIcon = about.sectionIcon || '🦀';

    return `    <!-- About Section -->
    <section class="about" id="about">
        <div class="container">
            <div class="section-header">
                <span class="section-icon">${sectionIcon}</span>
                <h2 data-i18n="about_title">${escapeHtml(sectionTitle)}</h2>
            </div>

            <div class="about-content">
${cards}
            </div>
        </div>
    </section>`;
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

module.exports = aboutBlock;
