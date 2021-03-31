import * as crypto from "crypto";

export const encrypt = (value) => {
  const secret = "jrjrjrjrjrjrjrjrjrjrjrjrjrjrjrjr";
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

export const decrypt = (value) => {
  const secret = "jrjrjrjrjrjrjrjrjrjrjrjrjrjrjrjr";
  const [iv, encrypted] = value.split(":");
  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secret),
    ivBuffer
  );
  let content = decipher.update(Buffer.from(encrypted, "hex"));
  content = Buffer.concat([content, decipher.final()]);
  return content.toString();
};
