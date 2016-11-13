angular.module('manageClass').component('manageClass', {
    templateUrl: 'manage-class/manage-class.template.html',

    controller: ['$firebaseObject', function manageClassController($firebaseObject) {
        var self = this;
        self.classRef = firebase.database().ref().child("root/debug/class");
        self.categoriesRef = self.classRef.child("categories");
        self.questionsRef = self.classRef.child("questions");

        self.categoriesObject = $firebaseObject(self.categoriesRef);
        self.questionsObject = $firebaseObject(self.questionsRef);
        // putting a console.log here won't work due to the asynchronous call

        // handle loading of categories
        // self.categoriesObject.$loaded()
        //     .then(function (x) {
        //         console.log("CategoriesObject", x);
        //     })
        //     .catch(function (error) {
        //         console.log("Error:", error);
        //     });
        //
        // self.categoriesObject.$loaded()
        //     .then(function (x) {
        //         console.log("CategoriesObject", x);
        //     })
        //     .catch(function (error) {
        //         console.log("Error:", error);
        //     });

        self.categoriesRef.on('child_added', function(childSnapshot, prevChildKey) {
            console.log("category child", childSnapshot.getKey());
        });
    }]
});