import apiFetch from "./api-fetch";

export async function startVerification(newVerification) {
  return await apiFetch('api/verification/start', { body: newVerification });
}

export async function verifyToken(newVerifyToken) {
  return await apiFetch('/api/verification/verify', { body: newVerifyToken });
}

/* startVerification({via: "sms", phone: "+528994466683"}).then((data) => {
      console.log("Verification started: ", data);
    }).catch((data) => {console.error("Phone verification error: ", data);})*/

/* verifyToken({token: "xxxxxx", phone: "+528994466683"}).then((data) => {
      console.log("Phone Verification Success success: ", data);
      phoneLogin(phone);
    }).catch((data) => {console.error("Verification error: ", data);})*/