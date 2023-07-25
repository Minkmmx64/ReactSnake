import { CSSProto } from "../../../common/type";

export const PlayGameUIStyle: CSSProto = {
  PlayGameUIH1: {
    fontSize: "144px",
    margin: "54px 0 6px 16px",
    fontWeight: "normal",
    textTransform: "lowercase",
    pointerEvents: "none"
  },
  PlayGameUI: {
    position: "absolute",
    top: "0px",
    left: "0px",
    width: "100%",
    textAlign: "center",
    userSelect: "none"
  },
  PlayGameUIP: {
    fontSize: "34px",
    textTransform: "uppercase",
    pointerEvents: "none",
    verticalAlign: "baseline"
  },
  PlayGameBottonContext: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center"
  },
  GameOverUI: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    fontSize: "120px",
    textAlign: "center",
    userSelect: "none",
    lineHeight: "0",
    width: "100%",
    height: "100%",
    paddingTop: "50px",
    boxSizing: "border-box",
    cursor:"pointer"
  }
}