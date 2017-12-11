import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc-hmac-sha256';

const passwordPath = path.resolve(__dirname, '../../config.txt');
const password = fs.readFileSync(passwordPath)
.toString()
.trim();

export function encrypt(text) {
	let cipher = crypto.createCipher(algorithm, password);
	let enc = cipher.update(text, 'utf8', 'hex');
	enc += cipher.final('hex');

	return enc;
}

export function decrypt(text) {
	let decipher = crypto.createDecipher(algorithm, password);
	let dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');

	return dec;
}

export function createPath(id) {
	const date = new Date();
	const time = date.getTime();

	return `/i/${encrypt(`${time}-${id}`)}`;
}
