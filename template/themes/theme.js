// Theme generator: config.theme → CSS :root variable block
// For ClawdBob's own site, this produces the same values as the existing style.css :root
// For other agents, this overrides colors/fonts/etc based on their config

const Color = {
    // Simple hex color manipulation (no dependencies)
    lighten(hex, amount) {
        const rgb = hexToRgb(hex);
        return rgbToHex(
            Math.min(255, rgb.r + Math.round(255 * amount)),
            Math.min(255, rgb.g + Math.round(255 * amount)),
            Math.min(255, rgb.b + Math.round(255 * amount))
        );
    },
    darken(hex, amount) {
        const rgb = hexToRgb(hex);
        return rgbToHex(
            Math.max(0, rgb.r - Math.round(255 * amount)),
            Math.max(0, rgb.g - Math.round(255 * amount)),
            Math.max(0, rgb.b - Math.round(255 * amount))
        );
    },
    rgba(hex, alpha) {
        const rgb = hexToRgb(hex);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
    },
    softBg(hex) {
        // Generate a very light tint for backgrounds
        return Color.lighten(hex, 0.42);
    }
};

function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    };
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function generateThemeCSS(themeConfig) {
    const t = themeConfig || {};

    const primary = t.primaryColor || '#FF8FAB';
    const secondary = t.secondaryColor || '#87CEEB';
    const bg = t.bgColor || '#FFF9F0';
    const text = t.textColor || '#4A4A4A';
    const font = t.font || "'Nunito', 'M PLUS Rounded 1c', -apple-system, sans-serif";
    const radius = t.borderRadius || '20px';
    const glassEffect = t.glassEffect !== false; // default true

    // Derived colors
    const primaryLight = Color.lighten(primary, 0.15);
    const primaryDark = Color.darken(primary, 0.1);
    const primarySoft = Color.softBg(primary);
    const secondaryLight = Color.lighten(secondary, 0.1);
    const secondaryDark = Color.darken(secondary, 0.15);
    const secondarySoft = Color.softBg(secondary);
    const bgDark = Color.darken(bg, 0.03);
    const textSecondary = Color.lighten(text, 0.13);
    const textMuted = Color.lighten(text, 0.3);

    // Radius variants
    const radiusNum = parseInt(radius);
    const radiusSm = Math.round(radiusNum * 0.6) + 'px';
    const radiusLg = Math.round(radiusNum * 1.4) + 'px';
    const radiusXl = Math.round(radiusNum * 2) + 'px';

    // Glass effect
    const glassBg = glassEffect ? 'rgba(255, 255, 255, 0.55)' : 'rgba(255, 255, 255, 0.92)';
    const glassBgStrong = glassEffect ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.96)';
    const glassBorder = glassEffect ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.8)';
    const glassBlur = glassEffect ? 'blur(16px)' : 'blur(0)';
    const glassBlurHeavy = glassEffect ? 'blur(24px)' : 'blur(0)';

    return `:root {
    /* Color Palette - Generated from theme config */
    --pink-primary: ${primary};
    --pink-light: ${primaryLight};
    --pink-dark: ${primaryDark};
    --pink-soft: ${primarySoft};

    --blue-primary: ${secondary};
    --blue-light: ${secondaryLight};
    --blue-dark: ${secondaryDark};
    --blue-soft: ${secondarySoft};

    /* Neutral colors */
    --cream: ${bg};
    --cream-dark: ${bgDark};
    --text-primary: ${text};
    --text-secondary: ${textSecondary};
    --text-muted: ${textMuted};
    --white: #FFFFFF;

    /* Gradients */
    --gradient-main: linear-gradient(135deg, ${primary} 0%, ${secondary} 100%);
    --gradient-pink: linear-gradient(135deg, ${primaryLight} 0%, ${primaryDark} 100%);
    --gradient-blue: linear-gradient(135deg, ${secondaryLight} 0%, ${secondaryDark} 100%);
    --gradient-cream: linear-gradient(180deg, ${bg} 0%, ${primarySoft} 100%);

    /* Glassmorphism */
    --glass-bg: ${glassBg};
    --glass-bg-strong: ${glassBgStrong};
    --glass-border: ${glassBorder};
    --glass-blur: ${glassBlur};
    --glass-blur-heavy: ${glassBlurHeavy};

    /* Shadows - layered for depth */
    --shadow-soft: 0 4px 20px ${Color.rgba(primary, 0.12)}, 0 1px 3px rgba(0, 0, 0, 0.04);
    --shadow-cute: 0 8px 32px ${Color.rgba(secondary, 0.2)}, 0 2px 8px rgba(0, 0, 0, 0.04);
    --shadow-hover: 0 20px 50px ${Color.rgba(primaryDark, 0.22)}, 0 4px 12px rgba(0, 0, 0, 0.06);
    --shadow-glow-pink: 0 0 40px ${Color.rgba(primary, 0.25)};
    --shadow-glow-blue: 0 0 40px ${Color.rgba(secondary, 0.25)};

    /* Radius */
    --radius-sm: ${radiusSm};
    --radius-md: ${radius};
    --radius-lg: ${radiusLg};
    --radius-xl: ${radiusXl};

    /* Typography */
    --font-main: ${font};

    /* Transitions */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}`;
}

module.exports = { generateThemeCSS };
