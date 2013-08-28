---
layout: project
page: project
title: "NaN Labs - Taggable Typeahead"
description: "A small library to wrap the Twitter typeahead.js component and add the taggable functionality."
home-text: Home
footer-title: Get in touch
logoImg: logo-195x120.png
section: project
header: "Taggable Typeahead"
lead-text: "A small library to wrap the Twitter typeahead.js component and add the taggable functionality."
github-url: https://github.com/nanlabs/taggable-typeahead
---

<div class="example">

    <h3>Default Behaviour</h3>
    <p>Typeahead with the taggable feature.</p>

    <div>
      <label for="example1">Tags</label>
      <input type="text" id="example1" class="tags" />
    </div>

    <script>
    $(function() {
      $('#example1').typeahead( { 
        prefetch: 'data.json'
      }).taggable();
    });
    </script>
    <pre>
	$('example1').typeahead( { 
	  prefetch: 'data.json'
	}).taggable();</pre>

</div>

<div class="example">

	<h3>With Max Limit (5)</h3>
	<p>Set the max number of tags.</p>

	<div>
	  <label for="example2">Tags (Limit 5)</label>
	  <input type="text" id="example2" class="tags" />
	</div>

	<script>
	$(function() {
	  $('#example2').typeahead( { 
	    prefetch: 'data.json'
	  }).taggable( { 
	    max: 5 
	  });
	});
	</script>
	<pre>
	$('example2').typeahead( { 
	  prefetch: 'data.json'
	}).taggable( { 
	  max: 5 
	});</pre>

</div>

<div class="example">

	<h3>Interacting by code</h3>
	<p>Adding and removing tags using Javascipt.</p>

	<div>
	  <button id="btnAddTag">Add one tag ("Hello World")</button>
	  <button id="btnAddTags">Add many tags ("Hello" and "World")</button>
	  <button id="btnClear">Clear the tags</button>
	</div>

	<div>
	  <label for="example4">Tags</label>
	  <input type="text" id="example4" class="tags" />
	</div>

	<script>
	$(function() {
	  $('#example4').typeahead( { 
	    prefetch: 'data.json'
	  }).taggable();
	});

	$("#btnAddTag").click(function() {
	  $("#example4").taggable("addTag", "Hello World");
	});
	$("#btnAddTags").click(function() {
	  $("#example4").taggable("addTags", ["Hello", "World"]);
	});
	$("#btnClear").click(function() {
	  $("#example4").taggable("clear");
	});
	</script>
	<pre>
	$('example4').typeahead( { 
		prefetch: 'data.json'
	}).taggable();</pre>

	<pre>
	$("#btnAddTag").click(function() {
		$("#example4").taggable("addTag", "Hello World");
	});
	
	$("#btnAddTags").click(function() {
		$("#example4").taggable("addTags", ["Hello", "World"]);
	});
	
	$("#btnClear").click(function() {
		$("#example4").taggable("clear");
	});</pre>

</div>

<div class="example">

	<h3>Saving and loading state</h3>
	<p>Define initial tags, save current state and load saved state.</p>

	<div>
	  <button id="btnReset">Reset (load saved state)</button>
	  <button id="btnSave">Save new state</button>
	</div>

	<div>
	  <label for="example5">Tags</label>
	  <input type="text" id="example5" class="tags" />
	</div>

	<script>
	$(function() {
	  $('#example5').typeahead( { 
	    prefetch: 'data.json'
	  }).taggable({tags: ['Initial', 'State']});
	});

	$("#btnReset").click(function() {
	  $("#example5").taggable("reset");
	});
	$("#btnSave").click(function() {
	  $("#example5").taggable("save");
	});
	</script>
	<pre>
	$('#example5').typeahead( { 
	prefetch: 'data.json'
	}).taggable({tags: ['Initial', 'State']});</pre>

	<pre>
	$("#btnReset").click(function() {
		$("#example5").taggable("reset");
	});

	$("#btnSave").click(function() {
		$("#example5").taggable("save");
	});</pre>

</div>

<div class="example">

	<h3>With Typeahead Template</h3>
	<p>Use typeahead template to display options with more information.</p>

	<div>
	  <label for="example3">Tags with template</label>
	  <input type="text" id="example3" class="tags" />
	</div>

	<script>
	$(function() {
	  $('#example3').typeahead( { 
	    prefetch: 'data2.json',
	    valueKey: 'label',
	    template: _.unescape('&lt;span&gt;&lt;%=label%&gt;&lt;/span&gt;&lt;i class="pull-right"&gt;(&lt;%=usage%&gt;)&lt;/i&gt;'),
	    engine: _
	  }).taggable({
	    valueKey: 'label'
	  });
	});
	</script>
	<pre>
	$('#example3').typeahead( { 
	prefetch: 'data2.json',
	valueKey: 'label',
	template: '&lt;span&gt;&lt;%=label%&gt;&lt;/span&gt;&lt;i class="pull-right"&gt;(&lt;%=usage%&gt;)&lt;/i&gt;',
	engine: engine
	}).taggable( { 
	valueKey: 'label' 
	});</pre>

</div>
