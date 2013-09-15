
/**
 * @class Main story
 * @augments RPG.Story
 */
RPG.Story.Asterio = OZ.Class().extend(RPG.Story);

RPG.Story.Asterio.prototype.init = function() {
	this.parent();
	RPG.UI.sound.preload("tristram");
	
	this._maxElderDepth = 5;
	this._elderDepth = 0;
	this._maxMazeDepth = 3;
	this._mazeDepth = 0;
	
	this._addCallbacks();
	this._boss = null;
	this._village = null;
	this._tutorial = null;
}

RPG.Story.prototype.generatePC = function() {
	this._startGame(RPG.Races.Orc, RPG.Professions.Warrior, "The Minotaur");
}

RPG.Story.Asterio.prototype._buildMaps = function() {
	this._tutorial = new RPG.Map.Tutorial();

	var level = 1;
	var gen = RPG.Generators.Digger.getInstance();
	var map = gen.generate("Generic dungeon #" + level, new RPG.Coords(60, 60), level, {ctor:RPG.Map.RandomDungeon});
	RPG.Decorators.Hidden.getInstance().decorate(map, 0.01);
	
	/* enemies */
	var max = 3 + Math.floor(Math.random()*6) + level;
//	RPG.Decorators.Beings.getInstance().decorate(map, max);
	
	/* items */
	var max = 1 + Math.floor(Math.random()*3);
	RPG.Decorators.Items.getInstance().decorate(map, max);

	/* traps */
	var max = 1 + Math.floor(Math.random()*2);
//	RPG.Decorators.Traps.getInstance().decorate(map, max);

//	var rooms = map.getRooms().clone();
//	var startRoom = rooms.random();
//	this._startPos = startRoom.getCenter();
	this._startPos = map.getFreeCoords();

	this._cave = map;
}

RPG.Story.Asterio.prototype._addCallbacks = function() {
	this._staircaseCallbacks["end"] = this._end;
    this._staircaseCallbacks["elder"] = this._nextElderDungeon;
    this._staircaseCallbacks["maze"] = this._nextMazeDungeon;
    this._staircaseCallbacks["dungeon"] = this._nextGenericDungeon;
    this._staircaseCallbacks["dungeon-up"] = this._nextGenericDungeon;
    this._staircaseCallbacks["dungeon-down"] = this._nextGenericDungeon;
    this._questCallbacks["elder"] = this._showElderStaircase;
    this._questCallbacks["maze"] = this._showMazeStaircase;
}

RPG.Story.Asterio.prototype._createPC = function(race, profession, name) {
	var pc = this.parent(race, profession, name);

	var rocks = new RPG.Items.Rock();
	rocks.setAmount(5);
	pc.addItem(rocks);

	return pc;
}

RPG.Story.Asterio.prototype._firstMap = function() {
	this._buildMaps();
	return [this._cave, this._startPos];
}

RPG.Story.Asterio.prototype.computeScore = function() {
	var total = this.parent();
	total += 150 * this._elderDepth;
	return total;
}

