import request from 'supertest';
import mongoose from 'mongoose';
import app from '@src/app';
import User from '@models/user';
// import en from '@locales/en/translation.json';
// import ar from '@locales/ar/translation.json';
// import config from '@src/config';
import { expect } from '@jest/globals';

const validUser = {
  email: 'amouissaden@gmail.com',
  password: 'Pass123!',
};

beforeEach((done) => {
  mongoose.connect(
    'mongodb://localhost:27017/volunteer-db-test',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

const registerUser = (user = validUser, options = {}) => {
  const agent = request(app).post('/api/v1/auth/register');
  if (options.language) {
    agent.set('Accept-Language', options.language);
  }
  return agent.send(user);
};

describe('User Registration', () => {
  it('Sanity check', () => {
    expect(1).toBe(1);
  });
  it('returns 200 when register request is valid', async () => {
    const response = await registerUser();
    expect(response.status).toBe(201);
  });
  it('saves user to database', async () => {
    await registerUser();
    const userList = await User.find();
    expect(userList.length).toBe(1);
  });
  it('saves username as email to database', async () => {
    await registerUser();
    const userList = await User.find();
    const createdUser = userList[0];
    expect(createdUser.email).toBe(validUser.email);
    expect(createdUser.username).toBe(validUser.email);
  });
  it('returns 400 if email is registered already', async () => {
    await User.create({ ...validUser });
    const response = await registerUser();
    expect(response.status).toBe(400);
    const validationParam = Object.keys(response.body.messages[0])[0];
    expect(validationParam).toBe('email');
  });

  /*
   * Email
   */

  /*
   * Locale
   */
  // it("returns validation message when email is null", async () => {
  //   const invalidUser = {
  //     // password: "12345",
  //   };
  //   await registerUser(invalidUser);
  //   const response = await registerUser();
  //   console.log("it -> esponse.data.messages", response.body);
  //   expect(response.body.messages.length).toBe(1);
  //   expect(Object.keys(response.body.messages[0])).toBe(["email"]);
  // });
  //   it.each`
  // //     field         | value              | expectedMessage
  // //     ${"username"} | ${null}            | ${tr.username_null}
  // //     ${"username"} | ${"usr"}           | ${tr.username_size}
  // //     ${"username"} | ${"a".repeat(33)}  | ${tr.username_size}
  // //     ${"email"}    | ${null}            | ${tr.email_null}
  // //     ${"email"}    | ${"mail.com"}      | ${tr.email_invalid}
  // //     ${"email"}    | ${"user.mail.com"} | ${tr.email_invalid}
  // //     ${"email"}    | ${"user@mail"}     | ${tr.email_invalid}
  // //     ${"password"} | ${null}            | ${tr.password_null}
  // //     ${"password"} | ${"P4ssw"}         | ${tr.password_size}
  // //     ${"password"} | ${"alllowercase"}  | ${tr.password_pattern}
  // //     ${"password"} | ${"ALLUPPERCASE"}  | ${tr.password_pattern}
  // //     ${"password"} | ${"1234567890"}    | ${tr.password_pattern}
  // //     ${"password"} | ${"lowerandUPPER"} | ${tr.password_pattern}
  // //     ${"password"} | ${"lower4nd5667"}  | ${tr.password_pattern}
  // //     ${"password"} | ${"UPPER44444"}    | ${tr.password_pattern}
  // //   `(
  // //     "returns $expectedMessage when $field is $value when language is set as turkish",
  // //     async ({ field, expectedMessage, value }) => {
  // //       const user = {
  // //         username: "user1",
  // //         email: "user1@mail.com",
  // //         password: "P4ssword",
  // //       };
  // //       user[field] = value;
  // //       const response = await postUser(user, { language: "tr" });
  // //       const body = response.body;
  // //       expect(body.validationErrors[field]).toBe(expectedMessage);
  // //     }
  // //   );
});

// describe('User Registration Localized', () => {
// it.each`
// //     field         | value              | expectedMessage
// //     ${"username"} | ${null}            | ${tr.username_null}
// //     ${"username"} | ${"usr"}           | ${tr.username_size}
// //     ${"username"} | ${"a".repeat(33)}  | ${tr.username_size}
// //     ${"email"}    | ${null}            | ${tr.email_null}
// //     ${"email"}    | ${"mail.com"}      | ${tr.email_invalid}
// //     ${"email"}    | ${"user.mail.com"} | ${tr.email_invalid}
// //     ${"email"}    | ${"user@mail"}     | ${tr.email_invalid}
// //     ${"password"} | ${null}            | ${tr.password_null}
// //     ${"password"} | ${"P4ssw"}         | ${tr.password_size}
// //     ${"password"} | ${"alllowercase"}  | ${tr.password_pattern}
// //     ${"password"} | ${"ALLUPPERCASE"}  | ${tr.password_pattern}
// //     ${"password"} | ${"1234567890"}    | ${tr.password_pattern}
// //     ${"password"} | ${"lowerandUPPER"} | ${tr.password_pattern}
// //     ${"password"} | ${"lower4nd5667"}  | ${tr.password_pattern}
// //     ${"password"} | ${"UPPER44444"}    | ${tr.password_pattern}
// //   `(
// //     "returns $expectedMessage when $field is $value when language is set as turkish",
// //     async ({ field, expectedMessage, value }) => {
// //       const user = {
// //         username: "user1",
// //         email: "user1@mail.com",
// //         password: "P4ssword",
// //       };
// //       user[field] = value;
// //       const response = await postUser(user, { language: "tr" });
// //       const body = response.body;
// //       expect(body.validationErrors[field]).toBe(expectedMessage);
// //     }
// //   );
// })
