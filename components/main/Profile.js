import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

import firebase from "firebase";
require("firebase/firestore");

import { connect } from "react-redux";

function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { currentUser, posts } = props;
    console.log({ currentUser, posts });

    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          } else {
            console.log("does not exist.");
          }
        });

      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }
  }, [props.route.params.uid]);

  if (user === null) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    margin: 20,
  },
  galleryContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});
