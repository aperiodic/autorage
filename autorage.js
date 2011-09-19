function curry (){
  var left, right, func, self

  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i]

    if (!right && Array.isArray(value))
      if (!func)
        left = value
      else
        right = value
    else if (!func && typeof value === 'function')
      func = value
    else
      self = value
  }
  return function() {
   return func.apply(self,append([].concat(left || []),arguments).concat(right || []))
  }
}
function append (a, args) {
  for (var i = 0; i < args.length; i++)
    a.push(args[i])
  return a
}

var swapIfOk = function(imgUrl, el, data) {
  if (data === 'No faces found') {
    return;
  }
  var origUrl = imgUrl;
  var rageUrl = 'http://f7u12rl.com/image/?src=' + imgUrl;
  $(el).attr('src', rageUrl);
  $(el).hover(function deRage() { $(el).attr('src', origUrl) },
              function enRage() { $(el).attr('src', rageUrl) });
}

$(function() {
  $('img:visible').each(function(i,e) {
    if ($(this).width() * $(this).height() < 45000) return;
    chrome.extension.sendRequest({method: "isEnabled"}, function(response) {
      if (response.enabled != 'true') {
        return;
      }
      var originalImage = e.src;
      if (!originalImage) return;
      var imgStatus = "http://f7u12rl.com/status/?src=" + originalImage;
      $.get(imgStatus, curry([originalImage, e], swapIfOk));
    });    
  });
})
