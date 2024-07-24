import './App.css';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function formatDate(date) {
  return date.toLocaleDateString();
  }

  function Avatar(props) {
    return (
      <img className="Avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
        height={50}
        width={50}
      />
    );
  }

  function UserInfo(props) {
    return (
      <div className="UserInfo">
        <Avatar user={props.user} />
        <div className="UserInfo-name">
          {props.user.name}
        </div>
      </div>
    );
  }

  function Comment(props) {
    return (
      <div className="Comment">
        <UserInfo user={props.author} />
        <div className="Comment-text">
          {props.text}
        </div>
        <div className="Comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    );
  }

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-danger">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Raijin Tech</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">About</a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/">Action</a></li>
                    <li><a className="dropdown-item" href="/">Another action</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="text-center mt-5">Welcome to Raijin Tech</h1>
              <Welcome name="Ameer" />
            </div>
          </div>
        </div>
        <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />
    </>
  );
}

const comment = {
  date: new Date(),
  text: 'Learning React!',
  author: {
      name: 'Ameer',
      avatarUrl: './logo192.png'
  }
  };

export default App;
