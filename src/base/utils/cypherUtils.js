import crypto from "crypto-js";

export const encrypt = (value) => {
  const secret = "jR&z#NEJ%yH-Pk=BmARd*Q4:~uT#ypc9";
  // const iv = Buffer.from("1212943545745893");
  // const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
  // let encrypted = cipher.update(value);
  // encrypted = Buffer.concat([encrypted, cipher.final()]);
  // return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
  let cripted = crypto.AES.encrypt(value, secret).toString();
  decrypt(cripted);
  return cripted;
};

export const decrypt = (value) => {
  const secret = "jR&z#NEJ%yH-Pk=BmARd*Q4:~uT#ypc9";
  // const [iv, encrypted] = value.split(":");
  // const ivBuffer = Buffer.from(iv, "hex");
  // const decipher = crypto.createDecipheriv(
  //   "aes-256-cbc",
  //   Buffer.from(secret),
  //   ivBuffer
  // );
  // let content = decipher.update(Buffer.from(encrypted, "hex"));
  // content = Buffer.concat([content, decipher.final()]);
  // return content.toString();
  let bytes = crypto.AES.decrypt(value, secret);
  let decryptedData = bytes.toString(crypto.enc.Utf8);

  console.log(decryptedData);
  return decryptedData;
};
