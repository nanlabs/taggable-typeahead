module("Basic Tests");

test("Basic Initialization", function() {
	var $c = $("#text-tags");
	$c.typeahead({ local: ['qunit', 'mocha', 'jasmine'] }).taggable();
	equal($c.length, 1, "Component initialized successfully!");
});

// test("Default Initialization", function() {
	
// 	var $c = $("#text-tags");
// 	$c.typeahead({ local: ['qunit', 'mocha', 'jasmine'] }).taggable({ tags: ['test1', 'test2'] });
// 	equal($c.length, 1, "Component initialized successfully!");

// 	var $tags = $('.tag-cloud .tag', $c);
// 	equal($tags.length, 2, "Default tags");
// });