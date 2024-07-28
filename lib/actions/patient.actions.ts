"use server";

import { users } from "../appwrite.config";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
      console.log("Creating user! 👤");
      try {
            const newUser = await users.create(
                  ID.unique(),
                  user.email,
                  user.phone,
                  undefined,
                  user.name
            );
            console.log("New User", newUser);
            return newUser;
      } catch (error: any) {
            console.log("In the error block!!", error);
            if (error && error?.code === 409) {
                  const documents = await users.list([Query.equal("email", [user.email])]);
                  return documents?.users[0];
            }
      }
};

// Get the current user
export const getUser = async(userID:string) => {
      try {
            const user = await users.get(userID);
            return parseStringify(user);
      } catch (error) {
            console.error(error)
      }
}
