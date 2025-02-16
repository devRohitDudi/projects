import config from "../configs/config.js"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    // for optimization
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectID);

        this.account = new Account(this.client)
    }

    // async createAccount({ email, password, name }) {
    async createAccount(data) {
        try {
            // const userAccount = await this.account.create(ID.unique(), email, password, name)
            const userAccount = await this.account.create(ID.unique(), data.email, data.password, data.name)

            if (userAccount) {
                return this.login(data.email, data.password)
            }
            return userAccount

        }
        catch (error) {
            console.error("Appwrite: Create Account Error:", error);
            throw error;
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            console.error("Appwrite-Login :", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        }
        catch (error) {
            console.error("Appwrite: Get Current User :", error);
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        }
        catch (error) {
            console.error("Appwrite: Logout :", error);
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService

