'use strict';

// Define the `tourGuide` module
angular.module('tourGuideApp', [
  'ngAnimate',
  'ngRoute',
  'uiGmapgoogle-maps',
  'core',
  'placeList',
  'placeNav',
  'ionic.rating',
    'pascalprecht.translate'
]);


//Header controller
angular.module('tourGuideApp').controller('header',['$rootScope','$scope','$translate',function($rootScope,$scope,$translate)
{
    $scope.selectedLang = "en";
    $rootScope.lang = "en";
    $scope.selectLanguage = function()
    {
        $rootScope.lang = $scope.selectedLang;
        console.log("selected lang", $rootScope.lang);
        $translate.use($scope.selectedLang);
        //$translate.refresh();
    };

}]);

//Header controller
angular.module('tourGuideApp').run(['$rootScope',function($rootScope)
{
    //$rootScope.lang = "en";

}]);
