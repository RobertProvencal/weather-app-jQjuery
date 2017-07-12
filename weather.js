/**
 * Created by robertprovencal on 7/10/17.
 */
(function($) {
    $(document).ready(function () {
        var api_url, city;

        if ("geolocation" in navigator) {

            $('#showTemp').on('click', function () {
                getLocation();

                function getWeatherIcon(code) {
                    var iconUrl = '<img src="http://openweathermap.org/img/w/' + code + '.png" style="height:100%;"';

                    return iconUrl;
                }
                function buildForecastUI(data) {
                    var date = new Date();
                    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    var today = date.getDay();

                    $('.results-list-container').empty();

                    for (var i=0, length=data.list.length-2; i<length; i++) {
                        var temp = data.list[i].temp;
                        var weather = data.list[i].weather[0];
                        var degrees = 'o';
                        var dateRow = '<span class="date col-xs-12">' + days[today++] + '</span>';
                        var tempRow = '<span class="temp-row  col-xs-12"><span class="high">' + Math.round(temp.max) + degrees.sup() + '</span> | ' + '<span class="low">' + Math.round(temp.min) + degrees.sup() + '</span></span>';
                        var iconRow = '<span class="icon-row col-xs-12">' + getWeatherIcon(weather.icon) + '</span>';
                        var description = '<span class="description col-xs-12 padding-0">' + weather.description + '</span>';
                        var day = '<div class="day col-xs-6 col-sm-2">' + dateRow + tempRow + iconRow + description + '</div>';
                        $('.results-list-container').append(day);

                        today = today > 6 ? 0 : today;
                    }
                }
                function getLocation() {
                    city = $('#cityName').val();

                    api_url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' +
                        city + '&units=metric&appid=34c45b355f791c4677b725585ba70c91';

                    // spinner
                    $('.fa.fa-spinner').removeClass('hidden');
                    $.ajax({
                        url : api_url,
                        method : 'GET',
                        success : function (data) {

                            console.log(data);
                            buildForecastUI(data);
                            // spinner
                            $('.fa.fa-spinner').addClass('hidden');
                        }
                    });
                }
            });

        } else {
            alert('Your browser doesnt support geolocation. Sorry.');
        }

    });
})(jQuery);
