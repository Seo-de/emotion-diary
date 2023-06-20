import React from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  // 2023.06.19 이런식으로 나오게 해주는 부분.
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  // 페이지 이동할 수 있게 주소 바꿔주는거
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };

  const goEdit = () => {
    navigate(`/edit/${id}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`} />
      </div>
      {/* 상세보기랑 수정하기 둘 다 onClick 함수로 이동을 시켜줘야 함.
          그래서 goDetail, goEdit 함수를 만들어서
          navigate로 페이지 이동 시켜주도록 함. */}
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">{strDate}</div>
        {/* content가 너무 길 경우 자르도록 함. */}
        <div className="diary_content_preview">{content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
