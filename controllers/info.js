let OAuth = require('oauth');
let { errorHandler } = require('../utils/error');

const { YAHOO_APP_ID, YAHOO_CLIENT_ID, YAHOO_SECRET_ID } = process.env;

const getWeatherInfo = function(req, res) {
	try {
		let { city } = req.body;
		if (!city) {
			throw new Error('please enter city location to get weather forecast');
		}
		let header = {
			'X-Yahoo-App-Id': YAHOO_APP_ID
		};
		let request = new OAuth.OAuth(null, null, YAHOO_CLIENT_ID, YAHOO_SECRET_ID, '1.0', null, 'HMAC-SHA1', null, header);
		return request.get(`https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${city}&format=json`, null, null, (err, data) => {
			if (err) {
				return errorHandler(err, res);
			}
			return res.json({
				success: true,
				data: JSON.parse(data)
			});
		});
	} catch (error) {
		return errorHandler(error, res);
	}
};

module.exports = {
	getWeatherInfo
};
