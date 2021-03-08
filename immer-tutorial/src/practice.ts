import produce from 'immer';

const originalState = [
  {
    id: 1,
    todo: '전개 연산자와 배열 내장함수로 불변성 유지하기',
    checked: false,
  },
  {
    id: 2,
    todo: 'immer로 불변성 유지하기',
    checked: false,
  },
];

const nextState = produce(originalState, (draft) => {
  const todo = draft.find((t) => t.id === 2);
  if (todo) {
    todo.checked = true;

    // 배열에 새로운 데이터 추가
    draft.push({
      id: 3,
      todo: '일정 관리앱에 immer 적용하기',
      checked: false,
    });

    // id 1인 항목 제거하기
    draft.splice(
      draft.findIndex((t) => t.id === 1),
      1
    );
  }
});
