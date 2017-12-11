import api from './api';
import encrypt from './encrypt';
import decrypt from './decrypt';
import image from './image';
import twitter from './twitter';
import middleware from './middleware';
import webpack from './webpack';
import react from './react';

const routers = [
	api,
	encrypt,
	decrypt,
	image,
	twitter,
	middleware,
	webpack,
	react,
];

export default routers;
