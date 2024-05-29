import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 45,
    color: 'rgb(50,150,100)',
  },
  middle: {
    width: '100%',
    alignItems: 'center',
  },
  field1: {
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 50,
    width: '80%',
    backgroundColor: 'lightgrey',
    marginBottom: 20,
  },
  field2: {
    borderRadius: 20,
    paddingHorizontal: 20,
    height: 50,
    width: '80%',
    backgroundColor: 'lightgrey',
    marginBottom: 5,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    paddingRight: '10%',
    marginBottom: 20,
    marginLeft: 200,
    // marginTop:10,
  },
  button: {
    borderRadius: 20,
    backgroundColor: 'rgb(50,155,100)',
    paddingVertical: 13,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default styles;
