import { OpenAPIHono } from '@hono/zod-openapi';

import example from './controllers/example';

export default new OpenAPIHono().route('/', example);
