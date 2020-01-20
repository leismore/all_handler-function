/**
 * A Node.js & Express.js handler function for rejecting non-allowed-HTTP-methods.
 */

import * as express from 'express';
import { LMError }  from '@leismore/lmerror';

function generator(allowed: string[], error: LMError):
  (req:express.Request, _res:express.Response, next:express.NextFunction) => void
{
  function all_handler(req:express.Request, _res:express.Response, next:express.NextFunction):void
  {
    if (allowed.includes( req.method.toUpperCase() ) === false)
    {
      next( error );
      return;
    }
    else
    {
      next('route');
      return;
    }
  }

  return all_handler;
}

export { generator };
