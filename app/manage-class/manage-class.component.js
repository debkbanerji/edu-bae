angular.module('manageClass').component('manageClass', {
    templateUrl: 'manage-class/manage-class.template.html',

    controller: ['$firebaseObject', function manageClassController($firebaseObject) {
        var self = this;
        self.classRef = firebase.database().ref().child("root/debug/class");
        self.categoriesRef = self.classRef.child("categories");
        self.questionsRef = self.classRef.child("questions");

        self.categoriesObject = $firebaseObject(self.categoriesRef);
        self.questionsObject = $firebaseObject(self.questionsRef);

        self.categories = [];
        self.questions = [];
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

        self.categoriesRef.on('child_added', function (categorySnapshot, prevChildKey) {
            self.categories.push(categorySnapshot.getKey());

            // add listener for getting appropriate questions
            self.questionsRef.child(categorySnapshot.getKey()).on('child_added', function (questionSnapshot, prevChildKey) {
                console.log("question", questionSnapshot.getKey());
                self.questions.push({
                    "text:": questionSnapshot.getKey(),
                    "category": categorySnapshot.getKey()
                });
            });

            // TODO: add listener for removing appropriate questions
        });

        self.categoriesRef.on('child_removed', function (childSnapshot, prevChildKey) {
            // console.log("category child", childSnapshot.getKey());
            var index = self.categories.indexOf(childSnapshot.getKey());
            if (index > -1) {
                self.categories.splice(index, 1);
            }
            console.log("Removed child");
        });
    }]
});