import { v4 as uuid, validate } from 'uuid';
import { User } from "../types/User";
import { InvalidUserDataError, InvalidUserIdError, UserNotFoundError } from "../utils/errors";

class Database {
    private users: User[];

    constructor() {
        this.users = [];
    }

    private findUserIndex(id: string) {
        const index = this.users.findIndex((u) => u.id === id);
        if (index < 0) throw new UserNotFoundError();
        return index;
    }
    private validateId(id: string) {
        if (!validate(id)) throw new InvalidUserIdError();
    }
    private validateProperty(data: Partial<User>, property: "username" | "age" | "hobbies") {
        const value = data[property];
        if (value === undefined || value === null) throw new InvalidUserDataError();
    }

    getUsers() { return this.users }

    findUser(id: string) {
        this.validateId(id);
        const index = this.findUserIndex(id);
        return this.users[index];
    }

    addUser(data: Omit<User, "id">) {
        this.validateProperty(data, "username");
        this.validateProperty(data, "age");
        this.validateProperty(data, "hobbies");
        const dbData = { ...data, id: uuid() };
        this.users.push(dbData);
        return data
    }

    editUser(id: string, data: Partial<User>) {
        this.validateId(id)
        const index = this.findUserIndex(id);
        if (data["age"] !== undefined) {
            this.validateProperty(data, "age");
            this.users[index].age = data.age;
        }
        if (data["username"] !== undefined) {
            this.validateProperty(data, "username");
            this.users[index].username = data.username;
        }
        if (data["hobbies"] !== undefined) {
            this.validateProperty(data, "hobbies");
            this.users[index].hobbies = data.hobbies;
        }
        return this.users[index];
    }

    deleteUser(id: string) {
        this.validateId(id);
        const index = this.findUserIndex(id);
        this.users.splice(index, 1);
    }
}

const database = new Database();
export default database;