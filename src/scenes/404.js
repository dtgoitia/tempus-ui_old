import React from 'react';
import { useHistory, Link } from 'react-router-dom';

export default function UrlNotFound() {
  const history = useHistory();

  return (
    <div>
      <h1>Oops, it seems there is nothing here... :P</h1>
      <p>
        <span aria-label="thinking-face" role="img">🤔</span>
      </p>
      <p>
        Should we go back?
      </p>
      <p>
        <Link onClick={() => history.goBack()}>Go back</Link>
      </p>
    </div>
  );
}
