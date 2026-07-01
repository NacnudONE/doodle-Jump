# Doodle Jump

A browser-based implementation of the classic arcade game Doodle Jump built with React + TypeScript and Canvas rendering.

Браузерна реалізація класичної аркадної гри Doodle Jump на React + TypeScript з рендерингом через Canvas.

---

## About / Про гру

**EN:** The player controls a character that automatically jumps between platforms and climbs upward. The goal is to score as many points as possible without falling. Difficulty increases with height — platforms become sparser and dangerous types appear more often.

**UA:** Гравець керує персонажем, який автоматично стрибає по платформах і піднімається вгору. Мета — набрати якомога більше очок, не падаючи вниз. Рівень складності зростає з висотою: платформи стають рідшими і частіше зустрічаються небезпечні типи.

---

## Controls / Керування

- **Move**: Arrow keys ← → or A / D
- **Pause**: P or Escape
- The character wraps around screen edges

---

## Platform Types / Типи платформ

| Type | Behaviour |
|------|-----------|
| Normal | Static, always holds |
| Moving | Slides left and right |
| Breakable | Crumbles on first landing |

---

## Tech Stack / Технології

- **React 19** — UI screens (start, HUD, pause, game over)
- **TypeScript** — strict typing throughout
- **Canvas API** — game rendering (no external game engines)
- **Vite 8** — build tool & dev server
- **Oxlint** — linting

---

## Architecture / Архітектура

```
src/
├── components/           # React UI screens
│   ├── Game.tsx
│   ├── StartScreen.tsx
│   ├── HUD.tsx
│   ├── PauseScreen.tsx
│   └── GameOverScreen.tsx
├── game/                 # Pure TS game engine (no React)
│   ├── GameEngine.ts         # Main game loop
│   ├── Player.ts             # Player physics
│   ├── Platform.ts           # Platform logic
│   ├── PlatformManager.ts    # Platform generation & scrolling
│   ├── Camera.ts             # Follow camera
│   ├── CollisionDetector.ts
│   ├── InputManager.ts       # Keyboard & touch input
│   ├── AssetLoader.ts        # Sprite loading
│   ├── constants.ts          # Physics & gameplay constants
│   └── types.ts              # TypeScript types
└── hooks/
    └── useGameEngine.ts      # Hook bridging React and Canvas
```

---

## Getting Started / Запуск

```bash
npm install
npm run dev
```

Open in browser: `http://localhost:5173`

### Build / Збірка

```bash
npm run build
npm run preview
```

---

## Mobile / Мобільна підтримка

Touch controls are supported — tap the left or right side of the screen to move the character.
