import React from 'react';

type MyComponentProps = {
  name?: string;
  children?: string;
  favoriteNumber: number;
};

const MyComponent = ({ name, children, favoriteNumber }: MyComponentProps) => {
  return (
    <div>
      안녕하세요, 제 이름은 {name}입니다. <br />
      children값은 {children} 입니다.
      <br />
      제가 가장 좋아하는 숫자는 {favoriteNumber}입니다.
    </div>
  );
};

MyComponent.defaultProps = {
  name: '기본이름',
};

export default MyComponent;
