angular.module('kanjiApp').factory('saveListDb', ['$http', function($http) {
    var obj = {};

    obj.getSaveLists = function() {
        return {
            then: function(fn) {
              $http.get('/saved/').then(function(res) {
                fn(res.data);
              });
            }
        };
    };

    obj.createSavedList = function(name) {
        return {
            then: function(fn) {
                $http({
                    method: 'POST',
                    url:'/saved/list/new',
                    data: {"name":name}
                }).then(function(res) {
                    if (res.data.insertedCount === 1) {
                        fn(res.data.ops[0]);
                    }
                });
            }
        };
    };

    obj.deleteSavedList = function(savedList) {
        return {
            then: function(fn) {
                $http({
                    method: 'POST',
                    url: '/saved/list/delete',
                    data: {"id":savedList._id}
                }).then(function(res) {
                    fn(res.data);
                });
            }
        }
    };

    obj.addListElement = function(savedList, element) {
        return {
            then: function(fn) {
                $http({
                    method: 'POST',
                    url: '/saved/item/new',
                    data: {"listId" : savedList._id,
                           "element" : element}
                }).then(function(res) {
                    fn(res.data);
                });
            }
        };

    };

    obj.deleteListElement = function(savedList, element) {
        return {
            then: function(fn) {
                $http({
                    method: 'POST',
                    url: '/saved/item/delete',
                    data: {"listId" : savedList._id,
                           "element" : element}
                }).then(function(res) {
                    fn(res.data);
                });
            }
        };
    };

    return obj;
}]);