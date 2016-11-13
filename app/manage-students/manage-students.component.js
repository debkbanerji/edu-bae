/*angular.module('manageStudents').component('manageStudents', {
    templateUrl: 'manage-students/manage-students.template.html',

    controller: [function manageStudentsController() {
        var self = this;
    }]
});*/

angular.module('manageStudents').component('manageStudents', {
    templateUrl: 'manage-students/manage-students.template.html',

    controller: ['$firebaseObject', function manageStudentsController($firebaseObject) {
        var self = this;
        self.classRef = firebase.database().ref().child("root/debug/class");
        self.studentsRef = self.classRef.child("students");
        self.categoriesRef = self.classRef.child("categories");
        self.studentsObject = $firebaseObject(self.studentsRef);
        self.categoriesObject = $firebaseObject(self.categoriesRef);

        self.grades = [];
        self.students = [];

        self.newStudent = "";
        self.newCategory = "";
        self.newGrade = "";

        self.studentsRef.on('child_added', function (studentsSnapshot, prevChildKey) {
            self.students.push({
                name : studentsSnapshot.getKey(),
                link : "/generate-test/?name=" + studentsSnapshot.getKey().toString(),
                tempGrade : null,
                tempCategory : ""
            });
            // add listener for getting appropriate questions
            self.studentsRef.child(studentsSnapshot.getKey()).on('child_added', function (studentSnapshot, prevChildKey) {
                self.grades.push({
                    name : studentsSnapshot.getKey(),
                    category : studentSnapshot.getKey(),
                    grade : studentSnapshot.val()
                });
            });
        });

        self.addGrade = function () {
            if (self.newCategory != "" && self.newGrade != null) {
                self.questionsRef.child(self.newQuestionCategory).child(self.newQuestionContent).set(true);
                self.newQuestionContent = "";
                self.newQuestionCategory = "";
            }
        };

        self.addStudent = function () {
            if (self.newStudent != "") {
                self.studentsRef.child(self.newStudent).set(true);
                self.newStudent = "";
            }
        };

        self.removeStudent = function (student) {
            self.studentsRef.child(student.name).set(null);
        };

        self.addGrade = function (student) {
            // console.log("clicked", student);
            n = student.tempGrade;
            if (!isNaN(parseFloat(n)) && isFinite(n) && n >= 0 && n <= 100 && student.tempCategory != null && student.tempCategory != "") { // if grade is a number between 0 and 100 and category is valid
                self.studentsRef.child(student.name).child(student.tempCategory).set(student.tempGrade);
            }
            student.tempCategory = "";
            student.tempGrade = null;
        };

        self.studentsRef.on('child_removed', function (studentSnapshot, prevChildKey) {
            var index = -1;
            for (var i = 0; i < self.students.length; i++) {
                if (self.students[i].name == studentSnapshot.getKey()) {
                    index = i;
                }
            }
            // console.log("index", index);
            if (index > -1) {
                self.students.splice(index, 1);
            }
            for (var i = 0; i < self.grades.length; i++) {
                if (self.grades[i].name == studentSnapshot.getKey()) {
                    index = i;
                }
            }
            if (index > -1) {
                self.grades.splice(index, 1);
            }
        });
    }]
});