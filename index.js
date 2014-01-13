/**
 * Module dependencies
 */

var _ = require('lodash')
	, switchback = require('node-switchback')
	, mergeDefaults = require('merge-defaults')
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
 */
module.exports = Reporter;

/**
 * Factory
 * 
 * @param  {Object|Function} patch
 * @return {Reporter} a new reporter
 */
function Reporter (patch) {
	patch = patch || {};
	if ( ! (_.isFunction(patch) || _.isObject(patch)) ) {
		throw new Error('Invalid usage: must provide a function or object.');
	}

	// Construct a switchback
	var reporter = switchback(patch, {
		success: (function(){}),
		error  : (logger.error),
		end    : (function(){})
	});

	// Mixin streaming / logging functionality
	reporter.write = logger.info;
	reporter.log   = logger.verbose;

	/**
	 * Mixin `extend()` method
	 * @param  {Object|Function} patch
	 * @return {Reporter} a new reporter
	 */
	reporter.extend = Reporter;

	return reporter;
}


