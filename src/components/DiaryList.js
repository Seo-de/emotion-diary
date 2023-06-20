import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

// 날짜 기준 정렬 옵션 리스트
const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

// 감정 필터 옵션 리스트
const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

// select - option 코드
// option에 들어갈 값은 optionList에서 꺼내서 넣는 식.
const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

// 옵션 리스트의 값이 변하는 onChange가 일어나면
// onChange의 값이 DiaryList로 가게 된다
const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  // 정렬 기준 - 최신순, 오래된 순
  const [sortType, setSortType] = useState("latest");
  // 정렬 기준 - 전부다, 좋은 감정만, 안좋은 감정만
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    // filtering을 할 수 있는 함수
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // 값을 비교하는 비교함수
    // latest라면 가장 최신 값이 앞에 와야 하기 때문에
    const compare = (a, b) => {
      if (sortType === "latest") {
        // paseInt를 해주는 이유는 여기에 문자열이 올 수도 있기 때문.
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    // copyList를 해주는 이유는
    // 그냥 diaryList.sort를 해주게 되면 얕은 복사가 일어나서
    // 값 비교가 되지 않는데
    // 그래서 카피해서 JSON.parse(JSON.stringify(diaryList)) 해준거래.
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 필터 조건 별 반환 할 리스트 관련 삼항연산자
    // filterCallBack에 it을 전달했을 때
    // retrun true 인 애들만 반환해라
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    // 정렬하기
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          {/* 날짜 기준 정렬 */}
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          {/* 감정 기준 정렬 */}
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {/* 정렬한 값들을 DiaryItem에 줘서 리스트를 불러옴...? */}
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
