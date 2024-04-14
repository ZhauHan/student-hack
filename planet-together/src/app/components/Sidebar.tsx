"use client"

interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card({ title , description, image } : CardProps) {
  return (
    <div className="flex justify-between items-center bg-white rounded-lg shadow-lg p-5 m-5">
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p>{description}</p>
        <div className="flex justify-between items-center mt-5 ">
          <button onClick={() => console.log('add planet')} className="bg-blue-500 text-white text-sm rounded p-2 m-2">Add Planet</button>
          <button onClick={() => console.log('Remove Planet')} className="bg-red-500 text-white text-sm rounded p-2 m-2">Remove Planet</button>
        </div>
      </div>
      <img src={image} alt={title} className="w-24 h-24 object-cover" />
    </div>
  );
}

function Sidebar(props: {setIsOrbit: React.Dispatch<React.SetStateAction<boolean>>, isOrbit: boolean, planetCount: number, setIsAdding: React.Dispatch<React.SetStateAction<boolean>>, isAdding: boolean }) {
  return (
    <div className="sidebar w-160 border border-black flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      <div className="text-amber-200 p-5 text-xl font-bold">Planet Together</div>
      <div className="text-amber-200 p-5 text-xl font-bold">Planet Count: {props.planetCount}</div>
      <button className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800 focus:outline-none" onClick={() => { props.setIsOrbit(!props.isOrbit) }}>Change Camera Mode</button>
      <button className="m-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800 focus:outline-none" onClick={() => { props.setIsAdding(!props.isAdding) }}>Add Planet Mode</button>
      <Card title="Moon" description="This is the first card." image="images/moon.jpg" />
      <Card title="Mars" description="This is the second card." image="images/mars.jpg" />
    </div>
  );
}



export default Sidebar;

