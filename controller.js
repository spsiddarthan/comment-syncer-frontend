angular.module('myApp', [])
    .controller('commentCtrl', commentCtrl)
    .constant('vm', function(){
        return {
            comment: ''
        };
    });

function commentCtrl($scope, vm, $http) {
    $scope.vm = vm();
    $scope.syncComment = function(newVal, oldVal) {
        $scope.oldVal = oldVal;
        $scope.newVal = newVal;
        var dmp = new diff_match_patch();
        var diffs = dmp.diff_main(oldVal, newVal);
        //hardcoding all values except for the comment and it's diff.
        var data = {
            "commentId": "1234",
            "questionId": "123",
            "commentText": $scope.vm.comment,
            "userId": "1234",
            "diffs": diffs
        };
        //Fire an API call to the messages end point, which in turn will fire a message to the microservice
        //that'll sync the comment.
        $http.post('http://localhost:3000/messages', data, {'headers' : {'Content-Type': 'application/json', 'Accept' : 'application/json'} })
            .success(function (data, status, headers, config) {
                console.log(data);
            })
            .error(function (data, status, header, config) {
                console.log('something went wrong');
            });
    };
}