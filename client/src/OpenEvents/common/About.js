import React from 'react';

class About extends React.Component {
  render() {
    return (
      <div>
        <div className="row text-center">
          <div>
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis libero, sit. Assumenda numquam consequuntur eum deleniti non eligendi, quo corporis at qui consequatur ab amet deserunt accusamus molestiae quidem vitae necessitatibus ad aliquid minus, sapiente eius doloribus! Dicta architecto sit nemo ducimus aut omnis atque velit, consectetur animi iste, laudantium doloribus dolorem ullam tempore! Esse vel omnis nemo incidunt repudiandae dolore voluptatibus minima assumenda commodi odio tempora aliquam illo, voluptatem minus ex voluptas laboriosam doloremque praesentium, dolorem et consectetur, distinctio similique. Culpa accusantium deleniti qui recusandae vel, ipsam, dignissimos repudiandae, soluta magni consectetur quos et optio exercitationem expedita ratione! A.</p>
          </div>
          <div>
            <h2>Our Team</h2>
      <br/>
            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12">
              <img style={{maxWidth:"200px"}} className="center-block img-responsive img-circle" src="/img/tesla.jpg" alt=""/>
              <h4>Tesla</h4>
              <h6>Full-Stack</h6>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12">
              <img style={{maxWidth:"200px"}} className="center-block img-responsive img-circle" src="/img/einstein.jpeg" alt=""/>
              <h4>Einstein</h4>
              <h6>Team Leader</h6>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-4 col-xs-12">
              <img style={{maxWidth:"200px"}} className="center-block img-responsive img-circle" src="/img/elon.png" alt=""/>
              <h4>Musk</h4>
              <h6>Designer</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;