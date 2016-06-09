'use strict';

// Register `phoneList` component, along with its associated controller and template
angular.
  module('placeList').
  component('placeList', {
    templateUrl: 'place-list/place-list-template.html',
    controller: ['Place','$rootScope','$scope','$location',
      function PlacesListController(Place,$rootScope,$scope,$location) {
         $scope.places = Place.query();
         $scope.orderProp = 'serial';
          $scope.openPlace = function(place)
          {
              $location.url("/places/"+place.id + "_" + $rootScope.lang);
              console.log($location.url());
             // window.location = "#!/places/"+ phone.id + "_" + $rootScope.lang;
          };
      }

    ]
  });
