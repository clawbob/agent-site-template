// Projects section block template
// (config, i18nData) → HTML string

function projectsBlock(config, i18nData) {
    const projects = (config.content && config.content.projects) || {};
    const defaultLang = (config.i18n && config.i18n.default) || 'en';

    const sectionTitle = localize(projects.sectionTitle, defaultLang) || i18nData[defaultLang]?.projects_title || 'Projects';
    const sectionDesc = localize(projects.sectionDesc, defaultLang) || i18nData[defaultLang]?.projects_desc || '';
    const sectionIcon = projects.sectionIcon || '🚀';

    const items = (projects.items || []).map(item => {
        const name = localize(item.name, defaultLang) || item.name;
        const desc = localize(item.description, defaultLang);
        const descI18n = item.i18nKey ? ` data-i18n="${item.i18nKey}_desc"` : '';
        const url = item.url || '';
        const emoji = item.emoji || '🚀';
        const gradient = item.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';

        const tags = (item.tags || []).map(tag =>
            `                            <span class="tag cute-tag">${escapeHtml(tag)}</span>`
        ).join('\n');

        // Description can be HTML (for rich content like BabySim) or plain text
        const descHtml = desc.includes('<') ? desc : `<p>${escapeHtml(desc)}</p>`;

        return `                <!-- Project: ${escapeHtml(typeof name === 'string' ? name : '')} -->
                <div class="project-card cute-card">
                    <div class="project-visual" style="background: ${gradient};">
                        <div class="project-emoji">${emoji}</div>
                    </div>
                    <div class="project-info">
                        <h3>${escapeHtml(typeof name === 'string' ? name : '')}</h3>
                        <p class="project-url">${escapeHtml(url || 'Private Tool')}</p>

                        <div class="project-desc"${descI18n}>
                            ${descHtml}
                        </div>

                        <div class="project-tags">
${tags}
                        </div>
                    </div>
                </div>`;
    }).join('\n\n');

    return `    <!-- Projects Section -->
    <section class="projects" id="projects">
        <div class="container">
            <div class="section-header">
                <span class="section-icon">${sectionIcon}</span>
                <h2 data-i18n="projects_title">${escapeHtml(sectionTitle)}</h2>
            </div>

            <p class="section-desc" data-i18n="projects_desc">${escapeHtml(sectionDesc)}</p>

            <div class="projects-grid">
${items}
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

module.exports = projectsBlock;
