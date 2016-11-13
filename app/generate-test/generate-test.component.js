angular.module('generateTest').component('generateTest', {
    templateUrl: 'generate-test/generate-test.template.html',

    controller: ['$routeParams', '$firebaseObject', '$firebaseArray', function generateTestController($routeParams, $firebaseObject, $firebaseArray) {
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
                        self.numQuestionsMap[categoryName] = (100 - grade) / ((100 * numCategories) - sumGrades);
                        // round number
                        self.numQuestionsMap[categoryName] = Math.round(self.numQuestionsMap[categoryName] * 10);
                    }
                }

                console.log("MAP", self.numQuestionsMap);

                var studentCategories = Object.keys(self.numQuestionsMap);
                for (i = 0; i < studentCategories.length; i++) {
                    var category = studentCategories[i];
                    var count = self.numQuestionsMap[studentCategories[i]];

                    // console.log("Category", category);
                    self.categoryRef = self.questionsRef.child(category);
                    // console.log("Category2", category);
                    var categoryObj = $firebaseObject(self.categoryRef);
                    console.log("CATEGORY", categoryObj);
                    categoryObj.$loaded(
                        function (categoryData) {
                            var possibleQuestions = Object.keys(categoryData);
                            console.log("COUNT", possibleQuestions);
                            console.log("category", category);
                            for (i = 0; i < possibleQuestions.length; i++) {
                                console.log("PUSH", possibleQuestions[i]);
                                if (possibleQuestions[i].charAt(0) != '$') {
                                    self.finalQuestions.push(possibleQuestions[i]);
                                }
                            }
                        },

                        function (error) {
                            console.error("Error:", error);
                        }
                    );

                }
            },
            function (error) {
                console.error("Error:", error);
            }
        );

    }]
});