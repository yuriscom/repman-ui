import React, { Component } from 'react';

class Step3 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="step-3">
        <p>
          We are so happy you had a great experience!
          <br />
          We would appreciate it if you could share your review on Google!
        </p>
        <p className="share">Share your review!</p>
        <a href="https://www.google.com/search?client=safari&rls=en&q=wilderman+cosmetic+clinic+
reviews&ie=UTF-8&oe=UTF-8#Ird=0x882b2c62b4a1fb05:0x4cffO2cc3b85afa0,1"
        >
          <p className="link">
            https://www.google.com/search?client=safari&rls=en&q=wilderman+cosmetic+clinic+
            reviews&ie=UTF-8&oe=UTF-8#Ird=0x882b2c62b4a1fb05:0x4cffO2cc3b85afa0,1
          </p>
        </a>
      </div>
    );
  }
}

export default Step3;
