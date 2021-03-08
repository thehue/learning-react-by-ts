import React from 'react';
import qs from 'qs';
import { RouteComponentProps } from 'react-router';

function About({ location }: RouteComponentProps) {
  // ignoreQeuryPrefix: 문자열 맨 앞의 ?를 생략
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  const showDetail = query.detail === 'true';

  return (
    <div>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습해 보는 예제 프로젝트입니다.</p>
      {showDetail && (
        <p style={{ color: 'red' }}>detail 값을 true로 설정하셨군요!</p>
      )}
    </div>
  );
}

export default About;
