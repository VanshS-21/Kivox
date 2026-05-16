const fs = require('fs');
const path = require('path');

const navPath = path.join(__dirname, '../src/components/Navigation.tsx');
let code = fs.readFileSync(navPath, 'utf8');

// 1. Add import for navigation
code = code.replace(
  'import { brand } from "@/content/brand";',
  'import { brand } from "@/content/brand";\nimport { navigation } from "@/content/navigation";'
);

// 2. Remove local navItems, heroAccent, heroAccentInk, heroForeground
const regexVariables = /const navItems = \[[\s\S]*?\];\n\nconst heroAccent = ".*?";\nconst heroAccentInk = ".*?";\nconst heroForeground = ".*?";\n/g;
code = code.replace(regexVariables, '');

// 3. Remove isHomePage, overHero, useHeroColors
code = code.replace(/  \/\/ Only the home page has the dark constellation hero\.[\s\S]*?const isHomePage = pathname === "\/";\n\n/, '');
code = code.replace(/  \/\/ Nav color states:[\s\S]*?const useHeroColors = overHero && !isOpen;\n\n/, '');

// 4. In <motion.nav ... style={{ backgroundColor: ... }}> remove backgroundColor logic
code = code.replace(
  /        style=\{\{\n          backgroundColor: useHeroColors[\s\S]*?        \}\}\n/,
  ''
);

// 5. In Logo link: remove useHeroColors logic
code = code.replace(
  /                  className={`transition-colors duration-500 group-hover:text-accent \$\{\n                    !useHeroColors \? "text-foreground" : ""\n                  \}`}\n                  style=\{\n                    useHeroColors \? \{ color: heroForeground \} : undefined\n                  \}/,
  '                  className="transition-colors duration-500 group-hover:text-accent text-foreground"'
);
code = code.replace(
  /                    variant=\{useHeroColors \? "brand" : "mono"\}/,
  '                    variant="mono"'
);

// 6. Theme toggle: remove useHeroColors
code = code.replace(
  /              <ThemeToggle\n                className=\{!useHeroColors \? "text-foreground" : ""\}\n                style=\{useHeroColors \? \{ color: heroForeground \} : undefined\}\n              \/>/,
  '              <ThemeToggle className="text-foreground" />'
);

// 7. Hamburger: hide on large screens, remove useHeroColors
code = code.replace(
  /                  className="flex flex-col gap-1\.5 p-2 rounded-lg hover:bg-accent\/10 transition-colors"/,
  '                  className="flex lg:hidden flex-col gap-1.5 p-2 rounded-lg hover:bg-accent/10 transition-colors"'
);
code = code.replace(/useHeroColors\n\s+\? heroAccent\n\s+: "var\(--fg-primary\)"/g, '"var(--fg-primary)"');
code = code.replace(/useHeroColors\n\s+\? heroForeground\n\s+: "var\(--fg-primary\)"/g, '"var(--fg-primary)"');

// 8. Desktop links to add between Logo and Right side
const desktopLinks = `
            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navigation.primary.map((item) => {
                const isActive = item.href.startsWith("/#") 
                  ? activeSection === item.href.substring(2)
                  : pathname === item.href;
                  
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={\`text-sm font-medium tracking-tight transition-colors duration-200 \${isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"}\`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
`;
code = code.replace(
  /            \{\/\* Right side — CTA, theme toggle, hamburger \*\/\}/,
  desktopLinks + '\n            {/* Right side — CTA, theme toggle, hamburger */}'
);

// 9. Update CTA text and remove hero logic
code = code.replace(
  /              \{\/\* Primary CTA \*\/\}\n              \{pathname !== "\/contact" && \([\s\S]*?Start a project\n                    <span className="text-base">→<\/span>\n                  <\/Link>\n                <\/Magnetic>\n              \)\}/,
  `              {/* Primary CTA */}
              {pathname !== "/contact" && (
                <Magnetic strength={0.15}>
                  <Link
                    href="/contact"
                    className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-accent text-accent-ink rounded-lg text-sm font-medium tracking-tight hover:scale-105 hover:shadow-amber-glow transition-all duration-200"
                  >
                    Book a Free Call
                    <span className="text-base">→</span>
                  </Link>
                </Magnetic>
              )}`
);

// 10. Update navItems.map inside hamburger to use navigation.primary.map
code = code.replace(/navItems\.map/g, 'navigation.primary.map');

fs.writeFileSync(navPath, code);
console.log('Navigation.tsx refactored successfully.');
