import { configureStore, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let chatroom = createSlice({
  name: "chatroom",
  initialState: {
    currentChatroom: "0",
  },
  reducers: {
    setCurrentChatroom(state, chatroom) {
      state.currentChatroom = chatroom.payload._id;
    },
  },
});

export let { setCurrentChatroom } = chatroom.actions;

let login = createSlice({
  name: "login",
  initialState: {
    isLoggedin: false,
  },
  reducers: {
    isLoggedinTrue(state) {
      state.isLoggedin = true;
    },
    isLoggedinFalse(state) {
      state.isLoggedin = false;
    },
  },
});

export let { isLoggedinTrue, isLoggedinFalse } = login.actions;

let likedPosts = createSlice({
  name: "likedPosts",
  initialState: [],
  reducers: {
    AddLikedData(state, likedPost) {
      // console.log(likedPost.payload);
      state.push(likedPost.payload);
    },
    ChangeLikedDatainStore(state, post) {
      if (post.payload != -1) {
        console.log(post.payload);
        state.splice(post.payload, 1);
      } else {
        console.log(post.payload);
      }
    },
  },
});

export let { AddLikedData, ChangeLikedDatainStore } = likedPosts.actions;

let user = createSlice({
  name: "user",
  initialState: {
    _id: "0",
    displayName: "test",
    id: "test",
    profileUrl: "https://placeimg.com/640/480/tech",
    joinDate: "",
    role: "normal",
  },
  reducers: {
    SetUserData(state, user) {
      // console.log(user.payload)
      state._id = user.payload._id;
      state.displayName = user.payload.name;
      state.content = user.payload.content;
      state.joinDate = user.payload.joinDate;
      state.profileUrl = user.payload.profileUrl;
      state.id = user.payload.id;
    },
  },
});

export let { SetUserData } = user.actions;

let posts = createSlice({
  name: "posts",
  initialState: [
    // {
    //   _id: "0",
    //   authorName: "test",
    //   authorID: "test",
    //   author_id: "1",
    //   authoProfileUrl: "https://placeimg.com/640/480/tech",
    //   content: "it is beautiful friday",
    //   contentImageUrl: "none",
    //   date: "5-1-Fri",
    //   likes: 0,
    //   liked: false,
    //   followed_id: [],
    // },
    // {
    //   _id: "1",
    //   authorName: "test2",
    //   authorID: "test2",
    //   author_id: "2",
    //   authoProfileUrl: "https://placeimg.com/640/480/tech",
    //   content: "it is sad monday",
    //   contentImageUrl: "none",
    //   date: "5-1-Wnd",
    //   likes: 0,
    //   liked: false,
    //   followed_id: [],
    // },
  ],
  reducers: {
    ClearPosts(state) {
      state.splice(0, state.length);
    },
    LikeThisPost(state, index) {
      if (state[index.payload].liked === false) {
        state[index.payload].likes += 1;
        state[index.payload].liked = true;
      } else if (state[index.payload].liked === true) {
        state[index.payload].likes -= 1;
        state[index.payload].liked = false;
      }
    },
    UploadPost(state, newPost) {
      // console.log(newPost.payload);
      state.unshift(newPost.payload);
    },
    FetchPosts(state, posts) {
      if (posts.payload.posts) {
        posts.payload.posts.forEach((post) => {
          post.date =
            new Date(post.date).toLocaleDateString() +
            " " +
            new Date(post.date).toLocaleTimeString();
          state.push(post);
        });
      }
    },
    FetchLikes(state, index) {
      // console.log(index.payload);
      if (index.payload != -1) {
        state[index.payload].liked = true;
      }
    },
  },
});

export let { UploadPost, LikeThisPost, FetchPosts, ClearPosts, FetchLikes } =
  posts.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    posts: posts.reducer,
    login: login.reducer,
    likedPosts: likedPosts.reducer,
    chatroom: chatroom.reducer,
  },
});
