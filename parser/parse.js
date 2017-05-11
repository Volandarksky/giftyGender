var request = require("request"),
  cheerio = require("cheerio"),
  fs = require("fs"),
  url = "https://www.google.ru/search?newwindow=1&client=ubuntu&hs=av6&channel=fs&q=%D0%BF%D0%BE%D0%B4%D0%B0%D1%80%D0%BE%D0%BA+%D0%B6%D0%B5%D0%BD%D1%89%D0%B8%D0%BD%D0%B5&spell=1&sa=X&ved=0ahUKEwjW-bnZksDTAhXnNJoKHZyYCXUQvwUIIigA#newwindow=1&channel=fs&q=%D0%BF%D0%BE%D0%B4%D0%B0%D1%80%D0%BA%D0%B8+%D0%B4%D0%BB%D1%8F+%D0%B6%D0%B5%D0%BD%D1%89%D0%B8%D0%BD";

  totalResults = 0,
  resultsDownloaded = 0;
  t = "";

function callback() {
  resultsDownloaded++;
  if (resultsDownloaded !== totalResults) {
    return;
  }

  // finally, log the first 200 most popular words
  //console.log(words.slice(0, 200));
  fs.writeFileSync("text/text.txt", t, "utf8");
}

request(url, function(error, response, body) {
  if (error) {
    console.log("Couldn’t get page because of error: " + error);
    return;
  }
  // загружаем тело страницы в Cheerio чтобы можно было работать с DOM
  var $ = cheerio.load(body),
    links = $(".r a");
  links.each(function(i, link) {
    // получаем атрибуты href для каждой ссылки
    var url = $(link).attr("href");
    // брезаем ненужный мусор
    url = url.replace("/url?q=", "").split("&")[0];
    if (url.charAt(0) === "/") {
      return;
    }
    // ссылка считается результатом, так что увеличиваем их количество
    totalResults++;
    // download that page
    request(url, function(error, response, body) {
      if (error) {
        console.log("Couldn’t get page because of error: " + error);
        return;
      }
      // загружаем страницу в Cheerio
      var $page = cheerio.load(body),
        text = $page("body").text();
      // избавляемся от лишних пробелов и нечисловых символов
      text = text.replace(/\s+/g, " ")
				.replace(/\[^0-9 ]/g, " ")
				.replace(/[^\u0430-\u044f\u0410-\u042F ]/g, "")
        .toLowerCase();
				// разбиваем по пробелу, чтобы получить список слов на странице,
				// и перебираем их в цикле
      text.split(" ").forEach(function(word) { //перебор массива
				// скорее всего, нам не нужно включать слишком короткие или слишком длинные слова,
  			// так как они, скорее всего, содержат бесполезные для нас данные
        if (word.length < 4 || word.length > 20) {
          return;
        }
        t = t + ' ' + word.toLowerCase();
      });
      // and when our request is completed, call the callback to wrap up!
      callback();
    });
  });
});
