import { useState } from "react";
import { CSSProto, Menu } from "../common/type";
import { SnakePlayGround } from "./component/Game/SnakePlayGround";
import { GameObject } from "./component/Game/type";
import { SnakeGameUI } from "./component/menu/SnakeGameUI";

const SnakeSceneStyle: CSSProto = {
  MainScene: {
    width: "100%",
    height: "100vh"
  },
  FrameWork: {
    position: "absolute",
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
    width: "596px",
    height: "428px",
    border: "4px solid rgb(39, 47, 23)",
    boxSizing: "border-box"
  },
  GameContent: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
}

/** 游戏页面入口 */
export const SnakeScene = (): JSX.Element => {
  const [start, setStart] = useState(false);
  const [gB, setGB] = useState<GameObject>();
  const GB = {} as unknown as GameObject;
  const GameOnPlay = (hard: Menu) => {
    GB.hard = hard;
    setGB(GB);
    setStart(true);
  }
  const onExits = () => {
    console.log("EXITS");
    setStart(false);
  }
  const Go = () => {
    window.location.href = "./todolist.html"
  }

  return (
    <>
      <div className={"GoHere"} onClick={Go}>Go Here</div>
      <div style={SnakeSceneStyle.MainScene} id="MainScene">
        <div style={SnakeSceneStyle.FrameWork} id="FrameWork">
          <div style={SnakeSceneStyle.GameContent} id="GameContent">
            {/**GameMenu*/}
            {!start ? <SnakeGameUI onPlay={GameOnPlay} /> : <></>}
            {/**GameMainScene*/}
            {<SnakePlayGround onExits={onExits} GameObject={gB!} star={start} />}
          </div>
        </div>
      </div>
    </>
  );
}