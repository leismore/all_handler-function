/**
 * A Node.js & Express.js handler function for rejecting non-allowed-HTTP-methods.
 */

import express = require('express');
import { LMError, LMErrorRes }  from '@leismore/lmerror';

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

// Generate LMErrorRes object for LMError
function gen_response(allowed: string[]):LMErrorRes
{
  for (const k in allowed)
  {
    allowed[k] = allowed[k].toUpperCase();
  }

  let response:LMErrorRes = {
    statusCode: '405',
    headers: { 'Allow': allowed.join(', ') }
  };
  return response;
}

export {
  generator    as all_handler_generator,
  gen_response as all_handler_LMErrorRes_generator,
  ExpressRoutingHandler,
  LMErrorRes
};
