/**
 * Module dependencies
 */

var _ = require('lodash')
	, switchback = require('node-switchback')
	, logger = (new (require('captains-log'))());



/**
 * Reporter
 *
 * Hybrid between:
 * + switchback
 * + logger
 * + EventEmitter
 * + Stream
 *
 * Usage:
 * require('reporter')
 *
 * @return {Reporter} special case of Switchback
 */
module.exports = function (properties) {

	properties = _.merge({

		// Callbacks
		success: (function(){}),
		error  : (logger.error),
		end    : (function(){}),

		// Events
		write  : logger.info,
		log    : logger.verbose
	}, properties || {});

	var reporter = switchback(properties);
	reporter.extend = function (patch) {
		var patchedCopy = _.merge({}, properties, patch);
		return newReporter(patchedCopy);
	};
	return reporter;
};


