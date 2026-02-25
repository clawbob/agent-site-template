// Diary section block template
// (config, i18nData) → HTML string

function diaryBlock(config, i18nData) {
    const diary = (config.content && config.content.diary) || {};
    const defaultLang = (config.i18n && config.i18n.default) || 'en';
    const langs = (config.i18n && config.i18n.languages) || ['en'];

    const sectionTitle = localize(diary.sectionTitle, defaultLang) || i18nData[defaultLang]?.diary_title || 'Diary';
    const sectionDesc = localize(diary.sectionDesc, defaultLang) || i18nData[defaultLang]?.diary_desc || '';
    const sectionIcon = diary.sectionIcon || '📖';

    const entries = (diary.entries || []).map(entry => {
        const titleI18n = entry.i18nKey ? ` data-i18n="${entry.i18nKey}_title"` : '';
        const title = localize(entry.title, defaultLang);

        const tags = (entry.tags || []).map(tag =>
            `                            <span class="tag">${escapeHtml(tag)}</span>`
        ).join('\n');

        // Generate content blocks for each language
        const contentBlocks = langs.map(lang => {
            const body = entry.body ? (typeof entry.body === 'object' ? entry.body[lang] : entry.body) : '';
            if (!body) return '';
            // Body can be HTML string (paragraphs) or plain text
            const bodyHtml = body.includes('<p>') ? body : `<p>${escapeHtml(body)}</p>`;
            return `                    <div class="entry-content ${lang}">
                        ${bodyHtml}
                    </div>`;
        }).filter(Boolean).join('\n\n');

        const entryId = entry.id || entry.date || '';

        return `                <!-- Entry: ${escapeHtml(title)} (${entry.date || ''}) -->
                <article class="diary-entry collapsed" data-entry="${escapeHtml(entryId)}">
                    <div class="entry-header">
                        <span class="entry-date">${escapeHtml(entry.date || '')}</span>
                        <div class="entry-tags">
${tags}
                        </div>
                    </div>
                    <h3 class="entry-title"${titleI18n}>${escapeHtml(title)}</h3>

${contentBlocks}

                    <button class="entry-toggle" data-i18n="read_more">${escapeHtml(i18nData[defaultLang]?.read_more || 'Read more ↓')}</button>
                </article>`;
    }).join('\n\n');

    // Footer link
    const footerLink = diary.footerLink || {};
    const footerLinkHtml = footerLink.url ? `
            <div class="diary-footer">
                <a href="${footerLink.url}" target="_blank" class="btn btn-cute">
                    <span>${footerLink.icon || '📱'}</span> <span data-i18n="view_xhs">${escapeHtml(localize(footerLink.label, defaultLang))}</span>
                </a>
            </div>` : '';

    return `    <!-- Diary Section -->
    <section class="diary" id="diary">
        <div class="container">
            <div class="section-header">
                <span class="section-icon">${sectionIcon}</span>
                <h2 data-i18n="diary_title">${escapeHtml(sectionTitle)}</h2>
            </div>

            <p class="section-desc" data-i18n="diary_desc">${escapeHtml(sectionDesc)}</p>

            <div class="diary-grid">

${entries}

            </div>
${footerLinkHtml}
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

module.exports = diaryBlock;
