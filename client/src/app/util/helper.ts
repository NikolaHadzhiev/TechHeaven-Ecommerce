export function getCookie(key: string) {
  const cookieValue = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"); 
  //Regex -> everything that is at start or starts with ; ++ 0 or many whitespaces ++ key ++ 0 or many whitespaces ++ = ++ 0 or many whitespaces ++ everything that is not ; 
  //Group 1 - match everything that is at start or starts with ; => every time is empty string
  //Group 2 - match everything that is not ; => value of cookie
  return cookieValue ? cookieValue.pop() : ""; // returns an array with empty string and value of cookie -> using pop to get value
}

export function createFormData(item: any) {
  let formData = new FormData()
  
  for (const key in item) {
    formData.append(key, item[key])
  }

  return formData;
}

export function parseJwt (token: string) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}
