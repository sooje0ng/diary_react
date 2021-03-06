import { useState, useRef } from 'react';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';
import './App.css';

// const dummyList = [
//   {
//     id: 1,
//     author: '한수정',
//     content: 'hi 1',
//     emotion: 5,
//     created_date: new Date().getTime(), //현재시간을 기준으로 생성됨. miliseconds로 변환해서 반환해줌
//   },
//   {
//     id: 2,
//     author: '홍길동',
//     content: 'hi 2',
//     emotion: 1,
//     created_date: new Date().getTime(), //현재시간을 기준으로 생성됨. miliseconds로 변환해서 반환해줌
//   },
//   {
//     id: 3,
//     author: '아무개',
//     content: 'hi 3',
//     emotion: 2,
//     created_date: new Date().getTime(), //현재시간을 기준으로 생성됨. miliseconds로 변환해서 반환해줌
//   },
// ];

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId + 1}번째 일기가 삭제되었습니다!`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map(
        (it) => (it.id === targetId ? { ...it, content: newContent } : it) // 있던 리스트의 아이디들을 순회하면서, 파라미터로 보내준 타겟아이디와 일기의 아이디가 같으면 새로운 콘텐츠로 바꿔줌.
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
