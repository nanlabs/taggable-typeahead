/**
 * btr-tags.js
 **/

define(['taggable', 'underscore'], function (t, _) {

    'use strict';

    // Directive definition

    function btrTags() {

        // To compile templates
        var engine = {
            compile: function (template) {
                var compiled = _.template(template);

                return {
                    render: function (context) {
                        return compiled(context);
                    }
                };
            }
        }

        return {
            restrict: 'A',
            require: 'ngModel',

            link: function (scope, el, attrs, ngModelCtl) {

                var $el = $(el[0]),
                    charMinLenght = (attrs.charMinLenght) ? parseInt(attrs.charMinLenght, 10) : 2,
                    max = (attrs.max) ? parseInt(attrs.max, 10) : 0,
                    endpoint = scope[attrs.endpoint];

                // Loader animation is hidden by default
                var $loader = $('<img class="btr-tags-loading" src="/Content/Images/loader.gif" />').
                        hide();

                // Initialize typeahead and taggable
                $el.typeahead({
                    template: '<span><%=Tag%></span><i class="pull-right">(<%=UsageCount%>)</i>',
                    engine: engine,
                    remote: {
                        url: endpoint,
                        beforeSend: function (jqXhr, settings) {
                            if ($el.val().length < charMinLenght) {
                                jqXhr.abort();
                            } else {
                                $loader.show();
                                jqXhr.complete(function () {
                                    $loader.hide();
                                });
                            }
                        },
                        maxParallelRequests: 1
                    }
                }).taggable( { max: max } );

                $el.parent().after($loader);

                var onTagsChanged = function () {
                    scope.$apply(function () {
                        ngModelCtl.$setViewValue( $el.taggable('get') );
                    });
                };

                $el.on('tag:added', onTagsChanged).
                    on('tag:removed', onTagsChanged);
            }
        };
    }

    return btrTags;
});