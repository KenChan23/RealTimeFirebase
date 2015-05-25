'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MainCtrl', function ($scope) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
    var rootRef = new Firebase("https://glaring-heat-844.firebaseio.com/");
    var childRef = rootRef.child("message");
    // var childRef = rootRef.child('message');
    // var parentRef = childRef.parent();
    $scope.setMessage = function(){
      childRef.set({
        user: 'Bob',
        text: 'Hi!'
      });
    }

    $scope.updateMessage = function(){
      // childRef.update({
      //   text: 'Bye'
      // });
      childRef.set({
        lastname: 'Smith'
      });
    }
  });
