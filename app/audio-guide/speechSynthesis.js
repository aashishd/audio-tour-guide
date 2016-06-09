/**
 * Created by asdhiman on 6/7/16.
 */

angular.module('speechService', []).
    factory('speech', function () {

        if(window.speechSynthesis) {
            var msg = new SpeechSynthesisUtterance();
        }

        function getVoices() {

            window.speechSynthesis.getVoices();
            return window.speechSynthesis.getVoices();
        }

        function sayIt(text, config) {
            var voices = getVoices();

            //choose voice. Fallback to default
            msg.voice = config && config.voiceIndex ? voices[config.voiceIndex] : voices[0];
            msg.volume = config && config.volume ? config.volume : 1;
            msg.rate = config && config.rate ? config.rate : 1;
            msg.pitch = config && config.pitch ? config.pitch : 1;

            //message for speech
            msg.text = text;

            speechSynthesis.speak(msg);
        }

        function stopPlay()
        {
           // window.speechSynthesis.pause();
        }


        return {
            sayText: sayIt,
            getVoices: getVoices,
            stopPlay: stopPlay
        };
    })
    .factory('speechRecognition', function ($rootScope) {
        var service = {};

        // COMMANDS
        service.commands = {};

        service.addCommand = function(phrase, callback) {
            var command = {};

            // Wrap annyang command in scope apply
            command[phrase] = function(args) {
                $rootScope.$apply(callback(args));
            };

            // Extend our commands list
            angular.extend(service.commands, command);

            // Add the commands to annyang
            annyang.addCommands(service.commands);
            console.debug('added command "' + phrase + '"', service.commands);
        };

        service.start = function() {
            annyang.addCommands(service.commands);
            annyang.debug(true);
            annyang.start();
        };

        service.stop = function() {
            annyang.abort();
        };

        return service;
    });


