import React from 'react'
import { connect } from 'react-redux'

export const Home = () => {
    return (
        <div>
            <h1>Just a homepage, nothing to see here</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
