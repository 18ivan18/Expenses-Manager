import React, {useEffect} from "react";
import { connect } from "react-redux";

export const Home = () => {
  useEffect(() => {
    console.log("Component Home did mount...")
    
  }, [])
  return (
    <center>
      <div style={{minHeight: "800px"}}>
        <h1 className="indigo-text">Just a homepage, nothing to see here</h1>
      </div>
    </center>
  );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
