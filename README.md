# all_handler-function

A Node.js and Express.js handler function for rejecting non-allowed-HTTP-methods.

## Donation

By me a coffee [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Installation

`npm install @leismore/all_handler`

## Example

```typescript
import * as express                from 'express';
import { generator, gen_response } from '@leismore/all_handler';
import { LMError }                 from '@leismore/lmerror';

let ALLOWED = ['GET', 'POST'];
let error   = new LMError(
  { message:"HTTP 405: Method Not Allowed", code:"405" },
  gen_response(ALLOWED)
);

let all_handler = generator(ALLOWED, error);

let app  = express();
let port = 3000;

app.all('/', all_handler);
app.get('/', (req, res) => res.send('Hello World!'));

app.listen( port, () => console.log(`Example app listening on port ${port}!`) );
```

## API

### The Function Generator

```typescript
/**
 * Generate a non-allowed-HTTP-methods handler function.
 * @param  allowed HTTP methods names
 * @param  error   LMError (or sub-class) instance
 */
function generator(allowed: string[], error: LMError):
  (req:express.Request, _res:express.Response, next:express.NextFunction) => void
```

* LMError = [@leismore/lmerror](https://www.npmjs.com/package/@leismore/lmerror) (NPM)

### The Non-Allowed-HTTP-Methods Handler

```typescript
/**
 * Test HTTP request methods, if allowed, pass to its handlers
 * else
 *   pass a HTTP 405 error to error handlers.
 */
function all_handler(req:express.Request, _res:express.Response, next:express.NextFunction): void
```

### gen_response

```typescript
/**
 * Generate Res object for LMError response parameter
 * @param  allowed  HTTP methods names
 */
function gen_response(allowed: string[]):Res

// Res type for describing HTTP response info.
type Res = {                                            // HTTP response
  readonly statusCode:  string,                         // HTTP response status code
           headers?:   {readonly [key:string]: string}, // HTTP headers
           body?:       any                             // HTTP body
};
```

## License

MIT

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial at Jan 20, 2020)
