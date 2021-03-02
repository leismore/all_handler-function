/**
 * A Node.js & Express.js handler function for rejecting non-allowed-HTTP-methods.
 */

import express = require('express');
import { LMError, Res }  from '@leismore/lmerror';

type ExpressRoutingHandler = (req:express.Request, res:express.Response, next:express.NextFunction) => void;

function generator(allowed: string[], error: LMError): ExpressRoutingHandler
{
  for (const k in allowed)
  {
    allowed[k] = allowed[k].toUpperCase();
  }

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

// Generate Res object for LMError response parameter
function gen_response(allowed: string[]):Res
{
  for (const k in allowed)
  {
    allowed[k] = allowed[k].toUpperCase();
  }

  let response:Res = {
    statusCode: '405',
    headers: { 'Allow': allowed.join(', ') }
  };
  return response;
}

export { generator, gen_response, ExpressRoutingHandler, Res as LMErrorRes };
