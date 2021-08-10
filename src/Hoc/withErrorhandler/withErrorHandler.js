import React from "react";

import Aux from '../Auxilary'

import Modal from '../../Components/UI/Modal/Modal'

const WithErrorHandler = (WrappedComponent, axios) =>
{
    return class extends React.Component
    {
        state = {
            error: null
        }

        componentWillMount()
        {
            this.reqInterceptor = axios.interceptors.request.use(req =>
            {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error =>
            {
                this.setState({ error: error.response.data });
            });
        }
        componentWillUnmount()
        {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        render()
        {
            return (
                <Aux>
                    <Modal show={this.state.error}>
                        {this.state.error ? this.state.error.error : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }

}

export default WithErrorHandler