
(function($) {

    var methods = {

        // Initialization
        init: function(opts) {
            opts = opts || {};
            opts.tags = opts.tags || [];

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

            var addTag = function(value) {
                value = value.replace(clean, '');
                if (value !== '') {
                    var tag = $('<div class="tag"><span>' + value + '</span></div>');
                    var del = $('<a href="#">x</a>');

                    del.click(function() {
                        del.parent().remove();
                    });
                    
                    tag.append(del);
                    tag.insertBefore($typeahead);
                }
            };

            var clearInput = function() {
                this.value = '';
                $input.val('');
                $hint.val('');
            };

            // // On click handler
            // $input.blur(function() {
            //     addTag(this.value);
            //     this.value = '';
            // });

            // On keyup handler
            $input.keyup(function(e) {
                var key = e.keyCode;
                var isEnter = key === 13;
                var isComma = key === 188;
                var isBack = key === 8;
                
                if (isEnter || isComma) {
                    addTag(this.value);
                    clearInput();
                } else if (isBack && this.value === '') {
                    $container.find('.tag').last().remove();
                    clearInput();
                }
                // if (isBack && this.data('delete-prev')) { 
                //     $(this).prev().remove(); 
                //     $(this).data('delete-prev',false);
                // } else if(isBack && this.value === '') {
                //     $(this).data('delete-prev', true); 
                // }
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
