"use client"
import {Slider, SliderValue} from "@nextui-org/slider";

function SpeedScrollBar(props: {setUpdateFreq: (updateFreq:number|number[]) => void}) {
    return (
    <Slider 
        label="Timescale" 
        step={0.00001} 
        maxValue={10} 
        minValue={0.00001} 
        defaultValue={0.1}
        color="danger"
        classNames={
            {
                base:"max-w-md",
                labelWrapper: "mb-2 justify-center",
                label:"text-white mr-5",
                value: "text-white ml-5"
            }
        }
        onChange={(value:SliderValue) => {props.setUpdateFreq(value)}}
        />
    )
  }

export default SpeedScrollBar;