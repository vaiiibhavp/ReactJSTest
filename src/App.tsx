import CarList from "./component/list";

function App() {
  return (
    <div className="App">
      <div>
        <CarList label="Maker" type="Make" detail="Company of the vehicle" />
        <CarList label="Model" type="Model" detail="Car Model" />
        <CarList
          label="Vehicle Class"
          type="Vehicle Class"
          detail="Class of vahicle depending on their utility, capacity and weight"
        />
      </div>
    </div>
  );
}

export default App;
