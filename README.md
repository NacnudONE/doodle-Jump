# Doodle Jump

<p>
  <a href="#english">🇬🇧 English</a> | <a href="#українська">🇺🇦 Українська</a>
</p>

---

## English

A browser-based implementation of the classic arcade game Doodle Jump built with React + TypeScript and Canvas rendering.

### About

The player controls a character that automatically jumps between platforms and climbs upward. The goal is to score as many points as possible without falling. Difficulty increases with height — platforms become sparser and dangerous types appear more often.

### Controls

- **Move**: Arrow keys ← → or A / D
- **Pause**: P or Escape
- The character wraps around screen edges

### Platform Types

| Type | Behaviour |
|------|-----------|
| Normal | Static, always holds |
| Moving | Slides left and right |
| Breakable | Crumbles on first landing |

### Tech Stack

- **React 19** — UI screens (start, HUD, pause, game over)
- **TypeScript** — strict typing throughout
- **Canvas API** — game rendering (no external game engines)
- **Vite 8** — build tool & dev server
- **Oxlint** — linting

### Architecture

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

### Getting Started

```bash
npm install
npm run dev
```

Open in browser: `http://localhost:5173`

```bash
npm run build
npm run preview
```

### Mobile

Touch controls are supported — tap the left or right side of the screen to move the character.

---

## Українська

Браузерна реалізація класичної аркадної гри Doodle Jump на React + TypeScript з рендерингом через Canvas.

### Про гру

Гравець керує персонажем, який автоматично стрибає по платформах і піднімається вгору. Мета — набрати якомога більше очок, не падаючи вниз. Рівень складності зростає з висотою: платформи стають рідшими і частіше зустрічаються небезпечні типи.

### Керування

- **Рух**: стрілки ← → або A / D
- **Пауза**: клавіша P або Escape
- Персонаж проходить крізь краї екрану

### Типи платформ

| Тип | Поведінка |
|-----|-----------|
| Звичайна | Статична, завжди тримає |
| Рухома | Рухається ліворуч-праворуч |
| Крихка | Руйнується після першого приземлення |

### Технології

- **React 19** — UI (стартовий екран, HUD, пауза, гейм-овер)
- **TypeScript** — строга типізація всієї ігрової логіки
- **Canvas API** — ігровий рендеринг (без зовнішніх ігрових рушіїв)
- **Vite 8** — збірка та dev-сервер
- **Oxlint** — лінтинг

### Архітектура

```
src/
├── components/           # React-компоненти (екрани, HUD)
│   ├── Game.tsx
│   ├── StartScreen.tsx
│   ├── HUD.tsx
│   ├── PauseScreen.tsx
│   └── GameOverScreen.tsx
├── game/                 # Ігровий рушій (чистий TS, без React)
│   ├── GameEngine.ts         # Головний цикл гри
│   ├── Player.ts             # Фізика гравця
│   ├── Platform.ts           # Логіка платформ
│   ├── PlatformManager.ts    # Генерація та скролінг платформ
│   ├── Camera.ts             # Камера зі слідкуванням
│   ├── CollisionDetector.ts
│   ├── InputManager.ts       # Клавіатура та тач
│   ├── AssetLoader.ts        # Завантаження спрайтів
│   ├── constants.ts          # Константи фізики та геймплею
│   └── types.ts              # TypeScript-типи
└── hooks/
    └── useGameEngine.ts      # Хук для зв'язку React з Canvas
```

### Запуск

```bash
npm install
npm run dev
```

Відкрити у браузері: `http://localhost:5173`

```bash
npm run build
npm run preview
```

### Мобільна підтримка

Гра підтримує сенсорне керування — натисни на ліву або праву частину екрану, щоб рухати персонажа.
