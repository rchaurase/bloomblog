import conf from '../conf/conf'
import {Client,Databases,Storage,ID,Query} from 'appwrite'

export class Service{
  client = new Client();
  databses;
  bucket;
  constructor(){
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
    this.databses  = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }
  async createPost({title,slug,content,featuredImage,status,userId}){
     try {
      await this.databses.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      )
     } catch (error) {
      console.log(`appwrite service error post is not created:${error}`)
     }
  }
  async updatePost(slug,{title,content,featuredImage,status}){
    try {
      this.databses.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status
        }
      )
    } catch (error) {
      console.log(`post is not updated:${error}`)
    }
  }
  async deletePost(slug){
    try {
      this.databses.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
      return true
    } catch (error) {
      console.log(`your post is not deleted:${error}`)
      return false
    }
  }
  async getPost(slug){
    try {
      return await this.databses.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      )
    } catch (error) {
      console.log(`you are not getting post:${error}`)
    }
  }
  async getAllPost(queries = [Query.equal('status','active')]){
    try {
      return await this.databses.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,

      )
    } catch (error) {
      console.log(`you are not getting all document:${error}`)
    }
  }
  // services for file uploaded

  async uploadFile(file){
     try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
     } catch (error) {
      console.log(`you are not getting file:${error}`)
     }
  }
  async deleteFile(fileId){
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
    } catch (error) {
      console.log(`your file is not deleted:${error}`)
      return false
    }
  }
  async getFilePreview(fileId){
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      )
    } catch (error) {
      console.log(`getFilePreview is not working:${error}`)
    }
  }
}

const service = new Service()

export default service
