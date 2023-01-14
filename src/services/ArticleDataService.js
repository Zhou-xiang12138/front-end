import http from "../http-common";
class ArticleDataService {
  get(id) {
    console.log('ccc')
    return http.get(`/treatment/getById/${id}`);
  }
  create(data) {

    console.log("hhhhh")
    return http.post("/treatment/add", data);
  }
  update(id, data) {

    console.log(data);
    console.log('uuuuuuuu');
    return http.post(`/treatment/update/${id}`, data);
  }
  delete(id) {
    return http.delete(`/treatment/del/${id}`);
  }

  applyPosition(id, userId) {
    return http.post(`/treatment/apply/${id}`, userId);
  }

  getAll() {
    return http.get(`/treatment/list`);
  }

  findByTitle(title) {
    console.log(`/treatment/search/${title}`)
    return http.get(`/treatment/search/${title}`);
  }
}
export default new ArticleDataService();


/*
const removePalindromeSub = function(str) {

  if (str === "" || str === null) {
    return 0;
  }
  let isPalindrome = true;
  let n = str.length;
  for (let i = 0;i < n;i++) {
    if (str[i] !== str[n - i - 1]) {
      isPalindrome = false;
    }
  }

  return isPalindrome ? 1 : 2;
}
*/

const findRepeatItem = function (arr) {

  let res = [];
  let n = arr.length;
  for (let i = 0;i < n;i++) {
    let count = 1;
    for(let j = 0;j < i;j++) {
      if (arr[i] === arr[j]) {
        count++;
      }
    }
    if (count === 2) {
      res.push(arr[i])
    }
  }

  return res;
}

console.log(findRepeatItem([1,2,2,2,2,2,2]))