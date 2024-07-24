import React from 'react'

//rendering component
function Practice3(props) {
  return (
    <div>
        <h1>Hello, {props.name}</h1>;
        </div>
  )
}

const root1 = ReactDOM.createRoot(document.getElementById('root'));
const element = <Practice3 name="Ameer" />; //practice3 is component with props
root.render(element);

//create an App component that renders Welcome many times:
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Ram" />
      <Welcome name="Shyam" />
      <Welcome name="Hari" />
    </div>
  );
}

// --Extracting Components
    function formatDate(date) {
        return date.toLocaleDateString();
    }
    
    function Comment(props) {
        return (
        <div className="Comment">
            <div className="UserInfo">
            <img className="Avatar"
                src={props.author.avatarUrl}
                alt={props.author.name} />
            <div className="UserInfo-name">
                {props.author.name}
            </div>
            </div>
            <div className="Comment-text">
            {props.text}
            </div>
            <div className="Comment-date">
            {formatDate(props.date)}
            </div>
        </div>
        );
    }
    
    const comment = {
        date: new Date(),
        text: 'Learning React!',
        author: {
        name: 'Ameer',
        avatarUrl: '.\logo192'
        }
    };
    
    const root2 = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author} />
    );
  
    //extracting Avatar and UserInfo components separately:
    function Avatar(props) {
      return (
        <img className="Avatar"
          src={props.user.avatarUrl}
          alt={props.user.name}
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

    //pure functions: React components must act like pure functions with respect to their props.
    function sum(a, b) {
      return a + b;
    }

    //impure functions
    function withdraw(account, amount) {
      account.total -= amount;
    }

    //in module1.mjs: but give error, so make .js to .mjs
    const name1= 'Ameer';
    const name2= 'Raijin';
    const name3= 'Ram';

    // export default name1;
    export {name2, name3};

    //in module2.mjs
    import name1,{name2, name3} from './module1.mjs';

    console.log(name1);
    console.log(name2);
    console.log(name3);

export default Practice3;