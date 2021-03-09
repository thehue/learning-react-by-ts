import React from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

type Article = {
  articles: [
    {
      title: string;
      description: string;
      url: string;
      urlToImage: string;
    },
  ];
};

type Props = {
  category: string;
};

function NewsList(props: Props) {
  const { category } = props;
  const [loading, response, error] = usePromise<Article>(() => {
    const query = category === 'all' ? '' : `&category=${category}`;

    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=8e4096e36aaa489fb92d6179b4f6e9c2`,
    );
  }, [category]);

  // 대기중일때
  if (loading) {
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  //아직 response 값이 설정되지 않았을 때
  if (!response) {
    return null;
  }

  if (error) {
    return <NewsListBlock>에러 발생!!</NewsListBlock>;
  }

  //값이 유효할 때
  if (!response) {
    return null;
  }

  const { articles } = response.data;

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem article={article} key={article.url} />
      ))}
    </NewsListBlock>
  );
}

export default NewsList;
