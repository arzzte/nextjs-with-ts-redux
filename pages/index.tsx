import React from 'react';
import { connect } from 'react-redux';
import { startClock, serverRenderClock, helloMessage, State } from '../domain/store';
import Clock from '../components/clock';
import { Dispatchable, mapDispatchToProps } from '../lib/with-redux-store';

interface Props {
  message: string;
}

class Index extends React.Component<Dispatchable<Props>> {
  private timer: NodeJS.Timer;

  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    reduxStore.dispatch(serverRenderClock(isServer));

    return {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.timer = startClock(dispatch);
    dispatch(helloMessage('foo'));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <>
        <Clock />
        <div className="jej">{this.props.message}</div>
      </>
    );
  }
}

const mapStateToProps = (state: State) => state;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
