// main.js: 날씨 위젯용 스크립트 파일
// OpenWeatherMap API를 통해 날씨 정보를 가져와 표시합니다.

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '0072ea0b50034a11913112949251604'; // weatherapi.com API 키
    const defaultCity = 'Seoul';
    const cityNameElem = document.getElementById('city-name');
    const temperatureElem = document.getElementById('temperature');
    const weatherDescElem = document.getElementById('weather-desc');
    const localDateElem = document.getElementById('local-date');
    const weatherIconElem = document.getElementById('weather-icon');
    const feelslikeElem = document.getElementById('feelslike');
    const humidityElem = document.getElementById('humidity');
    const windElem = document.getElementById('wind');
    const precipElem = document.getElementById('precip');
    const weatherTipElem = document.getElementById('weather-tip');

    function fetchWeather(query) {
        // query: 도시명 또는 '위도,경도' 형식
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(query)}&lang=ko&days=5`;
        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('날씨 정보를 가져오지 못했습니다.');
                return response.json();
            })
            .then(data => {
                if (data.location) {
                    // 예: 서울특별시, 강남구, 대한민국 또는 Seoul, Seoul, South Korea
                    let nameParts = [];
                    if (data.location.name) nameParts.push(data.location.name);
                    if (data.location.region && data.location.region !== data.location.name) nameParts.push(data.location.region);
                    if (data.location.country && data.location.country !== data.location.region) nameParts.push(data.location.country);
                    cityNameElem.textContent = nameParts.join(', ');
                } else {
                    cityNameElem.textContent = query;
                }
                temperatureElem.textContent = data.current && typeof data.current.temp_c === 'number' ? `${data.current.temp_c}℃` : '-℃';
                weatherDescElem.textContent = data.current && data.current.condition ? data.current.condition.text : '정보 없음';
                localDateElem.textContent = data.location && data.location.localtime ? data.location.localtime.split(' ')[0] : '-';
                if (data.current && data.current.condition && data.current.condition.icon) {
                    weatherIconElem.src = data.current.condition.icon.startsWith('//') ? 'https:' + data.current.condition.icon : data.current.condition.icon;
                    weatherIconElem.style.display = '';
                } else {
                    weatherIconElem.style.display = 'none';
                }
                // 체감 온도
                feelslikeElem.textContent = data.current && typeof data.current.feelslike_c === 'number' ? `${data.current.feelslike_c}℃` : '-℃';
                // 습도
                humidityElem.textContent = data.current && typeof data.current.humidity === 'number' ? `${data.current.humidity}%` : '-%';
                // 풍속 (m/s)
                windElem.textContent = data.current && typeof data.current.wind_kph === 'number' ? `${(data.current.wind_kph / 3.6).toFixed(1)} m/s` : '- m/s';
                // 강수확률(강수량이 0보다 크면 100%, 아니면 0%)
                if (data.current && typeof data.current.precip_mm === 'number') {
                    precipElem.textContent = data.current.precip_mm > 0 ? '100%' : '0%';
                } else {
                    precipElem.textContent = '- %';
                }
                // 날씨 관련 팁
                let tip = '';
                const desc = data.current && data.current.condition ? data.current.condition.text : '';
                const temp = data.current && typeof data.current.temp_c === 'number' ? data.current.temp_c : null;
                const uv = data.current && typeof data.current.uv === 'number' ? data.current.uv : null;
                const rain = data.current && typeof data.current.precip_mm === 'number' ? data.current.precip_mm : 0;
                const wind = data.current && typeof data.current.wind_kph === 'number' ? data.current.wind_kph : 0;

                if (rain > 0 || /비|소나기|우박|천둥/.test(desc)) {
                    tip = '우산을 꼭 챙기세요!';
                } else if (desc.includes('눈')) {
                    tip = '미끄럼 주의! 따뜻하게 입으세요.';
                } else if (uv !== null && uv >= 6) {
                    tip = '자외선 차단제를 바르세요!';
                } else if (temp !== null && temp >= 30) {
                    tip = '폭염 주의! 수분을 충분히 섭취하세요.';
                } else if (temp !== null && temp <= 0) {
                    tip = '한파 주의! 따뜻하게 입으세요.';
                } else if (wind > 30) {
                    tip = '강풍 주의! 야외활동을 조심하세요.';
                } else if (desc.includes('맑음') && uv !== null && uv >= 3) {
                    tip = '야외활동 시 자외선에 주의하세요.';
                }

                if (tip) {
                    weatherTipElem.textContent = tip;
                    weatherTipElem.style.display = '';
                } else {
                    weatherTipElem.textContent = '';
                    weatherTipElem.style.display = 'none';
                }

                // 시간대별 예보 (오늘)
                const hourlyListElem = document.getElementById('hourly-list');
                if (data.forecast && data.forecast.forecastday && data.forecast.forecastday.length > 0) {
                    const todayHours = data.forecast.forecastday[0].hour;
                    hourlyListElem.innerHTML = todayHours
                        .filter(h => [0, 3, 6, 9, 12, 15, 18, 21].includes(new Date(h.time).getHours()))
                        .map(h => {
                            const hour = new Date(h.time).getHours();
                            const icon = h.condition.icon.startsWith('//') ? 'https:' + h.condition.icon : h.condition.icon;
                            return `
                              <div class="hourly-card">
                                <div class="hourly-hour">${hour}시</div>
                                <img src="${icon}" alt="icon" class="hourly-icon" />
                                <div class="hourly-temp">${h.temp_c}°</div>
                              </div>
                            `;
                        }).join('');
                } else {
                    hourlyListElem.innerHTML = '';
                }

                // 주간 예보 (요일별 한 줄 카드)
                const forecastListElem = document.getElementById('forecast-list');
                if (data.forecast && data.forecast.forecastday) {
                    forecastListElem.innerHTML = data.forecast.forecastday.map(day => {
                        const date = new Date(day.date);
                        const weekday = date.toLocaleDateString('ko-KR', { weekday: 'short' });
                        const icon = day.day.condition.icon.startsWith('//') ? 'https:' + day.day.condition.icon : day.day.condition.icon;
                        return `
                          <div class="weekly-card">
                            <div class="weekly-day">${weekday}</div>
                            <img src="${icon}" alt="icon" class="weekly-icon" />
                            <div class="weekly-desc">${day.day.condition.text}</div>
                            <div class="weekly-temp">${day.day.maxtemp_c}℃<span class="weekly-min">/${day.day.mintemp_c}℃</span></div>
                            <div class="weekly-rain">${day.day.daily_chance_of_rain || 0}%</div>
                          </div>
                        `;
                    }).join('');
                } else {
                    forecastListElem.innerHTML = '';
                }

                // 상태 뱃지 (미세먼지, 자외선 등)
                const statusBadgesElem = document.getElementById('status-badges');
                // 기존 weather-tip은 유지
                const tipElem = document.getElementById('weather-tip');
                statusBadgesElem.innerHTML = '';
                if (data.current && typeof data.current.uv === 'number') {
                    let uvLevel = data.current.uv;
                    let uvText = uvLevel >= 6 ? '자외선 매우 높음' : uvLevel >= 3 ? '자외선 보통' : '자외선 낮음';
                    let uvColor = uvLevel >= 6 ? 'bg-red-200 text-red-700' : uvLevel >= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700';
                    statusBadgesElem.innerHTML += `<span class='status-badge'>${uvText}</span>`;
                }
                // weather-tip(팁)은 항상 마지막에 추가
                if (tip) {
                    tipElem.classList.add('active');
                } else {
                    tipElem.classList.remove('active');
                }
                statusBadgesElem.appendChild(tipElem);
            })
            .catch(err => {
                cityNameElem.textContent = typeof query === 'string' ? query : defaultCity;
                temperatureElem.textContent = '-℃';
                weatherDescElem.textContent = '날씨 정보를 불러올 수 없습니다.';
                localDateElem.textContent = '-';
                weatherIconElem.style.display = 'none';
            });
    }

    // 위치 권한이 있으면 현 위치, 없으면 기본 도시로 날씨 표시
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lon = pos.coords.longitude;
                fetchWeather(`${lat},${lon}`);
            },
            (err) => {
                fetchWeather(defaultCity);
            }
        );
    } else {
        fetchWeather(defaultCity);
    }

    // 필요시, fetchWeather('Busan') 등으로 다른 도시도 조회 가능
});
