import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

import { connect } from "react-redux";

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });

  return (
    <View style={styles.container}>
      <Text>{currentUser.name}</Text>
      <Text>{currentUser.email}</Text>
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
});
