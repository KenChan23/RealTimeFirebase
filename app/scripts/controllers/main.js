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
    var titleRef = rootRef.child('title');

    $scope.title = null;
    $scope.currentUser = null;
    $scope.currentText = null;
    $scope.messages = [];

    titleRef.once('value', function(snapshot){
      $scope.title = snapshot.val();
    });

    messagesRef.on('child_added', function(snapshot){
      $timeout(function(){
        var snapshotVal = snapshot.val();
        console.log(snapshotVal);
        $scope.messages.push({
          text: snapshotVal.text,
          user: snapshotVal.user,
          name: snapshot.name()
        });
      });
    });

    messagesRef.on('child_changed', function(snapshot){
      $timeout(function(){
        var snapshotVal = snapshot.val();
        console.log(snapshot.name());
        var message = findMessageByName(snapshot.name());
        console.log(message);
        console.log(snapshotVal);
        message.text = snapshotVal.text;
      });
    });
 
    function findMessageByName(name){
      var messageFound = null;
      for(var i = 0; i < $scope.messages.length; i++){
        var currentMessage = $scope.messages[i];
        console.log(currentMessage);
        if(currentMessage.name === name){
          messageFound = currentMessage;
          break;
        }
      }
      return messageFound;
    }

    messagesRef.on('child_removed', function(snapshot){
      $timeout(function(){
        deleteMessageByName(snapshot.name());
      });
    });

    function deleteMessageByName(name){
      for(var i = 0; i < $scope.messages.length; i++){
        var currentMessage = $scope.messages[i];
        if(currentMessage.name === name){
          $scope.messages.splice(i, 1);
          break;
        }
      }
    }

    // messagesRef.on('value', function(snapshot){
    //   $timeout(function(){
    //     var snapshotVal = snapshot.val();
    //     console.log(snapshotVal);
    //     $scope.messages = snapshotVal;
    //   });
    // });

    $scope.sendMessage = function(){
      var newMessage = {
        user: $scope.currentUser,
        text: $scope.currentText
      };
      console.log($scope);
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
