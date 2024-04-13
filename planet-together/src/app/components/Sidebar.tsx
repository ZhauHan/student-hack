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

function Sidebar() {
  return (
    <div className="sidebar w-160 border border-black flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
      <div className="text-amber-200 p-5 text-xl font-bold">Planet Together</div>
      <Card title="Moon" description="This is the first card." image="images/moon.jpg" />
      <Card title="Moon" description="This is the first card." image="planet-together\public\images\moon.jpg" />
      <Card title="Moon" description="This is the first card." image="images/moon.jpg" />
      <Card title="Moon" description="This is the first card." image="planet-together\public\images\moon.jpg" />
      <img src="./moon.jpg" alt="moon" />
      
    </div>
  );
}



export default Sidebar;
