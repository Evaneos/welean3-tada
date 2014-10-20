(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({".//browser/js/main.js":[function(require,module,exports){
var angular = require('angular');
require('./controller');
},{"./controller":"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/index.js","angular":"angular"}],"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/TadaController.js":[function(require,module,exports){
'use strict';

module.exports = function($scope) {
    alert('ok');
};
},{}],"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/index.js":[function(require,module,exports){
'use strict';

var app = require('angular').module('tada', []);

app.controller('TadaController', require('./TadaController'));
},{"./TadaController":"/Users/yvanwibaux2/Workspace/welean3-tada/app/browser/js/controller/TadaController.js","angular":"angular"}]},{},[".//browser/js/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLy9icm93c2VyL2pzL21haW4uanMiLCIvVXNlcnMveXZhbndpYmF1eDIvV29ya3NwYWNlL3dlbGVhbjMtdGFkYS9hcHAvYnJvd3Nlci9qcy9jb250cm9sbGVyL1RhZGFDb250cm9sbGVyLmpzIiwiL1VzZXJzL3l2YW53aWJhdXgyL1dvcmtzcGFjZS93ZWxlYW4zLXRhZGEvYXBwL2Jyb3dzZXIvanMvY29udHJvbGxlci9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xucmVxdWlyZSgnLi9jb250cm9sbGVyJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgIGFsZXJ0KCdvaycpO1xufTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhcHAgPSByZXF1aXJlKCdhbmd1bGFyJykubW9kdWxlKCd0YWRhJywgW10pO1xuXG5hcHAuY29udHJvbGxlcignVGFkYUNvbnRyb2xsZXInLCByZXF1aXJlKCcuL1RhZGFDb250cm9sbGVyJykpOyJdfQ==
