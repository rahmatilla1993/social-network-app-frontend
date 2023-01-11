import {Comment} from "./Comment";

export interface Post {
  id? : number,
  title : string,
  text : string,
  location : string,
  image? : File,
  likes? : number | any,
  usersLiked? : string[],
  comments? : Comment[],
  username? : string
}
