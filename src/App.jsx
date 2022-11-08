import './App.css'

function App() {
  let number = 1;

  const double = () => {
    number = number * 2
    console.log(number)
  };
  
  return (
    <>
      <div>{number}</div>
      <button onClick={double}>Submit</button>
    </>
  )
}

export default App
