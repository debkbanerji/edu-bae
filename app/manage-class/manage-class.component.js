angular.module('manageClass').component('manageClass', {
    templateUrl: 'manage-class/manage-class.template.html',

    controller: ['$firebaseObject', function manageClassController($firebaseObject) {
        var self = this;
        self.classRef = firebase.database().ref().child("root/debug/class");
        self.categoriesRef = self.classRef.child("categories");
        self.questionssRef = self.classRef.child("questions");

        self.categories = $firebaseObject(self.categoriesRef);
        // putting a console.log here won't work due to the asynchronous call
        // self.puzzles = $firebaseArray(self.puzzlesRef);

        self.categories.$loaded()
            .then(function (x) {
                console.log("TEST", x);
            })
            .catch(function (error) {
                console.log("Error:", error);
            });
    }]
});