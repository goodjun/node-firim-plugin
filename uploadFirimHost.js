/**
 * fir.im upload plugin
 */

const fs = require('fs');
const request = require('request');
const chalk = require("chalk");

/**
 * fir.im api token
 */
const apiToken = '';

/**
 * cli argument
 */
let [packagePath, iconPath, platform, bundleId, appName, version, buildVersion, changelog] = process.argv.slice(2);

console.log('platform: ', platform);
console.log('bundleId: ', bundleId);
console.log('appName: ', appName);
console.log('version: ', version);
console.log('buildVersion: ', buildVersion);
console.log('changelog: ', changelog);

// Main
getUploadToken(platform, bundleId, apiToken).then(result => {

	const packageParam = result.cert.binary;
	const iconParam = result.cert.icon;

	upLoadFile(packageParam, packagePath, appName, version, buildVersion, changelog).then(() => {
		console.log(chalk.green('upload package upload succeed!'));
	});

	upLoadFile(iconParam, iconPath).then(() => {
		console.log(chalk.green('upload icon upload succeed!'));
	});

});

// Upload package/icon to fir.im
function upLoadFile(param, filePath, appName = '', version = '', buildVersion = '', changelog = '') {
	return new Promise((resolve, reject) => {
		request.post({
			url: param.upload_url,
			formData: {
				key: param.key,
				token: param.token,
				'x:name': appName,
				'x:version': version,
				'x:build': buildVersion,
				'x:changelog': changelog,
				file: fs.createReadStream(filePath),
			},
			encoding: 'utf8'
		}, (_error, response, body) => {
			if (response.statusCode !== 200) {
				console.log(chalk.red(body));
				reject(chalk.red(`Upload package/icon ${filePath} failed!`));
			} else {
				resolve(JSON.parse(body));
			}
		});
	});
}

// Get upload token from fir.im
function getUploadToken(type, bundleId, apiToken) {
	return new Promise((resolve, reject) => {
		request.post({
			url: 'http://api.bq04.com/apps',
			form: {
				type: type,
				bundle_id: bundleId,
				api_token: apiToken,
			},
			encoding: 'utf8'
		}, (_error, response, body) => {
			if (response.statusCode !== 201) {
				console.log(chalk.red(body));
				reject(chalk.red('Get upload token failed!'));
			} else {
				resolve(JSON.parse(body));
			}
		});
	});
}
