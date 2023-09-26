export function getCookie(key: string) {
  console.log(document.cookie);
  const cookieValue = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)"); 
  //Regex -> everything that is at start or starts with ; ++ 0 or many whitespaces ++ key ++ 0 or many whitespaces ++ = ++ 0 or many whitespaces ++ everything that is not ; 
  //Group 1 - match everything that is at start or starts with ; => every time is empty string
  //Group 2 - match everything that is not ; => value of cookie
  return cookieValue ? cookieValue.pop() : ""; // returns an array with empty string and value of cookie -> using pop to get value
}
