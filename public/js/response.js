/**
 * 
 */
function emsg(o) {
	var s = "";
	for (prop in o) {
		s += "<div code=\"" + prop + "\">" + o[prop] + "</div>";
	}
	return s;
}

// lay label hoac value prop tu dropdown
// jqxddi = drop down list box items
function jqxddi(o, t) {
	var ret;
	var prop = "value";

	if (!t)
		prop = "label";

	if ($.isArray(o)) {
		if (o.length) {
			ret = [];
			for ( var p in o) {
				ret.push(o[p][prop]);
			}
		}
	} else {
		if (o)
			ret = o[prop];
	}

	return ret;
}