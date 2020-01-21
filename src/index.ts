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

// Res type for describing HTTP response info.
type Res = {                                            // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
// Generate Res object for LMError response parameter
function gen_response(allowed: string[]):Res
{
  let response:Res = {
    statusCode: '405',
    headers: { 'Allow': allowed.join(', ') }
  };
  return response;
}

export { generator, gen_response };
