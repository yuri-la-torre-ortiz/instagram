import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

import { connect } from "react-redux";

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
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
    marginTop: 40,
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
