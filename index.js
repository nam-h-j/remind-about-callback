"use-strict";

// STEP1 CALL BACK HELL
class User {
  //1.아이디, 비밀번호를 받아서 userid를 취득
  userLogin(userid, pwd, success, error) {
    if (
      (userid === "iamvip" && pwd === "pass") ||
      (userid === "iamuser" && pwd === "pass")
    ) {
      success(userid);
      console.log(userid);
    } else {
      error(new Error("login fail"));
    }
  }
  //2. 로그인이 성공하면 userid로 유저 정보를 취득
  getUserInfo(userid, success, error) {
    if (userid === "iamvip") {
      success({ userid: userid, amount: "20000" });
    } else if (userid === "normal") {
      success({ userid: userid, amount: "10" });
    } else {
      error(new Error("fail to get your amount"));
    }
  }
  //3. 유저의 amount 정보를 가지고 유저의 티어를 결정
  gerUserTire(amount, userid, success, error) {
    if (amount > 10000) {
      success({ userid: userid, amount: amount, tire: "VIP" });
    } else if (amount < 10000 && amount > 0) {
      success({ userid: userid, amount: amount, tire: "user" });
    } else {
      error(new Error("something went wrong"));
    }
  }
}

//콜백으로 처리했을때
const callbackApp = () => {
  const id = prompt("put your id");
  const pwd = prompt("put your password");

  user.userLogin(
    id,
    pwd,
    (userid) => {
      user.getUserInfo(
        userid,
        (userinfo) => {
          user.gerUserTire(
            userinfo.amount,
            userinfo.userid,
            (usertire) => {
              alert(
                `userid : ${usertire.userid} | amount : ${usertire.amount} | tire : ${usertire.tire}`
              );
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
};

//프로미스로 처리했을때
//State : pending - fullfilled or rejected

//1. Producer
//새로운 프로미스를 만들면 excutor 콜백이 바로 실행된다.
//excuter => resolve, reject를 가진 콜백

//2. Consumers : then, catch, finally
//
//promise.then((value)=>{})
const promiseApp = () => {
  const id = prompt("put your id");
  const pwd = prompt("put your password");

  user.userLogin(
    id,
    pwd,
    (userid) => {
      user.getUserInfo(
        userid,
        (userinfo) => {
          user.gerUserTire(
            userinfo.amount,
            userinfo.userid,
            (usertire) => {
              alert(
                `userid : ${usertire.userid} | amount : ${usertire.amount} | tire : ${usertire.tire}`
              );
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
};

const asyncApp = () => {
  const id = prompt("put your id");
  const pwd = prompt("put your password");

  user.userLogin(
    id,
    pwd,
    (userid) => {
      user.getUserInfo(
        userid,
        (userinfo) => {
          user.gerUserTire(
            userinfo.amount,
            userinfo.userid,
            (usertire) => {
              alert(
                `userid : ${usertire.userid} | amount : ${usertire.amount} | tire : ${usertire.tire}`
              );
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
};

const user = new User();
const startApp = confirm("push ok to start");
if (startApp) {
  const whichFunction = prompt(
    "callback = put [c], promise = put [p], async = put [a]"
  );
  if (whichFunction === "c") {
    callbackApp();
  } else if (whichFunction === "p") {
    promiseApp();
  } else if (whichFunction === "a") {
    asyncApp();
  }
}
alert("end this App");
