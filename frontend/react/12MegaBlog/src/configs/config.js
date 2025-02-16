const config = {
    appwriteURL: import.meta.env.VITE_APPWRITE_URL,
    databaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    projectID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    collectionID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    bucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID,
    tinymceKEY: import.meta.env.VITE_TINYMCE_API_KEY
    // appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    // databaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    // projectID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    // collectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    // bucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}

export default config