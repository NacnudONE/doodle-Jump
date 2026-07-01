interface StartScreenProps {
  onStart: () => void;
  isLoaded: boolean;
  isError: boolean;
}

const StartScreen = ({ onStart, isLoaded, isError }: StartScreenProps) => (
  <div className="game-overlay">
    <h1 className="overlay-title">Doodle Jump</h1>
    <p className="overlay-hint">← → або A D для руху</p>
    <p className="overlay-hint">Пробіл — пауза</p>
    {isError ? (
      <p className="overlay-hint">Помилка завантаження ресурсів. Оновіть сторінку.</p>
    ) : (
      <button className="overlay-btn" onClick={onStart} disabled={!isLoaded}>
        {isLoaded ? 'Грати' : 'Завантаження...'}
      </button>
    )}
  </div>
);

export default StartScreen;
