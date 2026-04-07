(function() {
    window.WebFontConfig = window.WebFontConfig || {};
    const cfg = window.WebFontConfig;
    cfg.active = cfg.active || function() {
        console.log("All fonts loaded.");
    };
    cfg.inactive = cfg.inactive || function() {
        console.log("Fonts failed to load.");
    };
    cfg.fontactive = cfg.fontactive || function(name, weight) {
        console.log("Font active:", name, "weight:", weight);
    };
    cfg.families = cfg.families || [{
        name: 'Asap',
        weight: 400,
        file: 'fonts/KFO9CniXp96a4Tc2DaTeuDAoKsE615hGW36MAA.woff2',
        unicode: 'vietnamese'
    }, {
        name: 'Asap',
        weight: 400,
        file: 'fonts/KFO9CniXp96a4Tc2DaTeuDAoKsE615hHW36MAA.woff2',
        unicode: 'latin-ext'
    }, {
        name: 'Asap',
        weight: 400,
        file: 'fonts/KFO9CniXp96a4Tc2DaTeuDAoKsE615hJW34.woff2',
        unicode: 'latin'
    }, {
        name: 'Asap',
        weight: 700,
        file: 'fonts/KFO9CniXp96a4Tc2DaTeuDAoKsE615hGW36MAA.woff2',
        unicode: 'vietnamese'
    }, {
        name: 'Asap',
        weight: 700,
        file: 'fonts/KFO9CniXp96a4Tc2DaTeuDAoKsE615hHW36MAA.woff2',
        unicode: 'latin-ext'
    }, {
        name: 'Asap',
        weight: 700,
        file: 'fonts/KFO9CniXp96a4Tc2DaTeuDAoKsE615hJW34.woff2',
        unicode: 'latin'
    }];
    let loadedFonts = 0;

    function checkAllFonts() {
        if (loadedFonts === cfg.families.length) cfg.active();
    }
    const style = document.createElement('style');
    document.head.appendChild(style);
    cfg.families.forEach(font => {
        const rule = `
            @font-face {
                font-family: '${font.name}';
                font-style: normal;
                font-weight: ${font.weight};
                font-stretch: 100%;
                src: url('${font.file}') format('woff2');
            }
        `;
        style.sheet.insertRule(rule, style.sheet.cssRules.length);
        if (document.fonts && window.FontFace) {
            const f = new FontFace(font.name, `url(${font.file})`, {
                weight: font.weight
            });
            f.load().then(() => {
                document.fonts.add(f);
                loadedFonts++;
                cfg.fontactive(font.name, font.weight);
                checkAllFonts();
            }).catch(() => {
                console.warn("Failed to load font:", font.name, font.weight);
                loadedFonts++;
                checkAllFonts();
            });
        } else {
            loadedFonts++;
            cfg.fontactive(font.name, font.weight);
            checkAllFonts();
        }
    });
})();