export const getStringDate = (date) => {
  // toISOString => date를 Date객체를 받아서 ISO형식의 문자열 반환
  //YYYY-MM-DDTHH:mm:ss.sssZ로 반환되기 때문에 0부터 9번 인덱스까지만 자름

  return date.toSISOString().slice(0, 10);
};
