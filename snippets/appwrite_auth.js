import config from "../configs/config"
import { Client, Account, ID } from "appwrite"

export class AuthService {
    client = new Client();
    account;

    //for otimization
    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectID);

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return this.login(email, password)
            }
            else {
                return userAccount
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    async login(email, password) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            console.error(error)
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        }
        catch (error) {
            console.log("appwrite: GetCurrentUser error:", error)
        }

        return null
    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        }
        catch (error) {
            console.log("appwrite: Logout error:", error)
        }
    }


}


const authService = new AuthService()

export default authService

