
(function($) {

    var methods = {

        // Initialization
        init: function(opts) {
            opts = opts || {};
            opts.tags = opts.tags || [];
            opts.focusClass = opts.focusClass || 'tag-cloud-focus';
            opts.valueKey = opts.valueKey || 'value';
            opts.max = opts.max || 0;

            // Util variables
            var clean = new RegExp(',', 'g');

            // Cached DOM elements
            var $input = $(this),
                $typeahead = $input.parents('.twitter-typeahead').wrap('<div class="tag-cloud" />'),
                $hint = $typeahead.find('.tt-hint'),
                $container = $typeahead.parents('.tag-cloud');

            var trigger = function(event, value) {
                $input.trigger('tag:' + event, value);
            };

            // When container is click, focus the input element
            $container.click(function() {
                $input.focus();
            });

            // Handlers for adding foucs class
            $input.focus(function() { $container.addClass( opts.focusClass ); });
            $input.blur(function() { 
                clearInput();
                $container.removeClass( opts.focusClass );
            });

            var addTag = function(value) {
                value = value.replace(clean, '');
                
                if ( value !== '' && !containsValue(value) && canAddMoreTags() ) {

                    var $tag = $('<div class="tag"><span>' + value + '</span></div>'),
                        $del = $('<i class="icon-remove icon-white"></i>');

                    $del.click(function() {
                        $del.parent().remove();
                        trigger('removed', value);
                    });
                    
                    $tag.append($del);
                    $tag.insertBefore($typeahead);
                    trigger('added', value);
                }

                clearInput();
            };

            var clearInput = function() {
                this.value = '';
                $input.val('');
                $hint.val('');
            };

            var getTags = function() {
                return $container.find('.tag span');
            };

            // Verify if the tags max limit was reached
            var canAddMoreTags = function () {
                return (opts.max === 0 || getTags().length < opts.max);
            };

            var containsValue = function(value) {
                var exists = false;

                // Iterates over the existing tags
                $.each ( getTags(), function(i, el) {

                    if ($(el).text() === value) {
                        exists = true;
                        return; // Brearks the iteration
                    }
                });
                return exists;
            };

            // On keyup handler
            $input.keyup(function(e) {
                var key = e.keyCode,
                    isEnter = key === 13,
                    isComma = key === 188,
                    isBack = key === 8;
                
                if (isEnter || isComma) {
                    addTag(this.value);
                } 

                // Remove previous tag
                if ( isBack && $input.data('delete-prev') ) {
                    $input.data('delete-prev', false);

                    var $t = $container.find('.tag').last();
                    trigger('removed', $t.find('span').text());
                    $t.remove();

                    clearInput();
                }
                $input.data('delete-prev', (isBack && this.value === '') );
                
				// The following allows to paste text with commas as different keywords
                var text = $input.val();
                if(text.indexOf(",") != -1) {
                	$.each(text.split(","), function(i, e) {
                		addTag(e);
                	});
                }
            });

            // When a suggested option is selected
            $input.on('typeahead:selected', function(e, obj) {
                addTag(obj[opts.valueKey]);
                $input.typeahead('setQuery', '');
            });

            // Add default tags
            $.each(opts.tags, function(i, e) {
                addTag(e);
            });

        },

        get: function() {
            var tags = [];
            $( '.tag span', this.parents('.tag-cloud') ).each(function() {
                tags.push($(this).text());
            });
            return tags;
        },

        clear: function() {
            $('div', this).remove();
        },

        addTag: function(value, opts) {

            // Options
            if (!opts) { opts = {}; }
            opts.silent = (opts.silent) ? true : false;

            var clean = new RegExp(',', 'g');
            value = value.replace(clean, '');

            var tagList = $(this).taggable('get');

            if ( value !== '' && tagList.indexOf(value) < 0 ) {

                var $tag = $('<div class="tag"><span>' + value + '</span></div>'),
                    $del = $('<i class="icon-remove icon-white"></i>'),
                    $input = $(this),
                    $typeahead = $input.parents('.twitter-typeahead'),
                    $hint = $typeahead.find('.tt-hint');

                $del.click(function() {
                    $del.parent().remove();
                    $input.trigger('tag:removed', value);
                });
                
                $tag.append($del);
                $tag.insertBefore($typeahead);

                if (!opts.silent) {
                    $input.trigger('tag:added', value);
                }

                // Clear input
                this.value = '';
                $input.val('');
                $hint.val('');
            }
        }

    };
    jQuery.fn.taggable = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on taggable plugin');
        }
    };
})(window.jQuery);
