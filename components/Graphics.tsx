import type { ReactNode } from "react";

export type MarkName =
  | "video"
  | "calendar"
  | "clock"
  | "clinic"
  | "card"
  | "receipt"
  | "checklist"
  | "pin"
  | "document"
  | "care"
  | "compare"
  | "ok"
  | "stop";

function Frame({ tint, children }: { tint: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 320 200" role="presentation" focusable="false">
      <rect width="320" height="200" rx="28" fill={tint} />
      {children}
    </svg>
  );
}

export function Mark({ name }: { name: MarkName }) {
  return (
    <div className="graphic">
      {name === "video" && (
        <Frame tint="#d5e4f7">
          <rect x="28" y="28" width="188" height="132" rx="22" fill="#241b63" />
          <rect x="42" y="42" width="160" height="92" rx="14" fill="#3c3484" />
          <circle cx="98" cy="82" r="18" fill="#f6d0df" />
          <path d="M74 122c6-16 16-24 24-24s18 8 24 24" fill="#f6e7a4" />
          <rect x="148" y="54" width="42" height="32" rx="8" fill="#fff" />
          <circle cx="169" cy="68" r="7" fill="#c9ead6" />
          <rect x="156" y="78" width="26" height="4" rx="2" fill="#c9dcf6" />
          <rect x="78" y="146" width="88" height="8" rx="4" fill="#1a1448" />
          <rect x="232" y="48" width="64" height="84" rx="16" fill="#fff" />
          <circle cx="264" cy="78" r="14" fill="#f6d0df" />
          <rect x="246" y="100" width="36" height="6" rx="3" fill="#c9dcf6" />
          <rect x="246" y="112" width="24" height="6" rx="3" fill="#f6e7a4" />
        </Frame>
      )}
      {name === "calendar" && (
        <Frame tint="#f8efc4">
          <rect x="70" y="32" width="180" height="140" rx="22" fill="#fff" />
          <rect x="70" y="32" width="180" height="36" rx="22" fill="#241b63" />
          <rect x="70" y="52" width="180" height="16" fill="#241b63" />
          <rect x="96" y="22" width="12" height="22" rx="6" fill="#1a1448" />
          <rect x="212" y="22" width="12" height="22" rx="6" fill="#1a1448" />
          <text x="160" y="118" textAnchor="middle" fill="#241b63" fontSize="42" fontWeight="800" fontFamily="inherit">
            60
          </text>
          <text x="160" y="146" textAnchor="middle" fill="#3e4854" fontSize="14" fontWeight="700" fontFamily="inherit">
            days
          </text>
        </Frame>
      )}
      {name === "clock" && (
        <Frame tint="#f8d5e4">
          <circle cx="118" cy="100" r="62" fill="#fff" />
          <circle cx="118" cy="100" r="48" fill="#241b63" />
          <path d="M118 68v34l22 12" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          <circle cx="118" cy="102" r="4" fill="#f6e7a4" />
          <rect x="196" y="58" width="92" height="84" rx="18" fill="#fff" />
          <text x="242" y="98" textAnchor="middle" fill="#241b63" fontSize="28" fontWeight="800" fontFamily="inherit">
            14
          </text>
          <text x="242" y="120" textAnchor="middle" fill="#3e4854" fontSize="13" fontWeight="700" fontFamily="inherit">
            days
          </text>
        </Frame>
      )}
      {name === "clinic" && (
        <Frame tint="#d7f0e2">
          <rect x="78" y="78" width="164" height="86" rx="8" fill="#241b63" />
          <path d="M70 84 L160 28 L250 84" fill="#1a1448" />
          <rect x="142" y="112" width="36" height="52" rx="6" fill="#f6e7a4" />
          <rect x="96" y="100" width="28" height="22" rx="4" fill="#c9dcf6" />
          <rect x="196" y="100" width="28" height="22" rx="4" fill="#c9dcf6" />
          <rect x="148" y="46" width="24" height="24" rx="4" fill="#fff" />
          <path d="M160 52v12M154 58h12" stroke="#241b63" strokeWidth="3" strokeLinecap="round" />
        </Frame>
      )}
      {name === "card" && (
        <Frame tint="#e4dcf6">
          <rect x="36" y="48" width="248" height="112" rx="18" fill="#fff" transform="rotate(-6 160 104)" />
          <rect x="54" y="66" width="46" height="46" rx="12" fill="#241b63" transform="rotate(-6 160 104)" />
          <text x="66" y="96" fill="#fff" fontSize="16" fontWeight="800" fontFamily="inherit" transform="rotate(-6 160 104)">
            AR
          </text>
          <rect x="114" y="72" width="110" height="10" rx="5" fill="#c9dcf6" transform="rotate(-6 160 104)" />
          <rect x="114" y="90" width="78" height="10" rx="5" fill="#f6d0df" transform="rotate(-6 160 104)" />
          <rect x="54" y="124" width="170" height="10" rx="5" fill="#efe7f4" transform="rotate(-6 160 104)" />
        </Frame>
      )}
      {name === "receipt" && (
        <Frame tint="#f8efc4">
          <path d="M96 24h128l18 16v140l-16-10-16 10-16-10-16 10-16-10-16 10-16-10-16 10V40l18-16z" fill="#fff" />
          <rect x="116" y="52" width="88" height="10" rx="5" fill="#241b63" />
          <rect x="116" y="74" width="88" height="8" rx="4" fill="#efe7f4" />
          <rect x="116" y="90" width="64" height="8" rx="4" fill="#efe7f4" />
          <text x="160" y="132" textAnchor="middle" fill="#241b63" fontSize="28" fontWeight="800" fontFamily="inherit">
            $50
          </text>
        </Frame>
      )}
      {name === "checklist" && (
        <Frame tint="#d5e4f7">
          <rect x="78" y="22" width="164" height="156" rx="18" fill="#fff" />
          <rect x="138" y="12" width="44" height="18" rx="8" fill="#241b63" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row} transform={`translate(98 ${52 + row * 28})`}>
              <circle cx="10" cy="10" r="10" fill={row === 3 ? "#efe7f4" : "#241b63"} />
              {row < 3 && (
                <path d="M5 10.2 8.4 13.4 15 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              )}
              <rect x="28" y="6" width={row === 1 ? 70 : 92} height="8" rx="4" fill="#d5e4f7" />
            </g>
          ))}
        </Frame>
      )}
      {name === "pin" && (
        <Frame tint="#d7f0e2">
          <rect x="36" y="36" width="248" height="128" rx="18" fill="#fff" />
          <path d="M48 132c28-20 48-48 70-48" fill="none" stroke="#c9dcf6" strokeWidth="10" strokeLinecap="round" />
          <path d="M150 78c30 8 70 6 120 28" fill="none" stroke="#f6d0df" strokeWidth="10" strokeLinecap="round" />
          <path d="M168 46c18 18 18 40 0 62-18-22-18-44 0-62z" fill="#241b63" />
          <circle cx="168" cy="68" r="8" fill="#f6e7a4" />
        </Frame>
      )}
      {name === "document" && (
        <Frame tint="#e7eef8">
          <rect x="86" y="20" width="148" height="164" rx="16" fill="#fff" />
          <rect x="106" y="40" width="86" height="10" rx="5" fill="#241b63" />
          <rect x="106" y="60" width="108" height="8" rx="4" fill="#efe7f4" />
          <rect x="106" y="76" width="96" height="8" rx="4" fill="#efe7f4" />
          <rect x="106" y="92" width="80" height="8" rx="4" fill="#efe7f4" />
          <circle cx="196" cy="142" r="24" fill="#f6e7a4" />
          <path d="M186 142l7 7 14-16" fill="none" stroke="#241b63" strokeWidth="3" strokeLinecap="round" />
        </Frame>
      )}
      {name === "care" && (
        <Frame tint="#f8d5e4">
          <circle cx="112" cy="88" r="36" fill="#fff" />
          <circle cx="112" cy="78" r="12" fill="#f6d0df" />
          <path d="M94 108c4-12 12-16 18-16s14 4 18 16" fill="#241b63" />
          <circle cx="196" cy="96" r="40" fill="#fff" />
          <path d="M196 80c8-10 22-8 22 6 0 16-22 28-22 28s-22-12-22-28c0-14 14-16 22-6z" fill="#241b63" />
        </Frame>
      )}
      {name === "compare" && (
        <Frame tint="#e4dcf6">
          <rect x="28" y="40" width="120" height="124" rx="18" fill="#fff" />
          <rect x="172" y="28" width="124" height="140" rx="18" fill="#241b63" />
          <rect x="46" y="60" width="72" height="8" rx="4" fill="#efe7f4" />
          <rect x="46" y="78" width="56" height="8" rx="4" fill="#efe7f4" />
          <rect x="46" y="110" width="40" height="16" rx="8" fill="#f6e7a4" />
          <rect x="190" y="50" width="80" height="8" rx="4" fill="#c9dcf6" />
          <rect x="190" y="68" width="60" height="8" rx="4" fill="#fff" opacity="0.7" />
          <rect x="190" y="112" width="64" height="22" rx="11" fill="#fff" />
        </Frame>
      )}
      {name === "ok" && (
        <Frame tint="#d7f0e2">
          <circle cx="118" cy="100" r="52" fill="#fff" />
          <circle cx="118" cy="84" r="16" fill="#241b63" />
          <path d="M90 126c6-16 16-22 28-22s22 6 28 22" fill="#241b63" />
          <circle cx="214" cy="108" r="36" fill="#241b63" />
          <path d="M198 108l10 10 22-24" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </Frame>
      )}
      {name === "stop" && (
        <Frame tint="#f8d5e4">
          <circle cx="118" cy="100" r="52" fill="#fff" />
          <circle cx="118" cy="84" r="16" fill="#7a1e1e" />
          <path d="M90 126c6-16 16-22 28-22s22 6 28 22" fill="#7a1e1e" />
          <circle cx="214" cy="108" r="36" fill="#7a1e1e" />
          <path d="M200 108h28" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        </Frame>
      )}
    </div>
  );
}

export function HeroVisit() {
  return (
    <div className="graphic graphic-hero">
      <svg viewBox="0 0 440 360" role="presentation" focusable="false">
        <circle cx="340" cy="64" r="46" fill="#fff" opacity="0.55" />
        <circle cx="70" cy="300" r="36" fill="#fff" opacity="0.4" />
        <rect x="36" y="28" width="250" height="188" rx="28" fill="#241b63" />
        <rect x="52" y="44" width="218" height="140" rx="18" fill="#3c3484" />
        <circle cx="132" cy="102" r="26" fill="#f6d0df" />
        <path d="M100 150c8-20 20-30 32-30s24 10 32 30" fill="#f6e7a4" />
        <rect x="186" y="62" width="66" height="46" rx="12" fill="#fff" />
        <circle cx="210" cy="80" r="9" fill="#c9ead6" />
        <rect x="198" y="94" width="28" height="5" rx="2.5" fill="#c9dcf6" />
        <rect x="92" y="192" width="120" height="10" rx="5" fill="#1a1448" />
        <g transform="translate(210 150)">
          <rect width="168" height="108" rx="18" fill="#fff" />
          <rect x="16" y="18" width="42" height="42" rx="12" fill="#241b63" />
          <text x="26" y="45" fill="#fff" fontSize="14" fontWeight="800" fontFamily="inherit">
            AR
          </text>
          <rect x="70" y="22" width="80" height="8" rx="4" fill="#c9dcf6" />
          <rect x="70" y="38" width="58" height="8" rx="4" fill="#f6d0df" />
          <rect x="16" y="74" width="132" height="8" rx="4" fill="#efe7f4" />
          <rect x="16" y="88" width="96" height="8" rx="4" fill="#efe7f4" />
        </g>
        <rect x="48" y="248" width="18" height="40" rx="7" fill="#241b63" />
        <ellipse cx="57" cy="240" rx="24" ry="16" fill="#9ed4b4" />
        <ellipse cx="44" cy="252" rx="14" ry="10" fill="#c9ead6" />
        <g transform="translate(250 36)">
          <rect width="132" height="72" rx="20" fill="#fff" />
          <circle cx="36" cy="36" r="18" fill="#241b63" />
          <path d="M36 24v14l10 6" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <text x="64" y="34" fill="#241b63" fontSize="13" fontWeight="800" fontFamily="inherit">
            Video
          </text>
          <text x="64" y="52" fill="#3e4854" fontSize="12" fontWeight="700" fontFamily="inherit">
            visit
          </text>
        </g>
      </svg>
    </div>
  );
}

export function CheckIcon() {
  return (
    <svg className="check-icon" viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="currentColor" opacity="0.18" />
      <path d="M6 10.2 8.7 12.8 14 7.4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function mastMark(page: { path: string; pageType: string }): MarkName {
  if (page.path === "/pricing/") return "receipt";
  if (page.path === "/how-it-works/") return "video";
  if (page.path === "/eligibility/" || page.path === "/tools/do-i-qualify/") return "checklist";
  if (page.path === "/new-patients/") return "clinic";
  if (page.pageType === "City page" || page.pageType === "Cities hub") return "pin";
  if (page.pageType === "Tool" || page.pageType === "Tools hub") return "checklist";
  if (page.pageType.includes("Condition") || page.path.startsWith("/conditions")) return "care";
  if (page.pageType === "Compare page" || page.pageType === "Compare hub") return "compare";
  if (page.path === "/faq/" || page.pageType === "FAQ page") return "checklist";
  return "document";
}
