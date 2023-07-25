import {
  useEffect,
  useState,
  createRef,
  useMemo,
} from "react";
import {
  Direct,
  InitBodyParse,
  Level,
  Movebehave,
  Speed,
  point
} from "../../../common/utils";
import {
  PlaySoudStyle,
  SnakeBottomStatusStyle,
  SnakeCellStyle,
  SnakePlayGroundStyle
} from "./style";
import {
  IPlaySoud,
  ISnakePlayGround,
  Point,
  SnakeCellProp
} from "./type";
import { Sound } from "../../../common/Sound";
import { Menu, MoveDirectType } from "../../../common/type";
import { GameOverUI } from "../menu/SnakeGameUI";

export const SnakePlayGround = (GameProps: ISnakePlayGround): JSX.Element => {
  const [SnakeBodyCell, setSnakeBodyCell] = useState(createRef<HTMLDivElement>());   //snake cell
  const [IsPlaySoud, setIsPlaySoud] = useState(false);                               //play sound
  const [CountDown, setCountDown] = useState(0);                                     //countwdown
  const [CurrentGrade, setCurrentGrade] = useState(0);                               //current Grade
  const [GameOver, setGameOver] = useState(false);                                   //body-CD
  const [GamePlay, setGamePlay] = useState<NodeJS.Timer | null>(null);               //Game loop
  const [SnakeBodyParse, setSnakeBodyParse] = useState<Point[]>([...InitBodyParse]); //snake body parse
  const [Food, setFood] = useState<Point>();                                         //snake food rand
  const [GameStop, setGameStop] = useState(false);                                   //game stop
  const [GameHistory,setGameHistory] = useState(0);                                  //history grid
  const Sleep = (second: number) => new Promise((resolve) => setTimeout(resolve, second * 1000));
  const countDownFunc = async () => {
    for (const i of [3, 2, 1, 0]) {
      setCountDown(i);
      i !== 0 ? Sound.low?.play() : Sound.high?.play()
      await Sleep(0.5);
    }
    setIsPlaySoud(false);
    setMoveDirection(Direct.RIGHT);
    setGameIsPlay("1");
    setGamePlay(setInterval(GameFunctionLoop, Level[GameProps.GameObject.hard] * Speed));
    document.addEventListener("keydown", listenerKeyDown);
  }

  const SwitchDirection = (): Point => {                              //per loop listener keydown
    const head = SnakeBodyParse[SnakeBodyParse.length - 1];
    const next: Point = { x: 0, y: 0 };
    const getMove = localStorage.getItem("moveDirection") as string;  //top 1 down 2 left 3 right 4
    switch (parseInt(getMove)) {
      case Direct.TOP: {
        next.x = head.x - 1;
        next.y = head.y;
        break;
      }
      case Direct.DOWN: {
        next.x = head.x + 1;
        next.y = head.y;
        break;
      }
      case Direct.LEFT: {
        next.x = head.x;
        next.y = head.y - 1;
        break;
      }
      case Direct.RIGHT: {
        next.x = head.x;
        next.y = head.y + 1;
        break;
      }
    }
    return next;
  }

  const FoodFactory = (): Point => {
    let x, y;
    do {
      x = Math.floor(Math.random() * 15 + 1);
      y = Math.floor(Math.random() * 21 + 1);
    } while (SnakeBodyParse.includes({ x, y }));
    return { x, y };
  }

  const setMoveDirection = (mov: MoveDirectType) => localStorage.setItem("moveDirection", mov.toString());
  const setGameIsPlay = (IsPlay: "0" | "1") => localStorage.setItem("GameIsPlay", IsPlay);
  const setHistoryPoint = (hard:Menu, grid: number) => {
    const point = localStorage.getItem(GameProps.GameObject.hard);
    if(point){
      const G = parseInt(point);
      if(grid > G)localStorage.setItem(hard,grid.toString());
    }else
      localStorage.setItem(hard,grid.toString());
  };

  const GameInitialize = () => {
    console.log("GameInitialize");
    setSnakeBodyParse([...InitBodyParse]);
    setGameOver(false);
    setIsPlaySoud(true);
    setCurrentGrade(0);
    setFood(FoodFactory());
    countDownFunc();
    setMoveDirection(4);
    setGameIsPlay("1");
    const point = localStorage.getItem(GameProps.GameObject.hard);
    if(point == null){
      setGameHistory(0);
    }else{
      const grid = parseInt(point);
      setGameHistory(grid);
    }
  }

  const JudgeSnakeBodyCollisionDetection = (next: Point): Promise<Boolean> => {
    return new Promise(resolve => {
      if ((next.x > 15 || next.x < 1) || (next.y > 21 || next.y < 1)) resolve(true);
      else {
        for (let i = 0; i < SnakeBodyParse.length; i++)
          if (SnakeBodyParse[i].x === next.x && SnakeBodyParse[i].y === next.y) resolve(true);
        resolve(false);
      }
    })
  }

  const JudgeFoodCollisionDetection = () => {
    const { x, y } = SnakeBodyParse[SnakeBodyParse.length - 1];
    if (Food && x === Food.x && y === Food.y) {
      SnakeBodyCell.current!.children[(x - 1) * 21 + (y - 1)].classList.remove("SnakeFood");
      setCurrentGrade(CurrentGrade + point[GameProps.GameObject.hard]);
      const { x: Tx, y: Ty } = SnakeBodyParse[0];
      const body = SnakeBodyParse;
      if (Tx < x) {
        body.unshift({ x: Tx - 1, y });
      } else if (Tx > x) {
        body.unshift({ x: Tx + 1, y });
      } else if (Ty === y) {
        if (Tx < x)
          body.unshift({ x: Tx - 1, y });
        else body.unshift({ x: Tx + 1, y });
      } else if (Tx === x) {
        if (Ty < y)
          body.unshift({ x: Tx, y: y - 1 });
        else body.unshift({ x: Tx, y: y + 1 });
      }
      setFood(FoodFactory());
    }
  }

  const GameFunctionLoop = async () => {                                                    //game loop
    const isPlay = localStorage.getItem("GameIsPlay");
    if (isPlay === "1") {
      const { x, y } = SnakeBodyParse[0];
      const { x: fx, y: fy } = Food!;
      const body = SnakeBodyParse;
      const next = SwitchDirection();
      SnakeBodyCell.current!.children[(fx - 1) * 21 + (fy - 1)].classList.add("SnakeFood");
      JudgeFoodCollisionDetection();
      await JudgeSnakeBodyCollisionDetection(next).then(Type => {
        if (Type) {
          Sound.die?.play()
          setGameOver(true);
        } else {
          SnakeBodyCell.current!.children[(x - 1) * 21 + (y - 1)].classList.remove("ChooseBody");
          body.push(next);
          body.shift();
          setSnakeBodyParse([...body]);
          SnakeBodyParse.map(e => {
            SnakeBodyCell.current!.children[(e.x - 1) * 21 + (e.y - 1)].classList.add("ChooseBody");
          })
        }
      });
    }
  }
  
  const listenerKeyDown = (e: KeyboardEvent) => {
    const MoveType = e.key;
    const getMove = localStorage.getItem("moveDirection") as string;
    const moveDirections = parseInt(getMove);
    switch (MoveType) {
      case Movebehave.TOP: {
        if (moveDirections !== Direct.DOWN) setMoveDirection(Direct.TOP);
        break;
      }
      case Movebehave.LEFT: {
        if (moveDirections !== Direct.RIGHT) setMoveDirection(Direct.LEFT);
        break;
      }
      case Movebehave.DOWN: {
        if (moveDirections !== Direct.TOP) setMoveDirection(Direct.DOWN);
        break;
      }
      case Movebehave.RIGHT: {
        if (moveDirections !== Direct.LEFT) setMoveDirection(Direct.RIGHT);
        break;
      }
      case Movebehave.SPACE: {
        const isPlay = localStorage.getItem("GameIsPlay");
        if (isPlay === "1") {
          setGameIsPlay("0");
          setGameStop(true);
        } else {
          setGameIsPlay("1");
          setGameStop(false);
        }
        break;
      }
    }
  };

  useEffect(() => {
    if (SnakeBodyCell.current === null)
      setSnakeBodyCell(SnakeBodyCell);
  }, [SnakeBodyCell]);

  useEffect(() => {
    if (GameOver && GamePlay) {
      clearInterval(GamePlay);
      SnakeBodyCell.current?.classList.add("opt");
      console.log("OVER");
      console.log('curhard = ' + GameProps.GameObject.hard, 'curGrid = ' + CurrentGrade);
      setHistoryPoint(GameProps.GameObject.hard,CurrentGrade);
      document.removeEventListener("keydown", listenerKeyDown);
    }
  }, [GameOver]);

  useEffect(() => {
    if (!GameOver && GameProps.star) {
      if (GameStop) {
        SnakeBodyCell.current?.classList.add("opt");
      } else SnakeBodyCell.current?.classList.remove("opt");
    }
  }, [GameStop, GameOver, GameProps.star]);

  useEffect(() => {
    if (GamePlay && !IsPlaySoud) {
      clearInterval(GamePlay)
      setGamePlay(setInterval(GameFunctionLoop, Level[GameProps.GameObject.hard] * Speed));
    }
  }, [SnakeBodyParse, IsPlaySoud]);

  useEffect(() => {
    if (GameProps.star) GameInitialize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [GameProps.star]);

  const SnakeCell = (Prop: SnakeCellProp): JSX.Element => {
    const judge = (x: Number, y: Number): Boolean => (x === 5 && (y === 3 || y === 19) && !Prop.star);
    return (
      <div>
        <div style={SnakeCellStyle.SnakeCellElement} className={(judge(Prop.Point.x, Prop.Point.y) ? " SnakeCellElement" : "")} />
      </div>
    );
  }

  const PlaySoud = (Props: IPlaySoud): JSX.Element => {
    const num = Props.num === 0 ? "GO" : Props.num.toString();
    return (<div style={PlaySoudStyle.CountDown}>{num}!</div>)
  }

  const SnakeBodyCellJSX = useMemo((): JSX.Element[] => {
    const res = [] as JSX.Element[];
    for (let i = 1; i <= 15; i++)
      for (let j = 1; j <= 21; j++)
        res.push(
          <SnakeCell star={GameProps.star} Point={{ x: i, y: j }} >
            <span>{i}</span>
          </SnakeCell>)
    return res;
  }, [GameProps.star]);

  const GameReStart = () => {
    setGameOver(false);
    GameProps.onExits();
    SnakeBodyCell.current?.classList.remove("opt");
  }

  const SnakeBottomStatus = (): JSX.Element => {
    return (
      <>
        <div style={SnakeBottomStatusStyle.SnakeBottomStatus}>
          <span>{CurrentGrade}</span>
          {GameOver ? <span className={"SnakeBottomStatus"}>SHARE!</span> : <></>}
          <span>{GameProps.GameObject.hard + " " + GameHistory.toString()}</span>
        </div>
      </>
    )
  }
  return (
    <>
      <div>
        <div ref={SnakeBodyCell} style={SnakePlayGroundStyle.SnakePlayGround} className="SnakePlayGround"> {SnakeBodyCellJSX} </div>
        {IsPlaySoud ? <PlaySoud num={CountDown} /> : <></>}
        {GameProps.star ? <SnakeBottomStatus /> : <></>}
        {GameOver ? <GameOverUI onClick={() => GameReStart()} /> : <></>}
      </div>
    </>
  )
}
