import React from 'react';


class Home extends React.Component {

  render() {
    return(
      <div>
        <button onClick={() => {console.log('I am clicked')}}>Click me</button>
      </div>
    )
  }
}

export default Home;
