
/**
 * @class Minotaur
 * @augments RPG.Beings.PC
 */
RPG.Beings.Minotaur = OZ.Class().extend(RPG.Beings.PC);

RPG.Beings.Minotaur.prototype.init = function() {
	this.parent(RPG.Races.Orc, RPG.Professions.Warrior);
}

/*
RPG.Beings.Minotaur.prototype._computeVisibleCoords = function() {
	var all = {};
	var size = this._map.getSize();
	var c = new RPG.Coords(0, 0);
	for (var i=0;i<size.x;i++) {
		for (var j=0;j<size.y;j++) {
			c.x = i;
			c.y = j;
			var cell = this._map.getCell(c);
			if (cell) { all[c.x+","+c.y] = c.clone(); }
		}
	}
	return all;
}

RPG.Beings.Minotaur.prototype.canSee = function(coords) {
	return true;
}
*/