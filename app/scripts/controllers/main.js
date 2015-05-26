'use strict';

/**
 * @ngdoc function
 * @name demoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the demoApp
 */
angular.module('demoApp')
  .controller('MainCtrl', function ($scope, $timeout) {

    var rootRef = new Firebase("https://glaring-heat-844.firebaseio.com/");
    var messagesRef = rootRef.child('messages');

    $scope.currentUser = null;
    $scope.currentText = null;

    messagesRef.on('value', function(snapshot){
      $timeout(function(){
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.messages = snapshotVal;
      });
    });

    $scope.sendMessage = function(){
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };

      messagesRef.push(newMessage);
    };

    /*
      Commented this out...
      Simple set, update and delete CRUD operations
    */

    // var rootRef = new Firebase("https://glaring-heat-844.firebaseio.com/");
    // var childRef = rootRef.child("message");
    // // var childRef = rootRef.child('message');
    // // var parentRef = childRef.parent();
    
    // childRef.on('value', function(snapshot){
    //   $timeout(function(){
    //     var snapshotVal = snapshot.val();
    //     console.log(snapshot);
    //     console.log(snapshotVal);
    //     $scope.message = snapshotVal;
    //   });
    // });

    // $scope.$watch('message.text', function(newVal){
    //   if(!newVal){
    //     return;
    //   }
    //   childRef.update({
    //     text: newVal
    //   });
    //   console.log(newVal);
    // });

    // $scope.setMessage = function(){
    //   childRef.set({
    //     user: 'Bob',
    //     text: 'Hi!'
    //   });
    // }

    // $scope.updateMessage = function(){
    //   // childRef.update({
    //   //   text: 'Bye'
    //   // });
    //   childRef.set({
    //     lastname: 'Smith'
    //   });
    // }

    // $scope.deleteMessage = function(){
    //   childRef.remove();
    // }
  });
