import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "나쁜 감정만" },
];

const ControlMenu = ({ value, onChange, optionList }) => {
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
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("all");

  const getProcessedDiaryList = () => {
    // 1. 깊은 복사를 하기 위해 copy하기
    const copyList = JSON.parse(JSON.stringify(diaryList));

    // 2-1. filter에 따른 정렬을 하겠다
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    // 2-2. filteredList 정렬에 따른 리스트 보여주기
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    // 3-1. 정렬하기
    const sortedList = filteredList.sort(compare);

    // 3-2. 정렬하기에 따른 내용 보여주기
    const compare = (a, b) => {
      if (sortType === "lateset") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    return sortedList;
  };
  return <div></div>;
};

export default DiaryList;