import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { login } from './actions';

class SignIn extends React.Component {
  handlePress = () => {
    this.props.dispatch(login());
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign In Screen</Text>
        {this.props.loading ?
          <Text>Logging in...</Text> :
          <Button
            title="Sign In"
            onPress={this.handlePress}
          />
        }
      </View>
    );
  }
}

export default connect((state) => ({
  loading: state.app.loading,
}))(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
