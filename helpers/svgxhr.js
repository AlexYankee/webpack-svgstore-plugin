/**
 * Load svg via ajax
 * @param  {string} url path to svg sprite
 * @generator: webpack-svgstore-plugin
 * @see: https://www.npmjs.com/package/webpack-svgstore-plugin
 * @return {[type]}     [description]
 */
function svgXHR(url, baseUrl) {
  var _ajax = new XMLHttpRequest();
  var _fullPath;

  if (typeof XDomainRequest !== 'undefined') {
    _ajax = new XDomainRequest();
  }

  if (typeof baseUrl === 'undefined') {
    if (typeof window.baseUrl !== 'undefined') {
      baseUrl = window.baseUrl;
    } else {
      baseUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
  }
  
  var urlParts = (baseUrl + url).replace('.//', '').split('://');
  var universalSchema = url.indexOf('//') === 0;

  if (universalSchema) {
    url = '//' + url.slice(2).replace(/\/{2,}/g, '/');
  } else {
    url = (urlParts.length === 2 ? urlParts[0] + '://' : '') + urlParts.pop().replace(/\/{2,}/g, '/');
  }

  _ajax.open('GET', url, true);

  _ajax.onprogress = function(){};

  _ajax.onload = function() {
    var div = document.createElement('div');
    div.innerHTML = _ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  };

  _ajax.send();
}
