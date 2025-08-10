import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];


const App = () => {
  return (
    <div className="container">
      <Header />
      <h1>Hello React!</h1>
      <Menu />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <h1>
        Fast React Pizza Co.
      </h1>
    </header>
  )
}

function Menu() {
  return (
    <main className="menu">
      <h2> Our menu</h2>
      <Pizza name='Pizza Prosciutto' ingredient='Tomato, mozarella, ham, aragula, and burrata cheese' photoName='pizzas/spinaci.jpg' price='' />
    </main>
  )
}

const Pizza = ({ name, ingredient, photoName, price }) => {
  return (
    <div className="pizza">
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredient}</p>
        <span>{price}</span>
      </div>
    </div>
  )

}

function Footer() {
  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()} We're currently open
    </footer>)
}



//React v18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

//React before v18
// React.render(<App />)