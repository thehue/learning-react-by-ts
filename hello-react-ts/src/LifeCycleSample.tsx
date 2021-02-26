import React, { Component } from 'react';

type State = {
  color: string;
  number: number;
};

type Props = {
  color: string;
};

class LifeCycleSample extends Component<Props> {
  state = {
    number: 0,
    color: null,
  };

  myRef: HTMLHeadingElement | null = null;

  constructor(props: Props) {
    super(props);
    console.log('constructor');
  }

  // props에 있는 값을 state에 넣을 때 사용하는 메서드
  // 컴포넌트가 마운트될 때와 업데이트될 때 호출된다.
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    console.log('getDerivedStateFromProps');
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color };
    }

    return null;
  }

  // 컴포넌트를 만들고, 첫 렌더링을 다 마친 후 실행
  componentDidMount() {
    console.log('componentDidMount');
  }

  //props 또는 state를 변경했을 때, 리렌더링을 시작할지 여부를 지정하는 메서드
  //nextProps, nextState -> 새로 설정될 props 또는 state
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    console.log('shouldComponentUpdate', nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링하지 않습니다.
    return nextState.number % 10 !== 4;
  }

  //컴포넌트를 DOM에서 제거할때 실행
  //componentDidMount에서 등록한 이벤트, 타이머, 직접 생성한 DOM이 이싿면 여기서 제거 작업을 해야한다
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  // render에서 만들어잔 결과물이 브라우저에 실제로 반영되기 직전에 호출
  // 이 메서드에서 반환하는 값은 componentDidUpdate에서 snapshot 값으로 전달받을 수 있음.
  // 주로 업데이트하기 직전의 값을 참고할 일이 있을 때 활용(ex: 스크롤바 위치 유지)
  getSnapshotBeforeUpdate(prevProps: Props, prevState: State) {
    console.log('getSnapshotBeforeUpdate');
    if (prevProps.color !== this.props.color) {
      if (this.myRef) {
        return this.myRef.style.color;
      }
    }

    return null;
  }

  componentDidUpdate(prevProps: Props, prevState: State, snapShopt: string) {
    console.log('componentDidUpdate', prevProps, prevState);
    if (snapShopt) {
      console.log('업데이트되기 직전 색상: ', snapShopt);
    }
  }

  render() {
    console.log('render');

    const style = {
      color: this.props.color,
    };

    throw new Error();

    return (
      <div>
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
