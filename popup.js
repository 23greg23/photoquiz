var $ = jQuery;

function popUpFunction () {
    var answers = $(".possible_answer");
    var answerArray = [];
    var numOfAnswers = $(".question_container").length;

    answers.each( function() {
      $(this).on("click", function() {
        var parent = $(this).closest(".question_container");

        if ( parent.hasClass("answer-selected") ) {

        } else {
          parent.addClass("answer-selected");
          answerArray.push(this);

          if ( answerArray.length === numOfAnswers ) {
            $(".how_you_did").addClass("quizCompleted");
          }
        }

      });
    });

    $(".close").on("click", function() {
      $(".how_you_did").removeClass("quizCompleted");
    });
}
