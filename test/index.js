var QB     = require('../index');
var assert = require('assert');

describe('InfluxDB query builder', function () {

	it('Creates a count query', function () {

		var query = 'SELECT COUNT(column_name) FROM series_name GROUP BY time(10m)';
		var qb = new QB().count('column_name').from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a sum query', function () {

		var query = 'SELECT SUM(column_name) FROM series_name GROUP BY time(10m)';
		var qb = new QB().sum('column_name').from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a max query', function () {

		var query = 'SELECT MAX(column_name) FROM series_name GROUP BY time(10m)';
		var qb = new QB().max('column_name').from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a min query', function () {

		var query = 'SELECT MIN(column_name) FROM series_name GROUP BY time(10m)';
		var qb = new QB().min('column_name').from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a percentile query', function () {

		var query = 'SELECT PERCENTILE(column_name, 50) FROM series_name GROUP BY time(10m)';
		var qb = new QB().percentile('column_name', 50).from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a mean query', function () {

		var query = 'SELECT MEAN(column_name) FROM series_name GROUP BY time(10m)';
		var qb = new QB().mean('column_name').from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a distinct count query', function () {

		var query = 'SELECT COUNT(DISTINCT(column_name)) FROM series_name GROUP BY time(10m)';
		var qb = new QB().count('column_name', true).from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a distinct count query where also counting column2', function () {

		var query = 'SELECT COUNT(DISTINCT(column_name)), column2 FROM series_name GROUP BY time(10m)';
		var qb = new QB().count('column_name', true).select('column2').from('series_name').groupBy('time(10m)').make();
		assert.equal(query, qb);

	});

	it('Creates a distinct count query where also counting column2 and grouping by event', function () {

		var query = 'SELECT COUNT(DISTINCT(column_name)), column2 FROM series_name GROUP BY time(10m), event';
		var qb = new QB().count('column_name', true).select('column2').from('series_name').groupBy('time(10m)').groupBy('event').make();
		assert.equal(query, qb);

	});

	it('Creates a distinct count query where also counting column2 and grouping by event ordering it by time', function () {

		var query = 'SELECT COUNT(DISTINCT(column_name)), column2 FROM series_name GROUP BY time(10m), event ORDER BY time DESC';
		var qb = new QB().count('column_name', true).select('column2').from('series_name').groupBy('time(10m)').groupBy('event').sort('time', 'desc').make();
		assert.equal(query, qb);

	});


});