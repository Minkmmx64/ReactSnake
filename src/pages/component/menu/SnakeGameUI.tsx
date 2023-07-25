import { Menu } from "../../../common/type";
import { PlayGameUIStyle } from "./style";
import { IGameHard, ISnakeGameUI } from "./type";

const GameHard = (Props: IGameHard): JSX.Element => {
  const GameStart = (hard: Menu) => Props.onClick(hard);
  return (
    <div onClick={() => GameStart(Props.hard)} className={'PlayGameBotton'}>{Props.hard}</div>
  )
}

export const SnakeGameUI = (Props: ISnakeGameUI): JSX.Element => {
  const Hards: Menu[] = ['Slug', 'Worm', 'Python'];
  return (
    <>
      <nav style={PlayGameUIStyle.PlayGameUI}>
        <h1 style={PlayGameUIStyle.PlayGameUIH1}>Snake</h1>
        <p style={PlayGameUIStyle.PlayGameUIP}>Choose level:</p>
        <div style={PlayGameUIStyle.PlayGameBottonContext}>
          {Hards.map(hard => <GameHard onClick={Props.onPlay} hard={hard} />)}
        </div>
      </nav>
    </>
  )
}

interface GameOverUIProps {
  onClick: () => void;
}

export const GameOverUI = (GameOverUIProps:GameOverUIProps): JSX.Element => {

  return (
    <>
      <nav onClick={GameOverUIProps.onClick} style={PlayGameUIStyle.GameOverUI}>
        <p>GAME</p>
        <p>OVER!</p>
      </nav>
    </>
  )
}