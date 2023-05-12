/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_ApiFromWeatherService_weatherApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/ApiFromWeatherService/weatherApi.js */ \"./src/js/ApiFromWeatherService/weatherApi.js\");\n/* harmony import */ var _js_ApiFromWeatherService_openWeatherMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/ApiFromWeatherService/openWeatherMap.js */ \"./src/js/ApiFromWeatherService/openWeatherMap.js\");\n/* harmony import */ var _js_ApiFromWeatherService_tomorrowIo_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/ApiFromWeatherService/tomorrowIo.js */ \"./src/js/ApiFromWeatherService/tomorrowIo.js\");\n/* harmony import */ var _js_geolocation_currentGeo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/geolocation/currentGeo.js */ \"./src/js/geolocation/currentGeo.js\");\n/* harmony import */ var _js_HTMLInteraction_eventListenersToDefeaultElem_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/HTMLInteraction/eventListenersToDefeaultElem.js */ \"./src/js/HTMLInteraction/eventListenersToDefeaultElem.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nasync function log() {\r\n  const forecastHour = 14\r\n  const needlessTime = { year: 2023, month: 5, day: 2, hour: 14 }\r\n  const currentPosition = await (0,_js_geolocation_currentGeo_js__WEBPACK_IMPORTED_MODULE_3__.currentGeoPositionRequest)()\r\n\r\n  const weatherData = await Promise.allSettled([\r\n    (0,_js_ApiFromWeatherService_openWeatherMap_js__WEBPACK_IMPORTED_MODULE_1__.currentWeatherDataOpenWeather)(currentPosition, needlessTime),\r\n    (0,_js_ApiFromWeatherService_weatherApi_js__WEBPACK_IMPORTED_MODULE_0__.currentWeatherDataOpenWeather)(currentPosition, needlessTime),\r\n    (0,_js_ApiFromWeatherService_tomorrowIo_js__WEBPACK_IMPORTED_MODULE_2__.currentWeatherOpenMeteo)(currentPosition, needlessTime),\r\n  ])\r\n  weatherData.forEach((item) => console.log(item.value.currentObjData))\r\n  weatherData.forEach((item) => console.log(item.value.forecastObjData))\r\n}\r\n\r\n//log()\r\n\r\n\r\n(0,_js_HTMLInteraction_eventListenersToDefeaultElem_js__WEBPACK_IMPORTED_MODULE_4__.addListenersToDefaultElem)()\r\n\n\n//# sourceURL=webpack://weather_app/./src/index.js?");

/***/ }),

/***/ "./src/js/ApiFromWeatherService/generalFunctionsApi.js":
/*!*************************************************************!*\
  !*** ./src/js/ApiFromWeatherService/generalFunctionsApi.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentTimeString\": () => (/* binding */ currentTimeString),\n/* harmony export */   \"forecastTimeString\": () => (/* binding */ forecastTimeString),\n/* harmony export */   \"roundData\": () => (/* binding */ roundData)\n/* harmony export */ });\n//to round up the data\r\nfunction roundData(data) {\r\n  return !data ? 0 : Math.round(data)\r\n}\r\n\r\n//future time as a string\r\nfunction forecastTimeString(obj) {\r\n  function zeroBefore(numb) {\r\n    return numb < 10 ? `0${numb}` : numb\r\n  }\r\n  const YYYYMMDD =\r\n    obj.year + '-' + zeroBefore(obj.month) + '-' + zeroBefore(obj.day)\r\n  const HHMMSS = zeroBefore(obj.hour) + ':00:00'\r\n  return `${YYYYMMDD} ${HHMMSS}`\r\n}\r\n\r\n//current time\r\nfunction currentTimeString() {\r\n  const today = new Date()\r\n  function zeroBefore(numb) {\r\n    return numb < 10 ? `0${numb}` : numb\r\n  }\r\n  const date =\r\n    today.getFullYear() +\r\n    '-' +\r\n    zeroBefore(today.getMonth() + 1) +\r\n    '-' +\r\n    zeroBefore(today.getDate())\r\n  const time =\r\n    zeroBefore(today.getHours()) +\r\n    ':' +\r\n    zeroBefore(today.getMinutes()) +\r\n    ':' +\r\n    zeroBefore(today.getSeconds())\r\n  return date + ' ' + time\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/ApiFromWeatherService/generalFunctionsApi.js?");

/***/ }),

/***/ "./src/js/ApiFromWeatherService/openWeatherMap.js":
/*!********************************************************!*\
  !*** ./src/js/ApiFromWeatherService/openWeatherMap.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentWeatherDataOpenWeather\": () => (/* binding */ currentWeatherDataOpenWeather)\n/* harmony export */ });\n/* harmony import */ var _generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generalFunctionsApi.js */ \"./src/js/ApiFromWeatherService/generalFunctionsApi.js\");\n\r\n\r\n//url for Api call\r\nfunction urlInstall(coord) {\r\n  const link = 'https://api.openweathermap.org/data/2.5/'\r\n  const appiKey = '2baa06e0c482aa255b85406c646badf4'\r\n  const urlCurrent = `${link}weather?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&appid=${appiKey}`\r\n  //5 day forecast with a 3-hour step!!!\r\n  const urlForecast = `${link}forecast?lat=${coord.latitude}&lon=${coord.longitude}&units=metric&appid=${appiKey}`\r\n  return { urlCurrent, urlForecast }\r\n}\r\n\r\n//because response has step 3 hour\r\nfunction roundForecastTime(obj) {\r\n  let neededHour = 0\r\n  if (!(obj.hour % 3)) neededHour = obj.hour\r\n  else if (!((obj.hour + 1) % 3)) neededHour = obj.hour + 1\r\n  else neededHour = obj.hour - 1\r\n\r\n  const transformObj = {}\r\n  Object.assign(transformObj, obj)\r\n  transformObj.hour = neededHour\r\n\r\n  return (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.forecastTimeString)(transformObj)\r\n}\r\n\r\n//search for the necessary data in forecast response\r\nfunction searchNecessaryData(data, hour) {\r\n  const time = roundForecastTime(hour)\r\n  const dataArray = Array.from(data)\r\n  return dataArray.find((item) => item.dt_txt == time)\r\n}\r\n\r\nfunction selectingRequiredFields(obj, status, time) {\r\n  const {\r\n    main: { feels_like = 0, temp = 0 },\r\n    wind: { deg = 0, speed = 0 },\r\n    clouds: { all = 0 },\r\n    rain = 0,\r\n  } = obj || {}\r\n\r\n  const data = {\r\n    tempFeelsLike: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(feels_like),\r\n    temperature: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(temp),\r\n    windDirection: deg,\r\n    windMs: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(speed),\r\n    cloud: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(all),\r\n    time: status == 'forecast' ? roundForecastTime(time) : (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.currentTimeString)(),\r\n    precipMm: rain && status == 'current' ? rain[0] : rain,\r\n    rainChance: rain,\r\n  }\r\n  return data\r\n}\r\n\r\n// weatherapi GeoCoding Api https://www.weatherapi.com/api-explorer.aspx#current\r\nasync function currentWeatherDataOpenWeather(coordinate, forecastTime) {\r\n  try {\r\n    const url = urlInstall(coordinate)\r\n\r\n    //current response\r\n    const responseCurrent = await fetch(url.urlCurrent)\r\n    const responseDataCurrent = await responseCurrent.json()\r\n    const currentObjData = selectingRequiredFields(\r\n      responseDataCurrent,\r\n      'current'\r\n    )\r\n\r\n    //forecast response\r\n    const responseForecast = await fetch(url.urlForecast)\r\n    const responseDataForecast = await responseForecast.json()\r\n    const responseDataForecastNecessary = searchNecessaryData(\r\n      responseDataForecast.list,\r\n      forecastTime\r\n    )\r\n\r\n    const forecastObjData = selectingRequiredFields(\r\n      responseDataForecastNecessary,\r\n      'forecast',\r\n      forecastTime\r\n    )\r\n\r\n    return { currentObjData, forecastObjData }\r\n  } catch (e) {\r\n    console.error('Error>>', e)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/ApiFromWeatherService/openWeatherMap.js?");

/***/ }),

/***/ "./src/js/ApiFromWeatherService/tomorrowIo.js":
/*!****************************************************!*\
  !*** ./src/js/ApiFromWeatherService/tomorrowIo.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentWeatherOpenMeteo\": () => (/* binding */ currentWeatherOpenMeteo)\n/* harmony export */ });\n/* harmony import */ var _generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generalFunctionsApi.js */ \"./src/js/ApiFromWeatherService/generalFunctionsApi.js\");\n\r\n\r\n//url for Api call\r\nfunction urlInstall(coord) {\r\n  const link = 'https://api.tomorrow.io/v4/weather/' //forecast?location=\r\n  const appiKey = 'hj1xE00KFr9xD6TtSPC0LAr0zkbl8Knh'\r\n  const urlCurrent = `${link}realtime?location=${coord.latitude},${coord.longitude}&units=metric&apikey=${appiKey}`\r\n  //5 day forecast!!!\r\n  const urlForecast = `${link}forecast?location=${coord.latitude},${coord.longitude}&timesteps=1h&units=metric&apikey=${appiKey}`\r\n  return { urlCurrent, urlForecast }\r\n}\r\n\r\n//convert time to find in request \"2023-04-27T04:00:00Z\"\r\nfunction convertTime(frcstTime) {\r\n  const forecastTime = (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.forecastTimeString)(frcstTime)\r\n  return forecastTime.replace(' ', 'T') + 'Z'\r\n}\r\n\r\nfunction searchNecessaryData(response, data) {\r\n  const formattedTime = convertTime(data)\r\n  return response.timelines.hourly.find((item) => item.time == formattedTime)\r\n}\r\n\r\nfunction selectingRequiredFields(obj, status, time) {\r\n  const {\r\n    temperatureApparent = 0,\r\n    temperature = 0,\r\n    windDirection = 0,\r\n    windSpeed = 0,\r\n    cloudCover = 0,\r\n    rainAccumulation = 0,\r\n    precipitationProbability = 0,\r\n  } = obj\r\n\r\n  const data = {\r\n    tempFeelsLike: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(temperatureApparent),\r\n    temperature: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(temperature),\r\n    windDirection: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(windDirection),\r\n    windMs: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(windSpeed),\r\n    cloud: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(cloudCover),\r\n    time: status == 'forecast' ? convertTime(time) : (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.currentTimeString)(),\r\n    precipMm: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(rainAccumulation),\r\n    rainChance: precipitationProbability,\r\n  }\r\n\r\n  return data\r\n}\r\n\r\n//https://docs.tomorrow.io/reference/aviation\r\nasync function currentWeatherOpenMeteo(coordinate, forecastTime) {\r\n  try {\r\n    const url = urlInstall(coordinate)\r\n\r\n    //current response\r\n    const responseCurrent = await fetch(url.urlCurrent)\r\n    const responseDataCurrent = await responseCurrent.json()\r\n\r\n    const currentObjData = selectingRequiredFields(\r\n      responseDataCurrent.data.values,\r\n      'current',\r\n      forecastTime\r\n    )\r\n\r\n    //forecast response\r\n    const responseForecast = await fetch(url.urlForecast)\r\n    const responseDataForecast = await responseForecast.json()\r\n\r\n    const needlessResponseDataForecast = searchNecessaryData(\r\n      responseDataForecast,\r\n      forecastTime\r\n    )\r\n\r\n    const forecastObjData = selectingRequiredFields(\r\n      needlessResponseDataForecast.values,\r\n      'forecast',\r\n      forecastTime\r\n    )\r\n\r\n    return { currentObjData, forecastObjData }\r\n  } catch (e) {\r\n    console.error('Error>>', e)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/ApiFromWeatherService/tomorrowIo.js?");

/***/ }),

/***/ "./src/js/ApiFromWeatherService/weatherApi.js":
/*!****************************************************!*\
  !*** ./src/js/ApiFromWeatherService/weatherApi.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentWeatherDataOpenWeather\": () => (/* binding */ currentWeatherDataOpenWeather)\n/* harmony export */ });\n/* harmony import */ var _generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generalFunctionsApi.js */ \"./src/js/ApiFromWeatherService/generalFunctionsApi.js\");\n\r\n\r\n//url for Api call\r\n//30 days!!!\r\nfunction urlInstall(coord) {\r\n  const linkForecast = 'http://api.weatherapi.com/v1/forecast.json?key='\r\n  const appiKey = '97999080c0624b248b4120332232304'\r\n  const days = 5\r\n  const url = `${linkForecast}${appiKey}&q=${coord.latitude}, ${coord.longitude}&days=${days}&aqi=no&alerts=no`\r\n  return url\r\n}\r\n\r\nfunction searchNecessaryData(array, date) {\r\n  function zeroBefore(numb) {\r\n    return numb < 10 ? `0${numb}` : numb\r\n  }\r\n  const needlessDate =\r\n    date.year + '-' + zeroBefore(date.month) + '-' + zeroBefore(date.day)\r\n  const needlessData = array.find((item) => item.date == needlessDate)\r\n  const needlessHourDate = needlessDate + ' ' + zeroBefore(date.hour) + ':00'\r\n  return needlessData.hour.find((item) => item.time == needlessHourDate)\r\n}\r\n\r\nfunction selectingRequiredFields(obj, status, time) {\r\n  let {\r\n    feelslike_c = 0,\r\n    temp_c = 0,\r\n    wind_degree = 0,\r\n    wind_kph = 0,\r\n    cloud = 0, //as %\r\n    precip_mm = 0,\r\n    rainChance = 0,\r\n  } = obj\r\n\r\n  const data = {\r\n    tempFeelsLike: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(feelslike_c),\r\n    temperature: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(temp_c),\r\n    windDirection: wind_degree,\r\n    windMs: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(wind_kph / 3.6),\r\n    cloud: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(cloud),\r\n    time: status == 'forecast' ? (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.forecastTimeString)(time) : (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.currentTimeString)(),\r\n    precipMm: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(precip_mm),\r\n    rainChance: (0,_generalFunctionsApi_js__WEBPACK_IMPORTED_MODULE_0__.roundData)(rainChance),\r\n  }\r\n  return data\r\n}\r\n\r\n// weatherapi GeoCoding Api https://www.weatherapi.com/api-explorer.aspx#current\r\nasync function currentWeatherDataOpenWeather(coordinate, forecastTime) {\r\n  try {\r\n    const url = urlInstall(coordinate)\r\n    const response = await fetch(url)\r\n    const responseData = await response.json()\r\n    // console.log(responseData)\r\n\r\n    const currentObjData = selectingRequiredFields(\r\n      responseData.current,\r\n      'current'\r\n    )\r\n\r\n    const needlessResponseDataForecast = searchNecessaryData(\r\n      responseData.forecast.forecastday,\r\n      forecastTime\r\n    )\r\n    const forecastObjData = selectingRequiredFields(\r\n      needlessResponseDataForecast,\r\n      'forecast',\r\n      forecastTime\r\n    )\r\n\r\n    return { currentObjData, forecastObjData }\r\n  } catch (e) {\r\n    console.error('Error>>', e)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/ApiFromWeatherService/weatherApi.js?");

/***/ }),

/***/ "./src/js/HTMLInteraction/createDropdawn.js":
/*!**************************************************!*\
  !*** ./src/js/HTMLInteraction/createDropdawn.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"onInputChange\": () => (/* binding */ onInputChange)\n/* harmony export */ });\nfunction onInputChange(arr, elem) {\r\n  deleteAllDropdawnElement()\r\n  const input = elem\r\n  const ul = document.createElement('ul')\r\n  ul.className = 'autocomplete-list'\r\n  arr.forEach((item) => createDropdawnElement(item, ul, input))\r\n\r\n  document.addEventListener('click', (e) => clickNotOnDropdawnElement(e, input))\r\n\r\n  const autocompleteBlock = elem.closest('.autocomplete__block')\r\n  autocompleteBlock.append(ul)\r\n}\r\n\r\nfunction createDropdawnElement(element, list, input) {\r\n  const li = document.createElement('li')\r\n  li.className = 'autocomplete-list__item'\r\n  const button = document.createElement('button')\r\n  button.className = 'autocomplete-list__button'\r\n  button.textContent = element.displayName\r\n  button.addEventListener('click', function () {\r\n    fillingInput(this, input)\r\n  })\r\n\r\n  li.append(button)\r\n  list.append(li)\r\n}\r\n\r\nfunction deleteAllDropdawnElement() {\r\n  const autocompleteList = document.querySelectorAll('.autocomplete-list')\r\n  autocompleteList.forEach((item) => {\r\n    const parent = item.parentNode\r\n    parent.removeChild(item)\r\n  })\r\n}\r\n\r\nfunction clickNotOnDropdawnElement(event, input) {\r\n  if (!event.target.classList.contains('autocomplete-list__button')) {\r\n    deleteAllDropdawnElement()\r\n    input.value = ''\r\n  }\r\n}\r\n\r\nfunction fillingInput(button, parentInput) {\r\n  parentInput.value = button.textContent\r\n  deleteAllDropdawnElement()\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/HTMLInteraction/createDropdawn.js?");

/***/ }),

/***/ "./src/js/HTMLInteraction/eventListenersToDefeaultElem.js":
/*!****************************************************************!*\
  !*** ./src/js/HTMLInteraction/eventListenersToDefeaultElem.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addListenersToDefaultElem\": () => (/* binding */ addListenersToDefaultElem)\n/* harmony export */ });\n/* harmony import */ var _viewButtons_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./viewButtons.js */ \"./src/js/HTMLInteraction/viewButtons.js\");\n/* harmony import */ var _inputRequest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./inputRequest.js */ \"./src/js/HTMLInteraction/inputRequest.js\");\n\r\n\r\n\r\nfunction addListenersToDefaultElem() {\r\n  //listeners for button\r\n  (0,_viewButtons_js__WEBPACK_IMPORTED_MODULE_0__.addViewButtonListeners)()\r\n\r\n  //listeners for input\r\n  const listeners = document.querySelectorAll('.autocomplete__input')\r\n  listeners.forEach((item) =>\r\n    item.addEventListener('input', _inputRequest_js__WEBPACK_IMPORTED_MODULE_1__.addingListenerToInput)\r\n  )\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/HTMLInteraction/eventListenersToDefeaultElem.js?");

/***/ }),

/***/ "./src/js/HTMLInteraction/inputRequest.js":
/*!************************************************!*\
  !*** ./src/js/HTMLInteraction/inputRequest.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addingListenerToInput\": () => (/* binding */ addingListenerToInput)\n/* harmony export */ });\n/* harmony import */ var _createDropdawn_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDropdawn.js */ \"./src/js/HTMLInteraction/createDropdawn.js\");\n\r\n\r\nfunction addingListenerToInput() {\r\n  const fn = debounce(requestInput, 500).bind(this)\r\n  fn()\r\n}\r\n\r\n//Неправильно?\r\nlet timeout\r\n\r\nfunction debounce(func, delay) {\r\n  return function () {\r\n    const context = this\r\n    clearTimeout(timeout)\r\n    timeout = setTimeout(function () {\r\n      const fn = func.bind(context)\r\n      fn()\r\n    }, delay)\r\n  }\r\n}\r\n\r\n//https://yandex.ru/dev/maps/jsapi/doc/2.1/ref/reference/SuggestView.html\r\nasync function requestInput() {\r\n  try {\r\n    const request = await ymaps.suggest(this.value)\r\n    console.log(request)\r\n\r\n    const arrayFromRequestResponse = await request.reduce(\r\n      (acc, item) => [...acc, item],\r\n      []\r\n    )\r\n    ;(0,_createDropdawn_js__WEBPACK_IMPORTED_MODULE_0__.onInputChange)(arrayFromRequestResponse, this)\r\n  } catch (e) {\r\n    console.error('Error>>', e)\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/HTMLInteraction/inputRequest.js?");

/***/ }),

/***/ "./src/js/HTMLInteraction/viewButtons.js":
/*!***********************************************!*\
  !*** ./src/js/HTMLInteraction/viewButtons.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"addViewButtonListeners\": () => (/* binding */ addViewButtonListeners)\n/* harmony export */ });\n/* harmony import */ var _inputRequest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inputRequest.js */ \"./src/js/HTMLInteraction/inputRequest.js\");\n/* harmony import */ var _RoutesApiYandex_createMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../RoutesApiYandex/createMap.js */ \"./src/js/RoutesApiYandex/createMap.js\");\n\r\n\r\n\r\nfunction addViewButtonListeners() {\r\n  const buttonAdd = document.querySelector('.button-add')\r\n  const buttonReset = document.querySelector('.button-reset')\r\n  const buttonCreateRoute = document.querySelector('.button-create-route')\r\n\r\n  buttonReset.addEventListener('click', clearAllInput)\r\n  buttonAdd.addEventListener('click', addInput)\r\n  buttonCreateRoute.addEventListener('click', creatingArrayOfPoints)\r\n}\r\n\r\nfunction clearAllInput() {\r\n  const autocompleteBlock = document.querySelectorAll('.autocomplete__block')\r\n  if (autocompleteBlock.length > 2) {\r\n    autocompleteBlock.forEach((item, index) => {\r\n      if (index == 1) {\r\n        item.querySelector('.autocomplete__input').placeholder = 'Куда'\r\n      }\r\n      if (index > 1) {\r\n        const parent = item.closest('.autocomplete-wrapper')\r\n        parent.removeChild(item)\r\n      }\r\n    })\r\n  }\r\n  const allInput = document.querySelectorAll('.autocomplete__input')\r\n  allInput.forEach((item) => (item.value = ''))\r\n}\r\n\r\nfunction addInput() {\r\n  const autocompleteWrapper = document.querySelector('.autocomplete-wrapper')\r\n  const autocompleteBlock = document.querySelectorAll('.autocomplete__block')\r\n  if (autocompleteBlock.length < 5) {\r\n    const lastChild = autocompleteWrapper.lastElementChild\r\n    const newAutocompleteBlock = lastChild.cloneNode(true)\r\n    const newAutocompleteInput = newAutocompleteBlock.querySelector(\r\n      '.autocomplete__input'\r\n    )\r\n    newAutocompleteInput.addEventListener('input', _inputRequest_js__WEBPACK_IMPORTED_MODULE_0__.addingListenerToInput)\r\n    newAutocompleteInput.placeholder = 'Куда'\r\n    newAutocompleteInput.value = ''\r\n    lastChild.querySelector('.autocomplete__input').placeholder =\r\n      'Промежуточная точка'\r\n    autocompleteWrapper.append(newAutocompleteBlock)\r\n  }\r\n}\r\n\r\nfunction creatingArrayOfPoints() {\r\n  const allInput = Array.from(document.querySelectorAll('.autocomplete__input'))\r\n  if (!validationInputСheck(allInput).length) {\r\n    const allInputResult = allInput.reduce((acc, item) => {\r\n      acc.push(item.value)\r\n      return acc\r\n    }, [])\r\n\r\n    requestForPoints(allInputResult)\r\n  }\r\n}\r\n\r\nfunction validationInputСheck(arr) {\r\n  const invalidInput = arr.filter((item) => item.value == '')\r\n  invalidInput.forEach((item) => {\r\n    item.style.boxShadow = '0 0 3px red'\r\n    setTimeout(() => (item.style.boxShadow = 'none'), 1500)\r\n  })\r\n  return invalidInput\r\n}\r\n\r\nfunction requestForPoints(arr) {\r\n  const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=`\r\n  const appiKey = '688efe04-e23e-42f4-98a7-b8cea7d40838'\r\n\r\n  const result = []\r\n  console.log(result)\r\n\r\n  let promise = new Promise((res, rej) => {\r\n    arr.forEach(async (item) => {\r\n      const request = await fetch(`${url}${appiKey}&geocode=${item}`)\r\n      const response = await request.json()\r\n\r\n      let coordinate =\r\n        response.response.GeoObjectCollection.featureMember[0].GeoObject.Point\r\n          .pos\r\n      coordinate = coordinate\r\n        .split(' ')\r\n        .map((item) => (item = +item))\r\n        .reverse()\r\n      result.push(coordinate)\r\n    })\r\n    res()\r\n  })\r\n\r\n  console.log(result.length)\r\n  ;(0,_RoutesApiYandex_createMap_js__WEBPACK_IMPORTED_MODULE_1__.createMapAndRoute)(result)\r\n\r\n  // arr.forEach(async (item) => {\r\n  //   const request = await fetch(`${url}${appiKey}&geocode=${item}`)\r\n  //   const response = await request.json()\r\n\r\n  //   let coordinate =\r\n  //     response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos\r\n  //   coordinate = coordinate\r\n  //     .split(' ')\r\n  //     .map((item) => (item = +item))\r\n  //     .reverse()\r\n\r\n  //   result.push(coordinate)\r\n  //   createMapAndRoute(result)\r\n  // })\r\n  // console.log(result)\r\n  // createMapAndRoute(result)\r\n}\r\n\r\n// arr.forEach(async (item) => {\r\n//   const request = await fetch(`${url}${appiKey}&geocode=${item}`)\r\n//   const response = await request.json()\r\n\r\n//   let coordinate =\r\n//     response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos\r\n//   coordinate = coordinate\r\n//     .split(' ')\r\n//     .map((item) => (item = +item))\r\n//     .reverse()\r\n\r\n//   result.push(coordinate)\r\n//   console.log(result)\r\n//   createMapAndRoute(result)\r\n// })\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/HTMLInteraction/viewButtons.js?");

/***/ }),

/***/ "./src/js/RoutesApiYandex/createMap.js":
/*!*********************************************!*\
  !*** ./src/js/RoutesApiYandex/createMap.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createMapAndRoute\": () => (/* binding */ createMapAndRoute)\n/* harmony export */ });\n/* harmony import */ var _geolocation_currentGeo_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../geolocation/currentGeo.js */ \"./src/js/geolocation/currentGeo.js\");\n// import { multiRoute } from './routeBuilding.js'\r\n\r\n\r\n//https://yandex.ru/dev/maps/jsbox/2.1/request_map\r\n//https://yandex.ru/dev/maps/jsapi/doc/2.1/terms/index.html\r\n\r\n//Неправильно?\r\nlet myMap = null\r\n\r\nfunction createMapAndRoute(arrayOfCoordinates) {\r\n  ymaps.ready(() => init(arrayOfCoordinates))\r\n}\r\n\r\nasync function init(arr) {\r\n  const curentCoordinate = await (0,_geolocation_currentGeo_js__WEBPACK_IMPORTED_MODULE_0__.currentGeoPositionRequest)()\r\n  if (myMap) {\r\n    myMap.destroy()\r\n    myMap = null\r\n  }\r\n  // Создаем карту\r\n  myMap = new ymaps.Map('YMapsID', {\r\n    center: [`${curentCoordinate.latitude}`, `${curentCoordinate.longitude}`],\r\n    zoom: 9,\r\n    controls: [],\r\n  })\r\n\r\n  const abc = [\r\n    [55.354864, 37.617698],\r\n    [59.138955, 30.315644],\r\n  ]\r\n\r\n  console.log(abc, arr)\r\n  arr.forEach((item) => console.log(item))\r\n  const first = abc[0]\r\n  const second = arr[0]\r\n  console.log(first, second)\r\n\r\n  // Построение маршрута.\r\n  // По умолчанию строится автомобильный маршрут.\r\n  var multiRoute = new ymaps.multiRouter.MultiRoute(\r\n    {\r\n      // Точки маршрута. Точки могут быть заданы как координатами, так и адресом.\r\n      // referencePoints: [\r\n      //   [55.354864, 37.617698],\r\n      //   [59.138955, 30.315644],\r\n      // ],\r\n      referencePoints: arr,\r\n    },\r\n    {\r\n      // Автоматически устанавливать границы карты так,\r\n      // чтобы маршрут был виден целиком.\r\n      boundsAutoApply: true,\r\n    }\r\n  )\r\n\r\n  // Добавление маршрута на карту.\r\n  myMap.geoObjects.add(multiRoute)\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/RoutesApiYandex/createMap.js?");

/***/ }),

/***/ "./src/js/geolocation/currentGeo.js":
/*!******************************************!*\
  !*** ./src/js/geolocation/currentGeo.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"currentGeoPositionRequest\": () => (/* binding */ currentGeoPositionRequest)\n/* harmony export */ });\nfunction currentGeoPositionRequest() {\r\n  return new Promise((res, rej) => {\r\n    navigator.geolocation.getCurrentPosition(\r\n      (position) => {\r\n        const { latitude, longitude } = position.coords\r\n        res({ latitude, longitude })\r\n      },\r\n      (e) => rej(e)\r\n    )\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack://weather_app/./src/js/geolocation/currentGeo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;