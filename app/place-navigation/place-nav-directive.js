'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('placeNav').
  component('placeNav', {
    templateUrl: 'place-navigation/place-nav-template.html',
    controller: ['$routeParams', 'Place','$scope', '$timeout', 'speech','$rootScope','$translate','speechRecognition',
      function PlaceNavigationController($routeParams, Place,$scope, $timeout, speech,$rootScope,$translate,speechRecognition) {

        $scope.place = Place.get({placeId: $routeParams.placeId}, function(place) {
          //$scope.setImage(place.images[0]);
        });

        $scope.setImage = function setImage(imageUrl) {
          $scope.mainImageUrl = imageUrl;
        };

        $scope.show=false;
        $scope.selectObject = function(feature)
        {
            $scope.show = true;
            $scope.current = feature;
            $scope.msg = feature.description;
            speech.stopPlay();

        }

        //$scope.map = { center: { latitude: 27.173130, longitude: -73 }, zoom: 8 };

          var selectVoice = function()
          {
              $timeout(function () {
                  $scope.optionSelected = 0;

                  for(var i =0; i < $scope.voices.length; i++)
                  {
                      if($scope.voices[i].lang.indexOf($rootScope.lang) != -1)
                      {
                          $scope.optionSelected = i;
                          break;

                      }
                  }
              }, 1000);
          }

        //Speech code
          $scope.support = false;
          if(window.speechSynthesis) {
              $scope.support = true;

              $timeout(function () {
                  $scope.voices = speech.getVoices();
              }, 500);
              selectVoice();

          }

          $scope.submitEntry = function () {
              var voiceIdx = $scope.optionSelected,
                  config = {
                      voiceIndex: voiceIdx,
                      rate: 0.9,
                      pitch: 1,
                      volume: 1
                  };

              if(window.speechSynthesis) {
                  speech.sayText($scope.msg, config);
              }
          }

          //Voice Recognition code
          $scope.stopped = true;
          $scope.init = function() {
              $scope.clearResults();

              speechRecognition.addCommand('*allSpeech', function(allSpeech) {

                  $scope.addResult(allSpeech);
                  console.log("curr name",$scope.current.name)
                  if(allSpeech.indexOf($scope.current.name.toLowerCase()) > -1)
                  {
                      console.debug("You said : ",allSpeech);
                      $scope.submitEntry();
                      $scope.clearResults();
                  }
              });

              speechRecognition.start();
              $scope.started = true;
              $scope.stopped = false;
          };

          $scope.addResult = function(result) {
              $scope.result = result;
              $scope.results.push({
                  content: result,
                  date: new Date()
              });
          };

          $scope.clearResults = function() {
              $scope.results = [];
          };

          $scope.start = function()
          {
              $scope.init();
              $scope.started = true;
              $scope.stopped = false;
          }

          $scope.stop = function()
          {
              speechRecognition.stop();
              $scope.started = false;
              $scope.stopped = true;
          }


          //speechRecognition.stop();

      }
    ]
  });