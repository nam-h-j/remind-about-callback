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

//callback hell
const initApp = () => {
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
  initApp();
}
alert("end this App");
