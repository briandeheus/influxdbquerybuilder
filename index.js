var QueryBuilder = function () {

	this.values = {
		select:  [],
		where:   [],
		groupBy: [],
		from:    null
	};

	return this;

};

QueryBuilder.prototype.count = function (column, distinct) {

	if (distinct) {

		this.values.select.push('COUNT(DISTINCT(' + column + '))');

	} else {

		this.values.select.push('COUNT(' + column + ')');

	}

	return this;

};

QueryBuilder.prototype.select = function (column) {
	this.values.select.push(column);
	return this;

};

QueryBuilder.prototype.min = function (column) {
	
	this.values.select.push('MIN(' + column + ')');
	return this;

};

QueryBuilder.prototype.max = function (column) {
	
	this.values.select.push('MAX(' + column + ')');
	return this;

};

QueryBuilder.prototype.mean = function (column) {
	
	this.values.select.push('MEAN(' + column + ')');
	return this;

};

QueryBuilder.prototype.mode = function (column) {
	
	this.values.select.push('MODE(' + column + ')');
	return this;

};

QueryBuilder.prototype.sort = function (column, order) {

	order = order.toUpperCase();

	if (order !== 'ASC' && order !== 'DESC') {
		throw new Error('Order has to be either ASC or DESC');
	}

	this.values.order = {
		column: column,
		order: order
	};

	return this;

};

QueryBuilder.prototype.percentile = function (column, n) {
	
	if (n < 0) {
		throw new Error('N can not be less than 0');
	}

	if (n > 100) {
		throw new Error('N can not be more than 100');
	}

	if (n === undefined) {
		throw new Error('N can not be undefined');
	}

	//TODO: Come up with a better solution for this
	//Not very pretty.
	if (n.toString().indexOf('.') !== -1) {
		throw new Error('N can not be a float');
	}

	this.values.select.push('PERCENTILE(' + column + ', ' + n + ')');
	return this;

}

QueryBuilder.prototype.sum = function (column) {
	
	this.values.select.push('SUM(' + column + ')');
	return this;

}

QueryBuilder.prototype.groupBy = function (column) {
	this.values.groupBy.push(column)
	return this;
}

QueryBuilder.prototype.where = function (column, value) {
	
	this.values.where.push(column + ' ' + value);
	return this;
}

QueryBuilder.prototype._commaLoop = function (values) {

	var query = '';
	for (var i = 0, l = values.length; i < l; i++) {

		query += values[i];

		if (i < l - 1) {

			query += ', ';

		}

	}

	return query;

}

QueryBuilder.prototype._andLoop = function (values) {

	var query = '';

	for (var i = 0, l = values.length; i < l; i++) {

		query += values[i];

		if (i < l - 1) {

			query += ' AND ';

		}

	}

	return query;

}

QueryBuilder.prototype.from = function (series) {
	this.values.from = series;
	return this;
}

QueryBuilder.prototype.make = function () {

	var query = 'SELECT ';

	if (this.values.select.length > 0) {
		query += this._commaLoop(this.values.select) + ' ';

	} else {

		query += '* ';

	}

	if (!this.values.from) {

		throw new Error('Can not make a query without specifying a series to query.');

	}

	query += 'FROM ' + this.values.from + ' ';

	if (this.values.where.length > 0) {

		query += 'WHERE ' + this._andLoop(this.values.where) + ' ';

	}

	if (this.values.groupBy.length > 0) {

		query += 'GROUP BY ' + this._commaLoop(this.values.groupBy)

	}

	if (this.values.order) {

		query += ' ORDER BY ' + this.values.order.column + ' ' + this.values.order.order;

	}

	return query;

}

module.exports = QueryBuilder;