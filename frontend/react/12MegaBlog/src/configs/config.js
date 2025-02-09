const config = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    projectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    collectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config