import conf from '../conf/conf'
import {Account,Client,ID} from 'appwrite'

  export class AuthService{
    client = new Client();
    account;
    constructor() {
      this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
      this.account = new Account(this.client)
    }
    async createAccount({email,password,username}){
        try {
        const userAccount =   await this.account.create(ID.unique(),email,password,username)
        if(userAccount){
          return this.login({email,password})
        }else{
          return userAccount
        }
        } catch (error) {
          console.log(`your account is not created:${error}`)
        }
    }
    async login({email,password}){
      try {
      return  await this.account.createEmailSession(email,password)
      } catch (error) {
        console.log(`sorry your login is fail:${error}`)
      }
    }
    async getCurrentUser(){
      try {
        return await this.account.get()
      } catch (error) {
        console.log(`sorry you are are not getting current user:${error}`)
      }
      return null;
    }
    async logout(){
      try {
        return await this.account.deleteSessions()
      } catch (error) {
        console.log(`there is problem in your logout Service:${error}`)
      }
    }
  }

const authService = new AuthService()

// authService object of AuthService class

export default authService


