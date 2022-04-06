import jwt from 'jsonwebtoken';

export const calNumber = (a: number, b: number) => a + b;

export const verifyToken = (token: string, secretKey: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
};
