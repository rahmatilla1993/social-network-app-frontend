import {Comment} from "./Comment";

export interface Post {
  id? : number,
  title : string,
  text : string,
  location : string,
  image? : File,
  likes? : number,
  usersLiked? : string[],
  comments? : Comment[],
  username? : string
}
