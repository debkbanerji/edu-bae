angular.module('generateTest').component('generateTest', {
    templateUrl: 'generate-test/generate-test.template.html',

    controller: ['$routeParams', '$firebaseObject', function generateTestController($routeParams, $firebaseObject) {
        var self = this;
        self.studentName = $routeParams.name;
        self.classRef = firebase.database().ref().child("root/debug/class");
        n = new Date();
        y = n.getFullYear();
        m = n.getMonth() + 1;
        d = n.getDate();
        document.getElementById("generateDate").innerHTML = "Test Generated On: " + m + "/" + d + "/" + y;

        self.finalQuestions = [];
        self.numQuestionsMap = {}; // maps each category to the target number of questions

        self.questionsRef = self.classRef.child("questions");
        self.questionsObj = $firebaseObject(self.questionsRef);
        // self.categoriesRef = self.classRef.child("categories");
        // self.categoriesObj = $firebaseObject(self.categoriesRef);
        //
        self.studentsRef = self.classRef.child("students").child(self.studentName);
        self.studentsObj = $firebaseObject(self.studentsRef);

        // go through all categories for current student
        self.studentsObj.$loaded(
            function (studentData) {
                // choose questions
                var allKeys = Object.keys(studentData);
                var numCategories = 0;
                var sumGrades = 0;

                // sum up grades, find number of categories
                for (i = 0; i < allKeys.length; i++) {
                    if (allKeys[i].charAt(0) != '$') {
                        var categoryName = allKeys[i];
                        var grade = studentData[categoryName];
                        // console.log("Category Name", categoryName);
                        // console.log("Grade", grade);
                        numCategories++;
                        sumGrades += grade;
                    }
                }

                // calculate number of questions for each category
                for (i = 0; i < allKeys.length; i++) {
                    if (allKeys[i].charAt(0) != '$') {
                        categoryName = allKeys[i];
                        grade = studentData[categoryName];
                        // console.log("Category Name", categoryName);
                        // console.log("Grade", grade);
                        if (grade > 99) {
                            grade = grade - 1;
                        }
                        self.numQuestionsMap[categoryName] = (100 - grade)/((100* numCategories) - sumGrades);
                        // round number
                        self.numQuestionsMap[categoryName] = self.numQuestionsMap[categoryName] + 0.5;
                    }
                }
                console.log("MAP", self.numQuestionsMap);
            },
            function (error) {
                console.error("Error:", error);
            }
        );

        // // generate test
        // self.questionsObj.$loaded(
        //     function (data) {
        //         // choose questions
        //         var keys = Object.keys(data);
        //         for (i = 0; i < keys.length; i++) {
        //             if (keys[i].charAt(0) != '$') {
        //                 var categoryName = keys[i];
        //                 console.log("Data", categoryName);
        //                 var categoryRef = self.questionsRef.child(categoryName);
        //                 console.log("Category Name", categoryRef);
        //             }
        //         }
        //     },
        //     function (error) {
        //         console.error("Error:", error);
        //     }
        // );
    }]
});