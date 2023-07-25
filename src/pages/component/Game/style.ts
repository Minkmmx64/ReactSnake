import { CSSProto } from "../../../common/type";

export const SnakePlayGroundStyle: CSSProto = {
  SnakePlayGround: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  }
}

export const SnakeCellStyle: CSSProto = {
  SnakeCellElement: {
    width: "28px",
    height: "28px",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "28px",
  }
}

export const PlaySoudStyle: CSSProto = {
  CountDown: {
    fontSize: "184px",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    userSelect: "none"
  }
}

export const SnakeBottomStatusStyle: CSSProto = {
  SnakeBottomStatus: {
    display: "flex",
    width: "100%",
    height: "55px",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6px",
    fontSize: "34px",
    padding: "0px 5px",
    textAlign: "center",
    userSelect: "none"
  }
}