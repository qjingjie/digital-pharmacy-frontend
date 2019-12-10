import React from 'react'
import { withRouter } from 'react-router-dom'

class FwdBtn extends React.Component {
    constructor() {
        super()
        this.routeChange = this.routeChange.bind(this)
    }

    routeChange() {
        let path = this.props.path
        this.props.history.push(path)
    }

    render() {
        return (
            <button className={this.props.name} onClick={this.routeChange}> {this.props.text} </button>
        )
    }
}

export default withRouter(FwdBtn)