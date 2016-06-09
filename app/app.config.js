'use strict';

angular.
  module('tourGuideApp').
  config(['$locationProvider' ,'$routeProvider','$translateProvider',
    function config($locationProvider, $routeProvider, $translateProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/places', {
          template: '<place-list></place-list>'
        }).
        when('/places/:placeId', {
          template: '<place-nav></place-nav>'
        }).
        when('/speak', {
              templateUrl: "audio-guide/speechSynthesis.html"
          }).
        otherwise('/places');


        $translateProvider.translations('en', {
            'HOME': 'Home',
            'TALK': 'Tell me about',
            'LANG':'Language',
            'SEARCH':'Search',
            'SORT':'Sort',
            'VISIT':'Visit Place',
            'REVIEWS':'Reviews',
            'ADD_REVIEW':'Add Review'
        });

        $translateProvider.translations('fr', {
            'HOME': 'Home',
            'TALK': 'Parle moi de',
            'LANG':'Langue',
            'SEARCH':'Chercher',
            'SORT':'Sort',
            'VISIT':'Visitez Place',
            'REVIEWS':'Opinions',
            'ADD_REVIEW':'Ajouter un avis'
        });

        $translateProvider.preferredLanguage('en');
    }
  ]);
