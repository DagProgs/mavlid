$(document).ready(function () {
    $.getJSON('https://dagprogs.github.io/apidb/mavlid/db.json', function (json) {
        container = $("#result");
        container.html("");

        var i = 1;

        $.each(json, function (key, value) {
            var dl = $("<dl><dt>" + i + "</dt><dt>" + value.first_name + "</dt><dd style='display:none;'>" + value.last_name + "</dd></dl>");
            container.append(dl);

            // Добавляем обработчик события клика
            dl.find('dt').on('click', function() {
                $(this).next('dd').slideToggle();
            });
            
            i++;
        });
    });
});