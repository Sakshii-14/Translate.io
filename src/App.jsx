import { useEffect, useState } from "react";
import Card from "./components/Card";
import logo from "./logo.svg";

function App() {
  const [translateText, setTranslateText] = useState("Hello,How are you?");
  const [translatedText, setTranslatedText] = useState("");
  const [from, setFrom] = useState("en");
  const [toText, setToText] = useState("fr");
  useEffect(() => {
    translate();
  }, [toText]);

  const translate = async () => {
    try {
      console.log(from, toText);
      const url = `https://api.mymemory.translated.net/get?q=${translateText}!&langpair=${from}|${toText}`;
      const response = await fetch(url);
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.log(error);
    }
  };
  //debounce function
  function debounce(func, delay) {
    let timeoutId;

    return function (...args) {
      const context = this;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  }

  const debouncedtranslate = debounce(translate, 700);

  const swap = () => {
    setTranslateText(translatedText);
    setTranslatedText(translateText);
    setFrom(toText);
    setToText(from);
  };
  return (
    <>
      <img src={logo} alt="img" className="sm:m-8 m-1 sm:h-[70px] " />
      <div className="flex flex-wrap w-screen flex-grow flex-shrink basis-16 lg:flex-row flex-col gap-4 h-auto justify-center items-center p-4">
        <Card
          item1={"Detect Language"}
          ontextchange={(text) => {
            setTranslateText(text);
            debouncedtranslate();
          }}
          text={translateText}
          translate={translate}
          onLangchange={(lang) => setFrom(lang)}
          lang={from}
        />
        <Card
          ontextchange={(text) => setTranslatedText(text)}
          text={translatedText}
          onLangchange={(lang) => setToText(lang)}
          lang={toText}
          swap={swap}
        />
      </div>
    </>
  );
}

export default App;
