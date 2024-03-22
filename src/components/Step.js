import React from 'react';
import clsx from 'clsx';

export default function Step({ step, title, isDone }) {
  return (
    <>
      <a href="#" className={clsx('pf-steps__item', isDone ? 'pf-steps__item--done' : '')}>
        <div className="pf-steps__item__inner">
          <span className="pf-steps__item__step">{step}</span>
          <span className="pf-steps__item__title">{title}</span>
        </div>
      </a>
    </>
  );
}
