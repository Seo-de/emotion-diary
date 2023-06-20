import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";

const Home = () => {
  // DiaryStateContext 를 App.js에서 값을 받아온거.
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  // 현재 년, 월
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  useEffect(() => {
    // 이게 다이어리가 비어있는 경우에는 실행되지 않아도 되니까
    // 조건문을 통해서 실행되도록 해줌.
    if (diaryList.length >= 1) {
      // 해당 월의 1일
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      // 해당 월의 마지막 날
      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        // 해당 월의 1일과 마지막 날 사이의 값만 출력되게 함.
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    } else {
      setData([]);
    }
  }, [diaryList, curDate]);

  // 월을 하나씩 늘리기
  // new Date()로 년, 월, 일을 보내줌
  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  // 월을 하나씩 줄이기
  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
