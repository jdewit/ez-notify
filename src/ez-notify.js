'use_strict';

angular.module('ez.notify', ['ui.bootstrap'])

.controller('NotifyCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
  $scope.cancel = function() {
    $modalInstance.dismiss();
  };
}])

.service('Notify', ['$interval', '$modal', function($interval, $modal) {
  return {
    notify: function(header, text) {
      $modal.open({
        template: 'ez-notify-tpl.html',
        controller: 'NotifyCtrl',
        resolve: {
          header: function() {
            return header;
          },
          text: function() {
            return text;
          }
        }
      }).result.then(function(callback) {
        if (callback) {
          callback();
        }
      });
    }
  };
}]);
