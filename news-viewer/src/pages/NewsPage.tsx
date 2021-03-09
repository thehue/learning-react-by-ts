import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

type MatchParams = {
  category: string;
};

function NewsPage({ match }: RouteComponentProps<MatchParams>) {
  const category = match.params.category || 'all';
  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
}

export default NewsPage;
