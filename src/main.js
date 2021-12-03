import fs from "fs";
import http2 from "http2";

function isConnected() {
	return new Promise((resolve) => {
	  const client = http2.connect('https://www.google.com');
	  client.on('connect', () => {
		resolve(true);
		client.destroy();
	  });
	  client.on('error', () => {
		resolve(false);
		client.destroy();
	  });
	});
  };

const logToFile = async () => {
	const timestamp = new Date().toISOString();
	let isConnectedToInternet = await isConnected();
	console.log(`${timestamp},${isConnectedToInternet}`);
	fs.appendFileSync("uptime.log", `${timestamp},${isConnectedToInternet}\n`)
};

setTimeout(
	() => {
		logToFile();
		setInterval(logToFile, 1000 * 60)
	},
	(60 - new Date().getSeconds()) * 1000,
)