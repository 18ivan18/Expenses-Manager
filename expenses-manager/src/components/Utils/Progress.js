import React from 'react'

const ProgressBar = (props) => {
    const { bgcolor, completed, outOf, height, width, percent, marginBottom } = props;
  
    const containerStyles = {
      height: height,
      width: width,
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      // margin: 50,
      marginTop: 10,
      marginBottom: marginBottom || 90,
      marginLeft: 5,
      marginRight: 5
    }
  
    const fillerStyles = {
      height: '100%',
      width: !percent ? `${completed/outOf*100}%` : `${percent}%`,
      backgroundColor: bgcolor || "pink",
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold',
    }

    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{!percent ? `${completed}/${outOf}` : `${percent}%`}</span>
        </div>
      </div>
    );
  };
  
  export default ProgressBar;