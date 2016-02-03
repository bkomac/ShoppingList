/**
 * Index DB Helper
 */

var IDB = function() {

	var dbName = "i3ShoppingList";
	var catalogOS = "catalogObjectStore"

	var db = null;

	this.initDB = function() {
		var request = indexedDB.open(dbName);

		request.onupgradeneeded = function() {
			db = request.result;
			var store = db.createObjectStore(catalogOS, {
				keyPath : "id"
			});
			var nameIndex = store.createIndex("by_name", "name", {
				unique : true
			});

		};

		request.onsuccess = function() {
			db = request.result;
		};
	};

	this.addToCatalog = function(data, callback) {

		var tx = db.transaction(catalogOS, "readwrite");
		var store = tx.objectStore(catalogOS);

		if (data != undefined)
			store.put(data);

		tx.oncomplete = function() {
			if (callback != undefined)
				callback();
		};
	};

	this.getCatalog = function(name, callback) {
		console.log("findInCatalog: "+name);
		var tx = db.transaction(catalogOS, "readonly");
		var store = tx.objectStore(catalogOS);
		var index = store.index("by_name");
		var list = [];

		var request = index.openCursor();
		request.onsuccess = function() {
			var cursor = request.result;
			
			list.push(cursor.value);
			
			if(cursor)
			cursor.continue();
		};
		
		return list;
	};

	this.closeDB = function() {
		db.close();
	};

}
