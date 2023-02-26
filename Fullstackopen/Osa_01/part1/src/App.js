const Hello = (prop) => {
  return (
    <div>
      <p>Hello {prop.name} you are {prop.age} old</p>
    </div>
  )
}

const Footer = () =>{
  return(
    <div>
      greeting app created by
      <a href="https://github.com/NikolaiMarkalainen">NikolaiMarkalainen</a>
    </div>
  )


}

const What = () =>{
  return(
    <div>
      <p >WHOOOO</p>
    </div>
  )


}
const App = () => {
  const ika = 10;
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Jesse" age={26} />
      <Hello name= "Pekka" age = {26+5}/>
      <Hello name = "Petri" age={31}/>
      <Hello name = "Jussi" age ={ika} />
      <Footer/>
    </div>
  )
}
export default App