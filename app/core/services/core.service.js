'use strict';

angular.
  module('core.service').
  factory('Place', ['$resource',
    function($resource) {
      return $resource('places/:placeId.json', {}, {
        query: {
          method: 'GET',
          params: {placeId: 'places'},
          isArray: true
        }
      });
    }
  ]);
