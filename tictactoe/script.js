function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick = {() => this.props.onClick(i)}
        key = {i}
        />
    );
  }
  
  render() {
    let row = [];
    let sq = [];
    let cellNum = 0;
    for(let i=0; i<3; i++) {
      for(let x=0; x<3; x++) {
        sq.push(this.renderSquare(cellNum))
        cellNum++
      }
      row.push(<div key={i} className="board-row">{ sq }</div>)
      sq = [];
    }
    return (
      <div>
        { row }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastPlay: null,
    }],
      stepNumber: 0,
      xIsNext: true,
      ascend: true,
    }
  }
  
  sortEm() {
    const ascend = this.state.ascend;
    this.setState({
      ascend: !ascend,
    });    
  }
    
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calcWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        lastPlay: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
    })
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calcWinner(current.squares);
    
    console.log(winner);
    
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }
    
    const moves = history.map((step, move) => {
      const place = "hi";
      const desc = move ? 'Go to move #' + move + ' (Played: ' + step.squares[step.lastPlay] + ' @ Location: ' + step.lastPlay + ')' : 'Go to game start';
      return (
        <li key={move}>
          <button onClick = {() => this.jumpTo(move)}>{move === this.state.stepNumber ? <b>{desc}</b> : desc}</button>
        </li>
      );
    });
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button id="ascDes" onClick={() => this.sortEm()}>Order</button>
          {(this.state.ascend) ? <ol>{moves}</ol> : <ol> {moves.reverse()} </ol>};
        </div>
      </div>
    );
  }
}

function calcWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],    
  ];
  for (let i=0; i<lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a]
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
