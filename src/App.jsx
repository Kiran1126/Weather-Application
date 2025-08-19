import Interface from "./Components/Interface";
import Branding from "./Components/Branding";

function App() {
  return (
    <section className="h-screen w-screen flex flex-col justify-evenly items-center-safe bg-[url('./assets/Weather.jpg')] bg-cover">
      <Interface />
      <Branding />
    </section>
  );
};

export default App;
