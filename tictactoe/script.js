let winnerMove = [];
let finished = false;

function Square(props) {
  if (props.winnerMove.indexOf(props.id) >= 0){
    return (
      <button id={props.id} className="square winner" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } else {
    return(
      <button id={props.id} className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        id = {i}
        value={this.props.squares[i]} 
        onClick = {() => this.props.onClick(i)}
        key = {i}
        winnerMove = {winnerMove}
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
      className: "square",
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
    if (calcWinner(squares) || squares[i] || finished){
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
    console.log(draw(squares));
    if (draw(squares)) {
      finished = true;
    }
  }
  
  jumpTo(step) {
    winnerMove = [];
    this.setState({
      stepNumber: step,
      xIsNext: (step%2) === 0,
    })
  }
  
  restart() {
    winnerMove = [];
    this.setState({
      className: "square",
      history: [{
        squares: Array(9).fill(null),
        lastPlay: null,
    }],
      stepNumber: 0,
      xIsNext: true,
      ascend: true,
    })
  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calcWinner(current.squares);
        
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (!winner && finished) {
      status = "it is a draw!";
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
            winnerMove = {winnerMove}
          />
          <button id="restart" onClick={() => this.restart()}>Restart</button>
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
      winnerMove = lines[i];
      return squares[a]
    }
  }
  return null;
}

function draw(squares) {
  let empty = false;
  squares.forEach((x) => {
    if (!x) {
      empty = true;
    }
  });
  if (empty) {
    return false;
  } else {
    return true;
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
