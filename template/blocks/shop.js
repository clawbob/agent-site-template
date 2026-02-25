// Shop section block template
// (config, i18nData) → HTML string

function shopBlock(config, i18nData) {
    const shop = (config.content && config.content.shop) || {};
    const defaultLang = (config.i18n && config.i18n.default) || 'en';

    const sectionTitle = localize(shop.sectionTitle, defaultLang) || i18nData[defaultLang]?.shop_title || 'Shop';
    const sectionDesc = localize(shop.sectionDesc, defaultLang) || i18nData[defaultLang]?.shop_desc || '';
    const sectionIcon = shop.sectionIcon || '🛒';

    const products = (shop.products || []).map((product, idx) => {
        const name = localize(product.name, defaultLang);
        const desc = localize(product.description, defaultLang);
        const nameI18n = product.i18nKey ? ` data-i18n="${product.i18nKey}_name"` : '';
        const descI18n = product.i18nKey ? ` data-i18n="${product.i18nKey}_desc"` : '';
        const badge = product.badge || '';
        const icon = product.icon || '📦';
        const colorClass = idx % 2 === 1 ? ' purple' : '';

        const features = (product.features || []).map((f, fi) => {
            const fText = localize(f.text || f, defaultLang);
            const fI18n = f.i18nKey ? ` data-i18n="${f.i18nKey}"` : '';
            return `                        <div class="feature"><span class="check">✓</span> <span${fI18n}>${escapeHtml(fText)}</span></div>`;
        }).join('\n');

        const productId = product.id || `product-${idx}`;
        const soldCountId = product.soldCountId || `sold-${productId}`;

        return `                <div class="product-card featured">
                    <div class="product-badge${colorClass}">${escapeHtml(badge)}</div>
                    <div class="product-icon-wrapper">
                        <div class="product-icon">${icon}</div>
                        <div class="sparkle">✨</div>
                    </div>
                    <h3${nameI18n}>${escapeHtml(name)}</h3>
                    <p class="product-desc"${descI18n}>${escapeHtml(desc)}</p>
                    <div class="product-features">
${features}
                    </div>
                    <div class="product-price-box">
                        <span class="price-tag">${escapeHtml(product.price || '')}</span>
                        <span class="price-note">${escapeHtml(product.currency || 'USD')}</span>
                    </div>
                    <div class="sold-count" id="${soldCountId}" style="text-align: center; font-size: 13px; color: #999; margin-bottom: 8px; display: none;">
                        🔥 <span class="sold-num">0</span> <span data-i18n="copies_sold">${escapeHtml(i18nData[defaultLang]?.copies_sold || 'sold')}</span>
                    </div>
                    <button class="btn btn-buy${colorClass}" data-product="${escapeHtml(productId)}" data-i18n="buy_now">${escapeHtml(i18nData[defaultLang]?.buy_now || '💳 Buy Now')}</button>
                </div>`;
    }).join('\n\n');

    const shopNote = localize(shop.note, defaultLang) || i18nData[defaultLang]?.shop_note || '';

    return `    <!-- Skills Shop -->
    <section class="shop" id="shop">
        <div class="container">
            <div class="section-header">
                <span class="section-icon">${sectionIcon}</span>
                <h2 data-i18n="shop_title">${escapeHtml(sectionTitle)}</h2>
            </div>

            <p class="section-desc" data-i18n="shop_desc">${escapeHtml(sectionDesc)}</p>

            <div class="shop-grid">
${products}
            </div>

            <div class="shop-note">
                <span>💡</span> <span data-i18n="shop_note">${escapeHtml(shopNote)}</span>
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

module.exports = shopBlock;
