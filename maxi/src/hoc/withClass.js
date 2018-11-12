import React, { Component } from 'react';

// const withClass = (WrappedComponent, className) => {
//     return (props) => (
//         <div className={className}>
//             <WrappedComponent {...props} />
//         </div>
//     )
// }
const withClass = (WrappedComponent, className) => {
    const AnotherClass = class extends Component {
        render() {
            return (
                <div className={className}>
                    <WrappedComponent {...this.props} />
                </div>
            )
        }
    }
    return React.forwardRef((props, ref) => {
        return <AnotherClass {...props} forwardedRef={ref} />
    });
}

export default withClass;