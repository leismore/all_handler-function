import express = require('express');
import { LMResponse as Resp, LMResponseData as RespData } from '@leismore/response';
import { all_handler_generator     as generator,
  all_handler_LMErrorRes_generator as gen_response, ExpressRoutingHandler } from '../src/index';
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
