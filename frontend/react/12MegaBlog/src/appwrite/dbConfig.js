import config from "../configs/config"
import { Client, ID, Databases, Storage, Query } from "appwrite"


export class DBService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectID);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, banner, status, userID }) {
        try {
            return await this.databases.createDocument(
                config.databaseID,
                config.collectionID,
                slug,
                {
                    title, content, banner, status, userID,
                }
            )
        }
        catch (error) {
            console.log("appwrite-createPost:", error)
        }
    }

    async updatePost(slug, { title, content, banner, status }) {
        try {
            return await this.databases.updateDocument(
                config.databaseID,
                config.collectionID,
                slug,
                {
                    title, content, banner, status
                }
            )
        } catch (error) {
            console.log("appwrite-updatePost:", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.databaseID,
                config.collectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("appwrite-deletePost:", error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.databaseID,
                config.collectionID,
                slug
            )
        } catch (error) {
            console.log("appwrite-getPost:", error)
            return false
        }
    }

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                config.databaseID,
                config.collectionID,
                [Query.equal('status', 'active')]
            )
        } catch (error) {
            console.log("appwrite-getPosts:", error)
        }
    }

    async uploadFile(file) {
        try {
            const fileID = await this.bucket.createFile(
                config.bucketID,
                ID.unique(),
                file
            )
            return fileID
        } catch (error) {
            console.log("appwrite-uploadFile:", error)
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                config.bucketID,
                fileID
            )
        } catch (error) {
            console.log("appwrite-deleteFile:", error)
            return false
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            config.bucketID,
            fileID
        )
    }


}

const dbService = new DBService()
export default dbService