/**
 * @class Status display
 */
RPG.UI.Status = OZ.Class();

RPG.UI.Status.ShowStats = ['hp', 'mana', 'map'];

RPG.UI.Status.prototype.init = function(ul) {
	this._dom = {
		feats: {},
		stats: {},
		misc: {}
	};
	
	this._build(ul);
}

RPG.UI.Status.prototype.toJSON = function(handler) {
	var data = {
		feats:{},
		stats:{},
		misc:{}
	};
	
	for (var p in this._dom.feats) { data.feats[p] = this._dom.feats[p].innerHTML; }
	for (var p in this._dom.stats) { data.stats[p] = this._dom.stats[p].innerHTML; }
	for (var p in this._dom.misc) { data.misc[p] = this._dom.misc[p].innerHTML; }

	return data;
}

RPG.UI.Status.prototype.fromJSON = function(data) {
	for (var p in data.feats) { this._dom.feats[p].innerHTML = data.feats[p]; }
	for (var p in data.stats) { this._dom.stats[p].innerHTML = data.stats[p]; }
	for (var p in data.misc) { this._dom.misc[p].innerHTML = data.misc[p]; }
}

function updateInnerHTMLIfExists(container, str) {
	if (container)
		container.innerHTML = str;
}

RPG.UI.Status.prototype.updateMap = function(str) {
	updateInnerHTMLIfExists(this._dom.misc.map, str);
}

RPG.UI.Status.prototype.updateRounds = function(rounds) {
	updateInnerHTMLIfExists(this._dom.misc.rounds, rounds);
}

RPG.UI.Status.prototype.updateName = function(name) {
	updateInnerHTMLIfExists(this._dom.misc.name, name);
}

RPG.UI.Status.prototype.updateFeat = function(feat, value) {
	var elm = this._dom.feats[feat];
	if (!elm) { return; }
	elm.innerHTML = value; 
}

RPG.UI.Status.prototype.updateStat = function(stat, value) {
	var elm = this._dom.stats[stat];
	if (!elm) { return; }
	elm.innerHTML = value; 
}

RPG.UI.Status.prototype._shouldShowStat = function(statName) {
	return RPG.UI.Status.ShowStats.indexOf(statName) >= 0;
}

RPG.UI.Status.prototype._showStatWithFeatMax = function(ul, title, stat, feat) {
		var li = OZ.DOM.elm("li");
		ul.appendChild(li);
		li.innerHTML = title+": ";
		var s = OZ.DOM.elm("span");
		this._dom.stats[stat] = s;
		li.appendChild(s);
		li.appendChild(OZ.DOM.text("/"));
		var s = OZ.DOM.elm("span");
		this._dom.feats[feat] = s;
		li.appendChild(s);
}

RPG.UI.Status.prototype._build = function(ul) {
	/* name */
	var li = OZ.DOM.elm("li", {fontWeight:"bold"});
	ul.appendChild(li);
	this._dom.misc.name = li;
	
	/* hp */
	if (this._shouldShowStat("hp")) {
		this._showStatWithFeatMax(ul, "HP", RPG.STAT_HP, RPG.FEAT_MAX_HP);
	}
	
	/* mana */
	if (this._shouldShowStat("mana")) {
		this._showStatWithFeatMax(ul, "Mana", RPG.STAT_MANA, RPG.FEAT_MAX_MANA);
	}

	if (this._shouldShowStat("food")) {
		this._showStatWithFeatMax(ul, "Food", RPG.STAT_FOOD, RPG.FEAT_MAX_FOOD);
	}

	if (this._shouldShowStat("rage")) {
		this._showStatWithFeatMax(ul, "Rage", RPG.STAT_RAGE, RPG.FEAT_MAX_RAGE);
	}

	/* rounds */
	var li = OZ.DOM.elm("li");
	ul.appendChild(li);
	li.innerHTML = "Round: ";
	var s = OZ.DOM.elm("span", {innerHTML:"0"});
	this._dom.misc.rounds = s;
	li.appendChild(s);
	
	/* level */
	if (this._shouldShowStat("map")) {
		var li = OZ.DOM.elm("li");
		ul.appendChild(li);
		li.innerHTML = "Map: ";
		var s = OZ.DOM.elm("span");
		this._dom.misc.map = s;
		li.appendChild(s);
	}
}
