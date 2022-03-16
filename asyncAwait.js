"use-strict";

//3. async, await
//1) 콜백 -> 프로미스 -> async, await : 순서로 진화
//2) 프로미스도 체이닝으로 하게 되면서 콜백만큼 심하지 않지만 계층구조가 발생하고 복잡해지는 단점이 발생한다.
//3) 새로운 것이 추가 된 것이 아니고 promise를 랩핑한 API(syntatic sugar라고 함 prototype => class)

//1. async 사용법

async function fetchUser() {
  //if it took 10sec more for do request
  return "someResult";
}
const getResult = await fetchUser();

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
      } else if (userid === "normal") {
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

  user
    .userLogin(id, pwd)
    .then(user.getUserInfo)
    .then((userinfo) =>
      user.gerUserTire(userinfo.amount, userinfo.userid).then((usertire) => {
        alert(
          `userid : ${usertire.userid} | amount : ${usertire.amount} | tire : ${usertire.tire}`
        );
      })
    )
    .catch((error) => console.log(error));
};

const user = new User();
const startApp = confirm("push ok to start");
if (startApp) {
  initApp();
  alert("end this App");
}
