import React from 'react';
import { Alert } from 'reactstrap';
import get from 'lodash.get';

function Error({ error, onDismiss }) {
  return (
    <Alert className="my-3" color="danger" isOpen={!!error} toggle={onDismiss}>
      <b>Error</b><br/>
      {get(error, ['graphQLErrors', 0, 'message'], get(error, ['message'], 'Unknown error'))}
    </Alert>
  );
}

export default Error;
