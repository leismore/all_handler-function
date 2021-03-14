# all_handler-function

A Node.js and Express.js handler function for rejecting non-allowed-HTTP-methods.

## Donation

By me a coffee [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Installation

`npm install @leismore/all_handler`

## Test

`npm test`

## Example

```typescript
import express = require('express');
import { LMResponse as Resp, LMResponseData as RespData } from '@leismore/response';
import { all_handler_generator            as generator,
         all_handler_LMErrorRes_generator as gen_response,
         ExpressRoutingHandler } from '@leismore/all_handler';
import { LMError } from '@leismore/lmerror';

const app  = express();
const port = 8080;

const ALLOWED = ['head', 'get', 'POST'];
const error405 = new LMError(
    { message:"HTTP 405: Method Not Allowed", code:"405" },
    gen_response(ALLOWED)
);

const all_handler:ExpressRoutingHandler = generator(ALLOWED, error405);

const get_handler:ExpressRoutingHandler = (req:express.Request, res:express.Response, next:express.NextFunction) => {
    const resp = new Resp(res);
    let data:RespData = {statusCode: '200', headers: {'Content-Type': 'application/json'}, body: {'result': 'OK'}};
    resp.send(data);
};

const post_handler:ExpressRoutingHandler = get_handler;

app.all('/', all_handler);
app.get ( '/', get_handler  );
app.post( '/', post_handler );

app.listen(port, () => {
  console.log(`@leismore/all_handler testing server, listening at http://localhost:${port}`);
});
```

* [@leismore/response](https://www.npmjs.com/package/@leismore/response)
* [@leismore/lmerror](https://www.npmjs.com/package/@leismore/lmerror)

## API

### Types

```typescript
type ExpressRoutingHandler = (req:express.Request, res:express.Response, next:express.NextFunction) => void;

type LMErrorRes = {
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
```

* [@leismore/lmerror](https://www.npmjs.com/package/@leismore/lmerror)

### Function: all_handler_generator

```typescript
/**
 * Generate a non-allowed-HTTP-methods handler function.
 * @param  allowed HTTP methods names
 * @param  error   LMError (or sub-class) instance
 */
function all_handler_generator(allowed: string[], error: LMError):ExpressRoutingHandler
```

* LMError = [@leismore/lmerror](https://www.npmjs.com/package/@leismore/lmerror) (NPM)

### Function: all_handler

```typescript
/**
 * Test HTTP request methods, if allowed, pass to its handlers
 * else
 *   pass a LMError to the next error handler.
 */
function all_handler(req:express.Request, res:express.Response, next:express.NextFunction): void
```

### Function: all_handler_LMErrorRes_generator

```typescript
/**
 * Generate a LMErrorRes object for LMError
 * @param  allowed  HTTP methods names
 */
function all_handler_LMErrorRes_generator(allowed: string[]):LMErrorRes
```

## License

GNU Affero General Public License v3.0

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial at Jan 20, 2020)
