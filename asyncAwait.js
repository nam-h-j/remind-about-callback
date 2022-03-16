"use-strict";

//3. async, await
//1) 콜백 -> 프로미스 -> async, await : 순서로 진화
//2) 프로미스도 체이닝으로 하게 되면서 콜백만큼 심하지 않지만 계층구조가 발생하고 복잡해지는 단점이 발생한다.
//3) 새로운 것이 추가 된 것이 아니고 promise를 랩핑한 API(syntatic sugar라고 함 prototype => class)

//1. async 사용법
//fetchPromise()와 아래의 fetchAsync()는 결과같다.
//async 함수는 결과값을 담은 Promise객체를 리턴한다.
function fetchPromise() {
  return new Promise((resolve) => resolve("result-from-promise"));
}

async function fetchAsync() {
  return "result-from-async";
}

const getResultPromise = fetchPromise();
const getResultAsync = fetchAsync();
console.log(`promise => ${getResultPromise}`);
console.log(`async => ${getResultAsync}`);

//2. await 사용법
// async 함수 내에서만 사용가능하다.
function someTaskTakesTime(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function getAwaitResult() {
  await someTaskTakesTime(1000);
  return "singleAwaitTaskDone";
}

async function printResult() {
  const result = await getAwaitResult();
  return result;
}
printResult().then(console.log);

/*************************************************************************************/
//3. await 병렬 처리
function someTaskTakesTime(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
async function firstAwaitResult() {
  await someTaskTakesTime(1000);
  return "firstAwaitTaskDone";
}
async function secondAwaitResult() {
  await someTaskTakesTime(1000);
  return "secondAwaitTaskDone";
}
async function fastAwaitResult() {
  await someTaskTakesTime(500);
  return "fastAwaitTaskDone";
}
//1) 병렬처리 하지 않았을때
async function printResultEachTime() {
  const firstResult = await firstAwaitResult();
  const secondResult = await secondAwaitResult();
  return `[itWillTakes2sec] : ${firstResult} ${secondResult}`;
}
printResultEachTime().then(console.log);

//2) 병렬로 처리
async function printResultSameTime() {
  //await 하지 않고 프로미스를 할당하면 즉시 실행되고 다음 처리로 넘어감
  const firstResultPromise = firstAwaitResult();
  const secondResultPromise = secondAwaitResult();
  //결과 취득만 await 처리
  const firstResult = await firstResultPromise;
  const secondResult = await secondResultPromise;
  return `[itWillTakes1sec] : ${firstResult} ${secondResult}`;
}
printResultSameTime().then(console.log);

//3) 병렬로 처리, promise Api
//2)번 방식과 같은 결과가 나오지만 배열로 좀 더 깔끔하게 처리 가능
async function printAllResultSameTime() {
  //Promise.all => Promise 객체를 배열로 넘기면 결과를 배열로 받을 수 있음
  return Promise.all([firstAwaitResult(), secondAwaitResult()]).then(
    (resultAll) => `[itWillTakes1secWithPromiseArray] : ${resultAll.join(" ")}`
  );
}
printAllResultSameTime().then(console.log);

//4) 먼저 성공한 값만 출력하기
async function printDataGetEarlier() {
  return Promise.race([firstAwaitResult(), fastAwaitResult()]);
}
printDataGetEarlier().then(console.log);
/*****************************************************************************************************************/

class User {
  //1.아이디, 비밀번호를 받아서 userid를 취득
  userLogin(userid, pwd) {
    return new Promise((resolve, reject) => {
      if (
        (userid === "iamvip" && pwd === "pass") ||
        (userid === "iamuser" && pwd === "pass")
      ) {
        resolve(userid);
        console.log(userid);
      } else {
        reject(new Error("login fail"));
      }
    });
  }
  //2. 로그인이 성공하면 userid로 유저 정보를 취득
  getUserInfo(userid) {
    return new Promise((resolve, reject) => {
      if (userid === "iamvip") {
        resolve({ userid: userid, amount: "20000" });
      } else if (userid === "iamuser") {
        resolve({ userid: userid, amount: "10" });
      } else {
        reject(new Error("fail to get your amount"));
      }
    });
  }
  //3. 유저의 amount 정보를 가지고 유저의 티어를 결정
  gerUserTire(amount, userid) {
    return new Promise((resolve, reject) => {
      if (amount > 10000) {
        resolve({ userid: userid, amount: amount, tire: "VIP" });
      } else if (amount < 10000 && amount > 0) {
        resolve({ userid: userid, amount: amount, tire: "user" });
      } else {
        reject(new Error("something went wrong"));
      }
    });
  }
}

const initApp = () => {
  const id = prompt("put your id");
  const pwd = prompt("put your password");
  const getUser = async () => {
    try {
      const userid = await user.userLogin(id, pwd);
      const userinfo = await user.getUserInfo(userid);
      const usertire = await user.gerUserTire(userinfo.amount, userinfo.userid);
      alert(
        `userid : ${usertire.userid} | amount : ${usertire.amount} | tire : ${usertire.tire}`
      );
    } catch {
      console.log("!!!");
    }
  };
  getUser();
};

const user = new User();
const startApp = confirm("push ok to start");
if (startApp) {
  initApp();
  alert("end this App");
}
