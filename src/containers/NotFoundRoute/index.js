import React from 'react';
import propTypes from 'proptypes';

class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  componentWillMount() {
    this.props.history.push('/dashboard');
  }

  render() {
    return(
      <div>
        {/* NotFoundRoute */}
      </div>
    );
  }
}

Auth.propTypes = {};

export default Auth;
