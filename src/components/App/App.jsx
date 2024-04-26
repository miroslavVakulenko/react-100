import { useState } from "react";
import ClickCounter from "../ClickCounter/ClickCounter";
import Toggler from "../Toggler/Toggler";
import css from "./App.module.css";
import Reader from "../Reader/Reader";
import articles from "../../articles.json";
import SubmitForm from "../SubmitForm/SubmitForm";

export default function App() {
  const [clicks, setClicks] = useState(0);

  const handleClick = () => {
    setClicks(clicks + 1);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const { login, password } = form.elements;
    form.reset();
  };

  return (
    <div className={css.container}>
      <h1>State in React</h1>
      <hr />
      <Reader items={articles} />
      <hr />
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <ClickCounter value={clicks} onUpdate={handleClick} />
      <hr />
      <Toggler />
      <Toggler />
      <Toggler />
      <SubmitForm handleSubmit={handleSubmit} />
    </div>
  );
}
