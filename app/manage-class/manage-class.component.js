angular.module('manageClass').component('manageClass', {
    templateUrl: 'manage-class/manage-class.template.html',

    controller: ['$firebaseObject', function manageClassController($firebaseObject) {
        var self = this;
        var user = firebase.auth().currentUser;
        self.classRef = firebase.database().ref().child("users").child(user.uid).child("class");
        self.categoriesRef = self.classRef.child("categories");
        self.questionsRef = self.classRef.child("questions");

        self.categoriesObject = $firebaseObject(self.categoriesRef);
        self.questionsObject = $firebaseObject(self.questionsRef);

        self.categories = [];
        self.questions = [];

        self.newCategory = "";
        self.newQuestionContent = "";
        self.newQuestionCategory = "";
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

        self.addCategory = function () {
            if (self.newCategory != "") {
                self.categoriesRef.child(self.newCategory).set(true);
                self.newCategory = "";
            }
        };

        self.addQuestion = function () {
            if (self.newQuestionCategory != "" && self.newQuestionContent != null) {
                self.questionsRef.child(self.newQuestionCategory).child(self.newQuestionContent).set(true);
                self.newQuestionContent = "";
                self.newQuestionCategory = "";
            }
        };

        self.removeQuestion = function (question) {
            self.questionsRef.child(question.category).child(question.content).set(null);
        };

        self.categoriesRef.on('child_added', function (categorySnapshot, prevChildKey) {
            self.categories.push(categorySnapshot.getKey());

            // add listener for getting appropriate questions
            self.questionsRef.child(categorySnapshot.getKey()).on('child_added', function (questionSnapshot, prevChildKey) {
                self.questions.push({
                    "content": questionSnapshot.getKey(),
                    "category": categorySnapshot.getKey()
                });

            });

            self.questionsRef.child(categorySnapshot.getKey()).on('child_removed', function (questionSnapshot, prevChildKey) {
                var index = -1;
                for (var i = 0; i < self.questions.length; i++) {
                    if (self.questions[i].content == questionSnapshot.getKey()) {
                        index = i;
                    }
                }
                // console.log("index", index);
                if (index > -1) {
                    self.questions.splice(index, 1);
                }
            });
        });

        self.categoriesRef.on('child_removed', function (childSnapshot, prevChildKey) {
            // console.log("category child", childSnapshot.getKey());
            var index = self.categories.indexOf(childSnapshot.getKey());
            if (index > -1) {
                self.categories.splice(index, 1);
            }
        });
    }]
});