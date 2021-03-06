
(function(a) {
    a.quiz = function(b, c) {
        var d, e, f = [],
            g, h = {
                container: "quiz_container",
                init: function(a, b) {
                    e = this;
                    if (b)
                        for (var c in b) e[c] = b[c];
                    if (typeof a == "string") return e.make_quiz_from_google_spreadsheet(a), e;
                    e.quiz_data = a, e.create_cover();
                    for (var d = 0; d < e.quiz_data.length; d++) e.append_question(d);
                    return e.append_how_you_did_section(), e;

                    // $(".quiz_container").popUpFunction();
                },
                append_how_you_did_section: function() {
                    g = jQuery('<span class="correct_answers">0</span>');
                    var a = jQuery('<div class="how_you_did"></div>');
                    var content = jQuery('<div class="result-content"><button class="close">X</button></div>');

                    var twitterUrl = "'https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Furl%3Dhttps%253A%252F%252Fhuskynunews.wpengine.com%252F2018%252F03%252F15%252Fcampus-photo-hunt%252F%26text%3DCampus%2520Photo%2520Hunt','myTwitterWin','width=620,height=350'"

                    var facebookUrl = "'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fhuskynunews.wpengine.com%2F2018%2F03%2F15%2Fcampus-photo-hunt%2F','myFacebookWin','width=620,height=350'"

                    var social = '<ul class="article-footer__socials"><li class="article-topper__social-item article-topper__social-item--twitter "><a class="article-topper__social-link article-topper__social-link--twitter qs-link" data-qs-service="twitter" data-qs-url="https://huskynunews.wpengine.com/2018/03/15/campus-photo-hunt/" data-qs-title="Campus Photo Hunt" href="javascript:window.open(' + twitterUrl + '); void(0)">Twitter</a></li><li class="article-topper__social-item article-topper__social-item--facebook "><a class="article-topper__social-link article-topper__social-link--facebook qs-link" data-qs-service="facebook-share" data-qs-url="https://huskynunews.wpengine.com/2018/03/15/campus-photo-hunt/" href="javascript:window.open(' + facebookUrl + '); void(0)">Facebook</a></li></ul>'

                    a.append(content);
                    content.append(jQuery("<span><h3>Great job! You got </h3></span>")), content.append(g), content.append(jQuery("<span> <h3>correct answers out of " + e.quiz_data.length + " questions.</h3></span>" + "<div class='social'>" + social + "</div>")), cover.append(a)

                    return popUpFunction();
                },
                make_quiz_from_google_spreadsheet: function(a) {
                    Tabletop.init({
                        key: a,
                        callback: function(a) {
                            var b = e.make_quiz_data_from_spreadsheet_data(a);
                            e.init(b, c)
                        },
                        prettyColumnNames: 0,
                        simpleSheet: !0
                    })
                },
                _pull_answer_value_from_spreadsheet: function(a, b, c, d) {
                    var d = d ? "correct" : "wrong";
                    return a[d + c + b] ? a[d + c + b] : a[d + b] ? a[d + b] : a["answer" + b] ? a["answer" + b] : a["question" + b]
                },
                get_possible_answers: function(a, b) {
                    var c = [],
                        d = b ? "correct" : "wrong";
                    a[d] && c.push(e.make_possible_answer(a, "", b));
                    for (var f = 0; f < 10; f++) a[d + f] && c.push(e.make_possible_answer(a, f, b));
                    return c
                },
                make_possible_answer: function(a, b, c) {
                    var d = c ? "correct" : "wrong";
                    return {
                      answer: a[d + b],
                      correct: c,
                      title: e._pull_answer_value_from_spreadsheet(a, "title", b, c),
                      text: e._pull_answer_value_from_spreadsheet(a, "text", b, c),
                      middleimage: e._pull_answer_value_from_spreadsheet(a, "middleimage", b, c),
                      map: e._pull_answer_value_from_spreadsheet(a, "map", b, c),
                      backgroundimage: e._pull_answer_value_from_spreadsheet(a, "backgroundimage", b, c)
                  }
                },
                make_quiz_data_from_spreadsheet_data: function(a) {
                    var b = [];
                    for (var c = 0; c < a.length; c++) {
                        var d = a[c],
                            f = e.get_possible_answers(d, !1),
                            g = e.get_possible_answers(d, !0),
                            h = [];
                        for (var i = 0; i < g.length; i++) h.push(Math.round(Math.random() * f.length));
                        h.sort();
                        var j = [],
                            k = 0;
                        for (var i = 0; i <= f.length; i++) {
                            while (i === h[k]) j.push(g[k]), k++;
                            if (i === f.length) continue;
                            j.push(f[i])
                        }
                        var l = {
                            question: {
                                title: d.questiontitle,
                                text: d.questiontext,
                                middleimage: d.questionmiddleimage,
                                map: d.questionmap,
                                bottomimage: d.questionbottomimage,
                                backgroundimage: d.questionbackgroundimage
                            },
                            possible_answers: j,
                            rowNumber: d.rowNumber - 1
                        };
                        b.push(l)
                    }
                    return b
                },
                pull_youtube_id: function(a) {
                    if (!a) return;
                    return youtube_id = a.match(/=.*?$/), youtube_id ? youtube_id[0].replace("=", "") : ""
                },
                append_question: function(a) {
                    var b = e.quiz_data[a],
                        c = jQuery('<li class="question_container row-fluid question_' + a + '"></li>');
                    c.append(e.build_question_element_from_row(b)), c.append(e.build_revealed_answer_element_from_row(b)), c.append(e.build_possible_answer_elements_from_row(b, a)), d.append(c)
                },
                build_question_element_from_row: function(a) {
                  var b = a.question;
                  return jQuery('<div class="question span12 show" ' + (b.backgroundimage ? "style=\"background-image: url('" + b.backgroundimage + "');\">" : ">") + (b.topimage ? '<img src="' + b.topimage + '" class="topimage"></img>' : "") + (b.title ? "<h1>" + b.title + "</h1>" : "") + (b.middleimage ? '<img src="' + b.middleimage + '" class="middleimage"></img>' : "") + "<p>" + b.text + "</p>" + "</div>")
                },
                build_revealed_answer_element_from_row: function(a) {
                    var b = jQuery('<div class="revealed_answers_container_' + a.rowNumber + '"></div>');
                    for (var c = 0; c < a.possible_answers.length; c++) answer = a.possible_answers[c], b.append(jQuery('<div class="revealed_answer_' + c + ' revealed_answer span12 hide" ' + (answer.backgroundimage ? "style=\"background-image: url('" + answer.backgroundimage + "');\">" : ">") + (answer.title ? "<h1>" + answer.title + "</h1>" : "") + (answer.middleimage ? '<img src="' + answer.middleimage + '" class="middleimage"></img>' : "") + (answer.map ? '<div class="mapanswer"><iframe width="100%" height="400px" src=" '+ answer.map +' "></iframe></div>' : "") + "<p>" + answer.text + "</p>" + "</div>"));
                    return b
                },
                build_possible_answer_elements_from_row: function(b, c) {
                    var d = jQuery('<ul class="span12 possible_answers possible_answers_' + c + '"></ul>');
                    for (var g = 0; g < b.possible_answers.length; g++) {
                        var h = b.possible_answers[g],
                            i = jQuery('<li class="possible_answer span12 answer_' + g + '">' + h.answer + "</li>");
                        (function(b, c, g) {
                            g.bind("click", function() {
                                d.find(".selected").removeClass("selected"), a(this).addClass("selected"), a(this).removeClass("possible_answer");
                                var g = e.quiz_data[b].possible_answers[c].correct;
                                typeof f[b] == "undefined" && (f[b] = g, e.update_correct_answers_element(), cover.find(".question_" + b).addClass("first_guess_" + (g ? "correct" : "wrong"))), d.find(".answer_" + c).addClass(g ? "correct_answer" : "wrong_answer"), e.display_answer(b, c, g)
                            })
                        })(c, g, i), d.append(i)
                    }
                    return d
                },
                display_answer: function(a, b, c) {
                    d.find(".question_" + a + " .question").removeClass("show").addClass("hide"), d.find(".question_" + a + " .revealed_answer").removeClass("show").addClass("hide"), d.find(".question_" + a + " .revealed_answer_" + b).removeClass("hide").addClass("show")
                },
                create_cover: function() {
                    cover = a("#" + e.container), d = jQuery("<ul></ul>"), cover.append(d), d.addClass("quiz_container"), d.css("padding", "0px")
                },
                update_correct_answers_element: function() {
                    var a = 0;
                    for (var b = 0; b < e.quiz_data.length; b++) f[b] && a++;
                    g.text(a)
                }
            };
        return h.init(b, c)

    }, a.fn.quiz = function(b, c) {
        return c = c || {}, c.container = this.attr("id"), this.quiz = a.quiz(b, c), this

    }
})(jQuery);
