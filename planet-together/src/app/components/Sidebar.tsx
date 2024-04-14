"use client"
import React from 'react';
import Select from 'react-select';


interface CardProps {
  title: string;
  description: string;
  image: string;
}

function Card({ title , description, image } : CardProps) {
  return (
    <div className="flex flex-col justify-between items-center bg-transparent rounded-lg shadow-lg p-5 m-5">
      <div>
      <button className="text-white text-xl font-bold mb-2 border border-white rounded px-2">{title}</button>
        <p className="text-white">{description}</p> 
        <div className="flex justify-between items-center mt-5 ">
          
        </div>
      </div>
      <img src={image} alt={title} className="w-24 h-24 object-cover" />
    </div>
  );
}


const planets: CardProps[] = [
  { title: "Venus", description: "This is the first card.", image: "images/ven0aaa2.jpg" },
  { title: "Earth", description: "This is the second card.", image: "images/ear0xuu2.jpg" },
  { title: "Mars", description: "This is the third card.", image: "images/mar2kuu2.jpg" },
  { title: "Jupiter", description: "This is the fourth card.", image: "images/jup0vss1.jpg" },
  { title: "Saturn", description: "This is the fourth card.", image: "images/sat0fds1.jpg" },
  { title: "Neptune", description: "This is the fifth card.", image: "images/nep0fds1.jpg" },
  { title: "Pluto", description: "This is the sixth card.", image: "images/plu0rss1.jpg" },
  { title: "Moon", description: "This is the seventh card.", image: "images/moon.jpg" }

];

const Option = ({ data }: { data: CardProps }) => <Card {...data} />;
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    width: '50%',
    backgroundColor: 'transparent'
  }),
  menu: (provided: any) => ({
    ...provided,
    width: '50%',
    minWidth: '50%',
    backgroundColor: 'transparent'

  }),
  option: (provided: any, state: any) => ({
    ...provided,
    width: '50%',
    backgroundColor: 'transparent'
  }),
};


export default function Sidebar(props: {setIsOrbit: React.Dispatch<React.SetStateAction<boolean>>, isOrbit: boolean, planetCount: number, setIsAdding: React.Dispatch<React.SetStateAction<boolean>>, isAdding: boolean , visiblePlanets: { name: string, texture: string, isVisible: boolean }[] }) {
  return (
    <div className="sidebar w-200 border border-black flex flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[700px]">
      <div className="text-amber-200 p-5 text-xl font-bold">Planet Together</div>
      <button className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800 focus:outline-none" onClick={() => { props.setIsOrbit }}>Change Camera Mode</button>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className="text-amber-200 p-5 text-xl font-bold">Planet Count: {props.planetCount}</div>
      <Select 
        options={planets} 
        components={{
          Option
        }}
        styles={{
          ...customStyles,
          container: (provided: any) => ({
            ...provided,
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
          }),
          menu: (provided: any) => ({
            ...provided,
            width: '100%',
            overflowX: 'hidden',
            backgroundColor: 'transparent', 
          }),
          placeholder: (provided: any) => ({
            ...provided,
            color: 'white',
          }),
        }}
        isSearchable={false}
        placeholder="Edit Planets"
      />
      <Select 
        options={props.visiblePlanets.map(planet => ({ value: planet.name, label: planet.name }))}
        styles={{
          ...customStyles,
          container: (provided: any) => ({
            ...provided,
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
          }),
          menu: (provided: any) => ({
            ...provided,
            width: '100%',
            backgroundColor: 'transparent', 
          }),
          option: (provided: any) => ({
            ...provided,
            color: 'grey',
            display: 'flex',
            justifyContent: 'center',
          }),
          placeholder: (provided: any) => ({
            ...provided,
            color: 'white',
          }),
      }}      
      isSearchable={false}
      placeholder="Current Planets"
      />
    </div>
    </div>
  );
}