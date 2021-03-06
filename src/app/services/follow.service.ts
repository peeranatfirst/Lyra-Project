import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class FollowService {

  constructor(private db: AngularFireDatabase) { }

  getFollowers(userId: string) {
    // Used to build the follower count
    return this.db.object(`followers/${userId}`)
  }
  getFollowing(followerId:string, followedId:string) {
    // Used to see if UserFoo if following UserBar
    return this.db.object(`following/${followerId}/${followedId}`)
  }
  follow(followerId: string, followedId: string) {
    this.db.object(`followers/${followedId}`).update({ [followerId]: true } )
    this.db.object(`following/${followerId}`).update({ [followedId]: true } )
  }
  unfollow(followerId: string, followedId: string) {
    this.db.object(`followers/${followedId}/${followerId}`).remove()
    this.db.object(`following/${followerId}/${followedId}`).remove()
  }

}
