import { configureStore, createSlice } from "@reduxjs/toolkit";

let login = createSlice({
  name: "login",
  initialState: {
    isLoggedin: false,
  },
  reducers: {
    LogIn(state, user) {
      state.isLoggedin = true;
      console.log(user.payload)
    },
    LogOut(state) {
      state.isLoggedin = false;
    },
  },
});

export let { LogIn, LogOut } = login.actions;

let user = createSlice({
  name: "user",
  initialState: {
    _id: "0",
    displaName: "test",
    ID: "test",
    profileUrl: "https://placeimg.com/640/480/tech",
    role: "normal",
  },
});

let posts = createSlice({
  name: "posts",
  initialState: [
    {
      _id: "0",
      authorName: "test",
      authorID: "test",
      author_id: "1",
      authoProfileUrl: "https://placeimg.com/640/480/tech",
      content: "it is beautiful friday",
      contentImageUrl: "none",
      date: "5-1-Fri",
      likes: 0,
      liked: false,
      followed_id: [],
    },
    {
      _id: "1",
      authorName: "test2",
      authorID: "test2",
      author_id: "2",
      authoProfileUrl: "https://placeimg.com/640/480/tech",
      content: "it is sad monday",
      contentImageUrl: "none",
      date: "5-1-Wnd",
      likes: 0,
      liked: false,
      followed_id: [],
    },
  ],
  reducers: {
    LikeThisPost(state, index) {
      state[index.payload].liked = !state[index.payload].liked;
    },
    UploadPost(state, content) {
      console.log(content.payload);
      var newPost = {
        _id: "1",
        authorName: "test2",
        authorID: "test2",
        author_id: "2",
        authoProfileUrl: "https://placeimg.com/640/480/tech",
        content: content.payload,
        contentImageUrl: "none",
        date: "5-1-Wnd",
        likes: 0,
        liked: false,
      };
      state.unshift(newPost);
    },
  },
});

export let { UploadPost, LikeThisPost } = posts.actions;

export default configureStore({
  reducer: {
    user: user.reducer,
    posts: posts.reducer,
    login: login.reducer,
  },
});
