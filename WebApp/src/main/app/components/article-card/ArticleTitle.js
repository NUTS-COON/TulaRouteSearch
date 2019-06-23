import React from 'react';

export function ArticleTitle({children}) {
  return (
    <h2 className="article-card__title">
      {children}
    </h2>
  );
}