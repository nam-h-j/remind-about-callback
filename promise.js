"use-strict";

//2. PROMISE
//1) State : pending - fullfilled or rejected

//2) Producer
//새로운 프로미스를 만들면 excutor 콜백이 바로 실행된다.
//excuter => resolve, reject를 가진 콜백

//3) Consumers : then, catch, finally

//promise.then((value)=>{})

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
