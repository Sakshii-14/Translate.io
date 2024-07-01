import React from "react";
import horizontal from "./Horizontal_top_left_main.svg";
import Sort from "./Sort_alfa.svg";
import soundsvg from "./sound_max_fill.svg";
import copysvg from "./Copy.svg";
import { useRef } from "react";
function Card({
  item1 = "",
  text,
  ontextchange,
  translate,
  onLangchange,
  lang,
  swap,
}) {
  const textref = useRef(null);
  const copy = () => {
    navigator.clipboard
      .writeText(textref.current.value)
      .then(() => console.log("text copied to clipboard", textref.current))
      .catch((error) => console.log(error));
    textref.current.select();
  };
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(textref.current.value);
    window.speechSynthesis.speak(utterance);
  };
  return (
    <div className="bg-[#121826cc] p-[1.1rem] border lg:min-w-[30vw] lg:w-[40vw] min-w-full border-[#4D5562] h-[35vh] rounded-3xl flex flex-col gap-2 items-center">
      <div
        className={`w-full px-1 py-2 border-b-[1px] border-[#4D5562] text-[0.875rem] ${
          item1 ? "" : "flex justify-between"
        }`}
      >
        <ul className="text-[#4D5562]  flex gap-3 font-bold items-center">
          {item1 && (
            <li
              className={`px-3 py-2 rounded-xl hover:bg-[#4D5562] hover:text-[#F9FAFB] sm:block hidden`}
            >
              {item1}
            </li>
          )}

          <li className="px-3 py-2 rounded-xl hover:bg-[#4D5562] hover:text-[#F9FAFB]">
            English
          </li>
          <li className="px-3 py-2 rounded-xl hover:bg-[#4D5562] hover:text-[#F9FAFB]">
            French
          </li>
          <li className="px-3 py-2 rounded-xl hover:bg-[#4D5562] hover:text-[#F9FAFB] flex gap-1">
            <select
              name="language"
              className="bg-transparent focus:outline-none"
              value={lang}
              onChange={(e) => onLangchange(e.target.value)}
            >
              <option value="ar" className="text-[#4D5562] font-bold p-2 bg-">
                Arabic
              </option>
              <option value="de" className="text-[#4D5562] font-bold p-2">
                German
              </option>
              <option value="en" className="text-[#4D5562] font-bold p-2">
                English
              </option>
              <option value="fr" className="text-[#4D5562] font-bold p-2">
                French
              </option>
              <option value="hi" className="text-[#4D5562] font-bold p-2">
                Hindi
              </option>
              <option value="it" className="text-[#4D5562] font-bold p-2">
                Italian
              </option>
              <option value="zh" className="text-[#4D5562] font-bold p-2">
                Chinese
              </option>
              <option value="es" className="text-[#4D5562] font-bold p-2">
                Spanish
              </option>
            </select>
          </li>
        </ul>
        {!item1 && (
          <img
            src={horizontal}
            alt=""
            className="border-[2px] px-[0.35rem] py-[0.1rem] border-[#4D5562] rounded-xl "
            onClick={swap}
          />
        )}
      </div>
      <textarea
        name="textbox"
        id="text"
        maxLength="500"
        value={text}
        onChange={(e) => ontextchange && ontextchange(e.target.value)}
        className="m-2 w-full h-[50%] p-2 bg-transparent focus:outline-none resize-none text-[#F9FAFB] "
        ref={textref}
      ></textarea>
      <p
        className={`text-[#4D5562] font-bold text-right w-full text-[0.75rem] ${
          item1 ? " " : "invisible"
        }`}
      >
        {text.split("\n").join("").length}/500
      </p>

      <div className="flex justify-between w-full ">
        <div className="flex gap-2 ">
          <button
            className="border-[2px] px-[0.6rem]  border-[#4D5562] rounded-xl "
            onClick={speak}
          >
            <img src={soundsvg} alt="" className="h-[20px] w-[20px]" />
          </button>
          <button
            className="border-[2px] px-[0.6rem]  border-[#4D5562] rounded-xl "
            onClick={copy}
          >
            <img src={copysvg} alt="" className="h-[20px] w-[20px]" />
          </button>
        </div>
        <button
          className={`bg-[#3662E3] text-[#F9FAFB] flex gap-2 items-center justify-center px-6 rounded-xl border-[#7CA9F3] border text-[1rem] py-3 font-medium ${
            item1 ? " " : "invisible"
          }`}
          onClick={translate}
        >
          <img src={Sort} alt="" /> Translate
        </button>
      </div>
    </div>
  );
}

export default Card;
