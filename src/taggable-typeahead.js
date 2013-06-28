
(function($) {

    var methods = {

        // Initialization
        init: function(opts) {
            opts = opts || {};
            opts.tags = opts.tags || [];
            opts.focusClass = opts.focusClass || 'tag-cloud-focus';

            // Util variables
            var clean = new RegExp(',', 'g');

            // Cached DOM elements
            var $input = $(this),
                $typeahead = $input.parents('.twitter-typeahead').wrap('<div class="tag-cloud" />'),
                $hint = $typeahead.find('.tt-hint'),
                $container = $typeahead.parents('.tag-cloud');

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
                
                if ( value !== '' && !containsValue(value)) {
                    var tag = $('<div class="tag"><span>' + value + '</span></div>');
                    var del = $('<a href="#">x</a>');

                    del.click(function() {
                        del.parent().remove();
                    });
                    
                    tag.append(del);
                    tag.insertBefore($typeahead);
                }

                clearInput();
            };

            var clearInput = function() {
                this.value = '';
                $input.val('');
                $hint.val('');
            };

            var containsValue = function(value) {
                var exists = false;

                // Iterates over the existing tags
                $.each ( $container.find('.tag span'), function(i, el) {
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
                    $container.find('.tag').last().remove();
                    clearInput();
                }
                $input.data('delete-prev', (isBack && this.value === '') );
            });

            // When a suggested option is selected
            $input.on('typeahead:selected', function(e, obj) {
                addTag(obj.value);
                $input.typeahead('setQuery', '');
            });

            // Add default tags
            $.each(opts.tags, function(i, e) {
                addTag(e);
            });

        },
        get: function() {
            return $( '.tag span', this.parents('.tag-cloud') ).map(function() {
                return $(this).text();
            });
        },
        clear: function() {
            $('div', this).remove();
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
