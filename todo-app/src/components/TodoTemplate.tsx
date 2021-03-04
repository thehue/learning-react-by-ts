import React, { ReactNode } from 'react';
import './TodoTemplate.scss';

type TodoTemplateProps = {
  children: ReactNode;
};

// 화면을 가운데로 정렬, 앱타이틀(일정관리)을 보여줍니다. children으로 내부 JSX를 props로 받아와서 렌더링함
function TodoTemplate({ children }: TodoTemplateProps) {
  return (
    <div className="TodoTemplate">
      <div className="app-title">일정 관리</div>
      <div className="content">{children}</div>
    </div>
  );
}

export default TodoTemplate;
