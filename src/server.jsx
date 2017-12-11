import Express from 'express';

import routers from './routers';

const PORT = 8022;

const app = Express();

routers.forEach((router) => {
	app.use(router);
});

const server = app.listen(PORT, () => {
	console.log(`http://localhost:${PORT}`);
});

export default server;
